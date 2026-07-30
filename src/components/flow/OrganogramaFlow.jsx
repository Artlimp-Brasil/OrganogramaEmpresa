import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  useReactFlow,
} from "reactflow";

import { nodeTypes } from "./nodes";
import "reactflow/dist/style.css";

function AutoFitView({ nodes, edges }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (!nodes.length) return;

    /*
     * Aguarda o React Flow processar as novas posições
     * antes de ajustar a visualização.
     */
    const animationFrame = requestAnimationFrame(() => {
      fitView({
        padding: 0.15,
        minZoom: 0.2,
        maxZoom: 1,
        duration: 400,
      });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [nodes, edges, fitView]);

  return null;
}

export default function OrganogramaFlow({ nodes, edges }) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.15,
        minZoom: 0.2,
        maxZoom: 1,
      }}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      zoomOnScroll
      panOnDrag
      minZoom={0.1}
      maxZoom={1.5}
      defaultEdgeOptions={{
        type: "smoothstep",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: {
          stroke: "#94a3b8",
          strokeWidth: 2,
        },
      }}
    >
      <AutoFitView nodes={nodes} edges={edges} />

      <Background
        gap={18}
        size={1}
        color="#e2e8f0"
      />

      <Controls />
    </ReactFlow>
  );
}