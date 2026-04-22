import { useMemo, useState } from "react";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import OrganogramaFlow from "../components/flow/OrganogramaFlow";
import OrganogramaFilters from "../components/filters/OrganogramaFilters";
import { useOrganograma } from "../hooks/useOrganograma";
import { buildGraph } from "../utils/graph/buildGraph";
import { filterGraph } from "../utils/graph/filterGraph";
import { applyDagreLayout } from "../utils/graph/applyDagreLayout";
import { applyEmployeesAndVagasBelowDepartments } from "../utils/graph/applyEmployeesAndVagasBelowDepartments";
import { VIEW_MODES } from "../constants/organograma";

export default function OrganogramaPage() {
  const { rawElements, loading, error } = useOrganograma();
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODES.ALL);

  const departmentOptions = useMemo(() => {
  return rawElements
    .filter((item) => item?.data?.tipo === "departamento")
    .map((item) => ({
      value: item.data.id,
      label: (item.data.label || "").split("\n")[1] || item.data.id,
    }))
    .filter((item) => item.value !== "dpto_diretoria");
}, [rawElements]);

  const { nodes, edges } = useMemo(() => {
    const {
      nodes: baseNodes,
      edges: baseEdges,
      employeesByDepartment,
      vagasByDepartment,
    } = buildGraph(rawElements);

    const { nodes: filteredNodes, edges: filteredEdges } = filterGraph(
      baseNodes,
      baseEdges,
      departmentFilter,
      viewMode,
      employeesByDepartment,
      vagasByDepartment
    );

    const topAlignedNodes = applyDagreLayout(filteredNodes, filteredEdges);

    const finalNodes = applyEmployeesAndVagasBelowDepartments(
      topAlignedNodes,
      employeesByDepartment,
      vagasByDepartment
    );

    return {
      nodes: finalNodes,
      edges: filteredEdges,
    };
  }, [rawElements, departmentFilter, viewMode]);

  if (loading) {
    return <LoadingState message="Carregando organograma..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f8fafc",
        paddingTop: 72,
        boxSizing: "border-box",
      }}
    >
      <OrganogramaFilters
        departmentFilter={departmentFilter}
        viewMode={viewMode}
        departmentOptions={departmentOptions}
        onDepartmentChange={setDepartmentFilter}
        onViewModeChange={setViewMode}
        onClearFilters={() => {
          setDepartmentFilter("");
          setViewMode(VIEW_MODES.ALL);
        }}
      />

      <OrganogramaFlow nodes={nodes} edges={edges} />
    </div>
  );
}