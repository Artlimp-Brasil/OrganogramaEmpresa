import ReactFlow, {
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import { nodeTypes } from "./nodes";
import "reactflow/dist/style.css";

export default function OrganogramaFlow({ nodes, edges }) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      zoomOnScroll
      panOnDrag
      minZoom={0.2}
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
      <Background gap={18} size={1} color="#e2e8f0" />
      <Controls />
    </ReactFlow>
  );
}