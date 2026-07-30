import { Handle, Position } from "reactflow";
import { CARD_WIDTH } from "../../../utils/style/nodeDimensions";
import {
  getDiscColor,
  getMbtiColor,
} from "../../../utils/style/badgeColors";

export default function FuncionarioNode({ data }) {
  const nome = data.linha2 || data.nome || "Colaborador";
  const cargo = data.cargo || data.linha1 || "Colaborador";
  const status = data.status || "Ativo";
  const perfilDisc = data.perfilDisc || "";
  const grupoMBTI = data.grupoMBTI || "";

  const discColors = getDiscColor(perfilDisc);
  const mbtiColors = getMbtiColor(grupoMBTI);
  const colorBackground = status !== 'Ativo' ? "#ffb7b7" : "#ffffff" //a56d48
  const colorBorder = status !== 'Ativo' ? "2px solid #ef4444" : "2px solid #dbe3ea" //a56d48


  return (
    <div
      style={{
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        //boxSizing: "border-box",
        padding: 14,
        borderRadius: 16,
        border: colorBorder,
        background: colorBackground,
        boxShadow: "0 4px 14px rgba(30, 75, 180, 0.06)",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
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
            fontSize: 16,
            fontWeight: 700,
            color: "#334155",
            flexShrink: 0,
          }}
        >
          {nome?.charAt(0)?.toUpperCase() || "C"}
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
            {nome}
          </div>
          <div style={{ fontSize: 12, color: "#475569" }}>{cargo}</div>
        </div>
      </div>

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