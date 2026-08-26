import { Handle, Position } from "reactflow";
import { DEPARTAMENTO_WIDTH } from "../../../utils/style/nodeDimensions";
import { getBgColor, getBorderColor } from "../../../utils/style/badgeColors";

export default function DepartamentoNode({ data }) {
  const numFuncIdeal = Number(data.numFuncIdeal || 0);
  const numFuncAtual = Number(data.numFuncAtual || 0);

  const bgColor     = getBgColor( numFuncIdeal,numFuncAtual )
  const borderColor = getBorderColor( numFuncIdeal,numFuncAtual )


  return (
    <div
      style={{
        width: DEPARTAMENTO_WIDTH,
        minWidth: DEPARTAMENTO_WIDTH,
        maxWidth: DEPARTAMENTO_WIDTH,
        padding: "14px 18px",
        borderRadius: 16,
        border: `2px solid ${borderColor}`,
        background:  bgColor,
        color: "#ffffff",
        textAlign: "center",
        boxShadow: `0 4px 12px ${bgColor}40`,
        fontFamily: "Arial, sans-serif",
        whiteSpace: "normal",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div style={{ fontSize: 12, opacity: 0.9 }}>{data.linha1}</div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {data.linha2}
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
            color: "#ffffff",
          }}
        >
          {numFuncAtual} / {numFuncIdeal || 0}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}