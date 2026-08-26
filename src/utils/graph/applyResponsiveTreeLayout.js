import {
  GERENTE_WIDTH,
  EMPLOYEE_GAP,
  EMPLOYEE_START_OFFSET,
  nodeHeightByType,
} from "../style/nodeDimensions";

const HORIZONTAL_GAP    = 64;
const VERTICAL_GAP      = 90;
const ROOT_GAP          = 100;
const MARGIN_X          = 40;
const MARGIN_Y          = 40;
const VAGA_SECTION_GAP  = 12;

function calculateDepartmentBlockHeight(
  departmentId,
  visibleNodeIds,
  employeesByDepartment,
  vagasByDepartment
) {
  const employeeIds =
    employeesByDepartment.get(departmentId) || [];

  const vagaIds =
    vagasByDepartment.get(departmentId) || [];

  const employeeCount = employeeIds.filter((id) =>
    visibleNodeIds.has(id)
  ).length;

  const vagaCount = vagaIds.filter((id) =>
    visibleNodeIds.has(id)
  ).length;

  if (employeeCount === 0 && vagaCount === 0) {
    return nodeHeightByType.departamento;
  }

  let blockHeight =
    nodeHeightByType.departamento +
    EMPLOYEE_START_OFFSET;

  blockHeight +=
    employeeCount *
    (nodeHeightByType.funcionario + EMPLOYEE_GAP);

  if (vagaCount > 0) {
    blockHeight += VAGA_SECTION_GAP;

    blockHeight +=
      vagaCount *
      (nodeHeightByType.vaga + EMPLOYEE_GAP);
  }

  blockHeight -= EMPLOYEE_GAP;

  return blockHeight;
}

export function applyResponsiveTreeLayout(
  nodes,
  edges,
  employeesByDepartment,
  vagasByDepartment
) {
  const structuralNodes = nodes.filter(
    (node) =>
      node.type !== "funcionario" &&
      node.type !== "vaga"
  );

  const structuralNodeMap = new Map(
    structuralNodes.map((node) => [node.id, node])
  );

  const visibleNodeIds = new Set(
    nodes.map((node) => node.id)
  );

  const childrenByParent = new Map();
  const parentByChild = new Map();

  /*
   * Constrói a hierarquia estrutural.
   *
   * Caso um nó possua dois pais, o primeiro relacionamento
   * será usado para posicionamento. As duas linhas ainda
   * poderão continuar visíveis no React Flow.
   */
  edges.forEach((edge) => {
    if (
      !structuralNodeMap.has(edge.source) ||
      !structuralNodeMap.has(edge.target)
    ) {
      return;
    }

    if (parentByChild.has(edge.target)) {
      return;
    }

    parentByChild.set(edge.target, edge.source);

    if (!childrenByParent.has(edge.source)) {
      childrenByParent.set(edge.source, []);
    }

    childrenByParent
      .get(edge.source)
      .push(edge.target);
  });

  const rootNodes = structuralNodes.filter(
    (node) => !parentByChild.has(node.id)
  );

  const subtreeWidths = new Map();
  const calculatingNodes = new Set();

  function calculateSubtreeWidth(nodeId) {
    if (subtreeWidths.has(nodeId)) {
      return subtreeWidths.get(nodeId);
    }

    const node = structuralNodeMap.get(nodeId);

    if (!node) {
      return 0;
    }

    const nodeWidth = node.width ?? GERENTE_WIDTH;

    /*
     * Evita loop infinito caso exista uma relação circular.
     */
    if (calculatingNodes.has(nodeId)) {
      return nodeWidth;
    }

    calculatingNodes.add(nodeId);

    const children = childrenByParent.get(nodeId) || [];

    if (children.length === 0) {
      calculatingNodes.delete(nodeId);
      subtreeWidths.set(nodeId, nodeWidth);

      return nodeWidth;
    }

    const childrenWidth = children.reduce(
      (total, childId, index) => {
        const childWidth =
          calculateSubtreeWidth(childId);

        return (
          total +
          childWidth +
          (index > 0 ? HORIZONTAL_GAP : 0)
        );
      },
      0
    );

    const subtreeWidth = Math.max(
      nodeWidth,
      childrenWidth
    );

    calculatingNodes.delete(nodeId);
    subtreeWidths.set(nodeId, subtreeWidth);

    return subtreeWidth;
  }

  rootNodes.forEach((rootNode) => {
    calculateSubtreeWidth(rootNode.id);
  });

  const calculatedPositions = new Map();
  const positionedNodes = new Set();

  function getNodeBlockHeight(node) {
    if (node.type !== "departamento") {
      return (
        node.height ??
        nodeHeightByType[node.type] ??
        nodeHeightByType.gerente
      );
    }

    return calculateDepartmentBlockHeight(
      node.id,
      visibleNodeIds,
      employeesByDepartment,
      vagasByDepartment
    );
  }

  function positionSubtree(nodeId, left, top) {
    if (positionedNodes.has(nodeId)) {
      return;
    }

    const node = structuralNodeMap.get(nodeId);

    if (!node) {
      return;
    }

    positionedNodes.add(nodeId);

    const nodeWidth = node.width ?? GERENTE_WIDTH;
    const subtreeWidth =
      subtreeWidths.get(nodeId) ?? nodeWidth;

    calculatedPositions.set(nodeId, {
      x: left + (subtreeWidth - nodeWidth) / 2,
      y: top,
    });

    const children = childrenByParent.get(nodeId) || [];

    if (children.length === 0) {
      return;
    }

    const childrenTotalWidth = children.reduce(
      (total, childId, index) => {
        const childWidth =
          subtreeWidths.get(childId) ??
          GERENTE_WIDTH;

        return (
          total +
          childWidth +
          (index > 0 ? HORIZONTAL_GAP : 0)
        );
      },
      0
    );

    let childLeft =
      left + (subtreeWidth - childrenTotalWidth) / 2;

    const childTop =
      top +
      getNodeBlockHeight(node) +
      VERTICAL_GAP;

    children.forEach((childId) => {
      const childWidth =
        subtreeWidths.get(childId) ??
        GERENTE_WIDTH;

      positionSubtree(
        childId,
        childLeft,
        childTop
      );

      childLeft += childWidth + HORIZONTAL_GAP;
    });
  }

  let rootLeft = MARGIN_X;

  rootNodes.forEach((rootNode) => {
    const rootWidth =
      subtreeWidths.get(rootNode.id) ??
      GERENTE_WIDTH;

    positionSubtree(
      rootNode.id,
      rootLeft,
      MARGIN_Y
    );

    rootLeft += rootWidth + ROOT_GAP;
  });

  return nodes.map((node) => {
    const position = calculatedPositions.get(node.id);

    if (!position) {
      return node;
    }

    return {
      ...node,
      position,
    };
  });
}