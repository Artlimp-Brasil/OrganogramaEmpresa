import { Handle, Position } from "reactflow";
import { GERENTE_WIDTH } from "../../../utils/style/nodeDimensions";
import {
  getDiscColor,
  getMbtiColor,
} from "../../../utils/style/badgeColors";

export default function GerenteNode({ data }) {
  const perfilDisc = data.perfilDisc || "";
  const status = data.status || "Ativo";
  const grupoMBTI = data.grupoMBTI || "";

  const discColors = getDiscColor(perfilDisc);
  const mbtiColors = getMbtiColor(grupoMBTI);

  return (
    <div
      style={{
        width: GERENTE_WIDTH,
        minWidth: GERENTE_WIDTH,
        maxWidth: GERENTE_WIDTH,
        //boxSizing: "border-box",
        padding: "14px 16px",
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "#e5e7eb",
        color: "#111827",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div style={{ fontSize: 12, opacity: 0.8 }}>{data.linha1}</div>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{data.linha2}</div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
<div
        style={{
          marginTop: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 9px",
            borderRadius: 999,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            fontSize: 11,
            color: "#334155",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: status === "Ativo" ? "#22c55e" : "#ef4444",
              display: "inline-block",
            }}
          />
          {status}
        </div>

        {perfilDisc && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              border: `1px solid ${discColors.border}`,
              background: discColors.bg,
              color: discColors.text,
            }}
          >
            {perfilDisc}
          </div>
        )}

        {grupoMBTI && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              border: `1px solid ${mbtiColors.border}`,
              background: mbtiColors.bg,
              color: mbtiColors.text,
            }}
          >
            {grupoMBTI}
          </div>
        )}
      </div>
    </div>

   
  );
}