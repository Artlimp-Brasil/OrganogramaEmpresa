import dagre from "dagre";
import { GERENTE_WIDTH } from "../style/nodeDimensions";

export function applyDagreLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "TB",
    ranksep: 110,
    nodesep: 90,
    edgesep: 24,
    marginx: 40,
    marginy: 40,
  });

  nodes.forEach((node) => {
    const width = node.width ?? GERENTE_WIDTH;
    const height = node.height ?? 84;

    const layoutWidth =
      node.type === "funcionario" || node.type === "vaga" ? 8 : width;
    const layoutHeight =
      node.type === "funcionario" || node.type === "vaga" ? 8 : height;

    g.setNode(node.id, { width: layoutWidth, height: layoutHeight });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const position = g.node(node.id);
    const width = node.width ?? GERENTE_WIDTH;
    const height = node.height ?? 84;

    return {
      ...node,
      position: {
        x: (position?.x ?? 0) - width / 2,
        y: (position?.y ?? 0) - height / 2,
      },
    };
  });
}