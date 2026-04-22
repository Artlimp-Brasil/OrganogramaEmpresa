import { MarkerType } from "reactflow";
import { parseLabel } from "../format/parseLabel";
import {
  GERENTE_WIDTH,
  nodeHeightByType,
  nodeWidthByType,
} from "../style/nodeDimensions";

export function buildGraph(rawElements = []) {
  const allNodes = rawElements.filter(
    (item) => item?.data && !item.data.source && !item.data.target
  );

  const allEdges = rawElements.filter(
    (item) => item?.data && item.data.source && item.data.target
  );

  const departmentIds = new Set(
    allNodes
      .filter((node) => node.data.tipo === "departamento")
      .map((node) => node.data.id)
  );

  const employeeIds = new Set(
    allNodes
      .filter((node) => node.data.tipo === "funcionario")
      .map((node) => node.data.id)
  );

  const vagaIds = new Set(
    allNodes
      .filter((node) => node.data.tipo === "vaga")
      .map((node) => node.data.id)
  );

  const reactFlowNodes = allNodes.map((node) => {
    const { id, tipo, label } = node.data;
    const parsed = parseLabel(label);

    return {
      id,
      type:
        tipo === "funcionario"
          ? "funcionario"
          : tipo === "vaga"
            ? "vaga"
            : tipo === "departamento"
              ? "departamento"
              : "gerente",
      position: { x: 0, y: 0 },
      data: {
        ...node.data,
        ...parsed,
      },
      draggable: false,
      connectable: false,
      selectable: true,
      width: nodeWidthByType[tipo] ?? GERENTE_WIDTH,
      height: nodeHeightByType[tipo] ?? 84,
    };
  });

  const nodesMap = new Map(reactFlowNodes.map((node) => [node.id, node]));

  const reactFlowEdges = allEdges
    .filter((edge) => {
      const isEmployeeLink =
        departmentIds.has(edge.data.source) &&
        employeeIds.has(edge.data.target);

      const isVagaLink =
        departmentIds.has(edge.data.source) &&
        vagaIds.has(edge.data.target);

      return !(isEmployeeLink || isVagaLink);
    })
    .map((edge) => ({
      id: edge.data.id ?? `${edge.data.source}-${edge.data.target}`,
      source: edge.data.source,
      target: edge.data.target,
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 18,
        height: 18,
      },
      style: {
        stroke: "#94a3b8",
        strokeWidth: 2,
      },
    }));

  const employeesByDepartment = new Map();
  const vagasByDepartment = new Map();

  allEdges.forEach((edge) => {
    const source = edge.data.source;
    const target = edge.data.target;

    if (!departmentIds.has(source)) return;

    if (employeeIds.has(target)) {
      if (!employeesByDepartment.has(source)) {
        employeesByDepartment.set(source, []);
      }
      employeesByDepartment.get(source).push(target);
    }

    if (vagaIds.has(target)) {
      if (!vagasByDepartment.has(source)) {
        vagasByDepartment.set(source, []);
      }
      vagasByDepartment.get(source).push(target);
    }
  });

  employeesByDepartment.forEach((employeeList) => {
    employeeList.sort((a, b) => {
      const nameA = parseLabel(nodesMap.get(a)?.data?.label || "").linha2 || "";
      const nameB = parseLabel(nodesMap.get(b)?.data?.label || "").linha2 || "";

      return nameA.localeCompare(nameB, "pt-BR", {
        sensitivity: "base",
      });
    });
  });

  vagasByDepartment.forEach((vagaList) => {
    vagaList.sort((a, b) => {
      const nameA = parseLabel(nodesMap.get(a)?.data?.label || "").linha2 || "";
      const nameB = parseLabel(nodesMap.get(b)?.data?.label || "").linha2 || "";

      return nameA.localeCompare(nameB, "pt-BR", {
        sensitivity: "base",
      });
    });
  });

  return {
    nodes: reactFlowNodes,
    edges: reactFlowEdges,
    employeesByDepartment,
    vagasByDepartment,
  };
}