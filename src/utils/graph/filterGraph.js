import { VIEW_MODES } from "../../constants/organograma";

export function filterGraph(
  nodes,
  edges,
  departmentFilter,
  viewMode,
  employeesByDepartment,
  vagasByDepartment
) {
  if (!departmentFilter && viewMode === VIEW_MODES.ALL) {
    return { nodes, edges };
  }

  const incomingByTarget = new Map();

  edges.forEach((edge) => {
    if (!incomingByTarget.has(edge.target)) {
      incomingByTarget.set(edge.target, []);
    }
    incomingByTarget.get(edge.target).push(edge);
  });

  const visibleNodeIds = new Set();

  function includeAncestors(nodeId) {
    if (!nodeId || visibleNodeIds.has(nodeId)) return;

    visibleNodeIds.add(nodeId);

    const incoming = incomingByTarget.get(nodeId) || [];
    incoming.forEach((edge) => includeAncestors(edge.source));
  }

  if (departmentFilter) {
    includeAncestors(departmentFilter);
    visibleNodeIds.add(departmentFilter);

    if (viewMode === VIEW_MODES.ALL) {
      const employeeIds = employeesByDepartment.get(departmentFilter) || [];
      const vagaIds = vagasByDepartment.get(departmentFilter) || [];

      employeeIds.forEach((id) => visibleNodeIds.add(id));
      vagaIds.forEach((id) => visibleNodeIds.add(id));
    }

    if (viewMode === VIEW_MODES.VAGAS) {
      const vagaIds = vagasByDepartment.get(departmentFilter) || [];
      vagaIds.forEach((id) => visibleNodeIds.add(id));
    }
  } else if (viewMode === VIEW_MODES.VAGAS) {
    for (const [departmentId, vagaIds] of vagasByDepartment.entries()) {
      if (!vagaIds.length) continue;

      includeAncestors(departmentId);
      visibleNodeIds.add(departmentId);
      vagaIds.forEach((id) => visibleNodeIds.add(id));
    }
  }

  const filteredNodes = nodes.filter((node) => visibleNodeIds.has(node.id));

  const filteredEdges = edges.filter(
    (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
  );

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  };
}