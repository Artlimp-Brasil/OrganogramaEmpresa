import { Handle, Position } from "reactflow";
import { CARD_WIDTH } from "../../../utils/style/nodeDimensions";

export default function VagaNode({ data }) {
  const titulo = data.linha2 || "Vaga em aberto";
  const subtitulo = data.nivel || data.linha1 || "Vaga";
  const status = data.status || "Vaga Aberta";

  return (
    <div
      style={{
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        padding: 14,
        borderRadius: 16,
        border: "2px dashed #94a3b8",
        background: "#f8fafc",
        boxShadow: "none",
        fontFamily: "Arial, sans-serif",
        color: "#334155",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#64748b",
            flexShrink: 0,
          }}
        >
          +
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 2,
            }}
          >
            {titulo}
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{subtitulo}</div>
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 600,
          border: "1px solid #fdba74",
          background: "#fff7ed",
          color: "#9a3412",
        }}
      >
        {status}
      </div>
    </div>
  );
}