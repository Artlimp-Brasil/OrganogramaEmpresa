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
  const viewModeOptions = [
    { value: VIEW_MODES.ALL, label: "Visualização completa" },
    { value: VIEW_MODES.VAGAS, label: "Somente vagas" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        minHeight: 88,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "14px 16px",
        background: "rgba(255, 255, 255, 0.96)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(8px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 220,
            marginRight: 4,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#64748b",
              fontFamily: "Arial, sans-serif",
              marginBottom: 4,
            }}
          >
            Estrutura organizacional
          </span>

          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#0f172a",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.2,
            }}
          >
            Organograma Artlimp Brasil / Palácio das Festas
          </span>
        </div>

        <CustomSelect
          label="Departamento"
          value={departmentFilter}
          onChange={onDepartmentChange}
          options={departmentOptions}
          placeholder="Todos os departamentos"
          width={280}
        />

        <CustomSelect
          label="Modo de visualização"
          value={viewMode}
          onChange={onViewModeChange}
          options={viewModeOptions}
          placeholder=""
          width={240}
        />
      </div>

      <button
        onClick={onClearFilters}
        style={{
          height: 44,
          padding: "0 16px",
          borderRadius: 14,
          border: "1px solid #dbe3ea",
          background: "#f8fafc",
          color: "#334155",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#eef2f7";
          e.currentTarget.style.border = "1px solid #cbd5e1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f8fafc";
          e.currentTarget.style.border = "1px solid #dbe3ea";
        }}
      >
        Limpar filtros
      </button>
    </div>
  );
}