import { useState, useEffect } from "react";
import { VIEW_MODES } from "../../constants/organograma";
import CustomSelect from "../ui/CustomSelect";

export default function OrganogramaFilters({
  departmentFilter,
  viewMode,
  departmentOptions,
  onDepartmentChange,
  onViewModeChange,
  onClearFilters,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const viewModeOptions = [
    { value: VIEW_MODES.ALL, label: "Visualização completa" },
    { value: VIEW_MODES.VAGAS, label: "Somente vagas" },
  ];

  return (
    <div
      style={{
        position: "fixed", // Sempre fixo
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100, // Valor alto para garantir que fique sobre o organograma
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 12 : 24,
        padding: isMobile ? "12px 16px" : "14px 16px",
        background: "rgba(255, 255, 255, 0.98)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(8px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-end",
          gap: isMobile ? 12 : 24,
        }}
      >
        <div style={{ margin: 0 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 2
          }}>
            Estrutura organizacional
          </span>
          <h1 style={{
            fontSize: isMobile ? 16 : 18,
            fontWeight: 800,
            color: "#0f172a",
            margin: 0, // Remove margens que causam espaços em branco
            padding: 0,
            lineHeight: 1.1
          }}>
            Organograma Artlimp / Palácio
          </h1>
        </div>

        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: 10 
        }}>
          <CustomSelect
            label="Departamento"
            value={departmentFilter}
            onChange={onDepartmentChange}
            options={departmentOptions}
            placeholder="Todos"
            width={isMobile ? "100%" : 260}
          />

          <CustomSelect
            label="Visualização"
            value={viewMode}
            onChange={onViewModeChange}
            options={viewModeOptions}
            width={isMobile ? "100%" : 220}
          />
        </div>
      </div>

      <button
        onClick={onClearFilters}
        style={{
          height: isMobile ? 40 : 44,
          marginTop: isMobile ? 4 : 0,
          padding: "0 16px",
          borderRadius: 10,
          border: "1px solid #dbe3ea",
          background: "#f8fafc",
          color: "#334155",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          width: isMobile ? "100%" : "auto",
        }}
      >
        Limpar filtros
      </button>
    </div>
  );
}
