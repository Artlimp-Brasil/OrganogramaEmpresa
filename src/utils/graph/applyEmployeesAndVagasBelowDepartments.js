import {
  CARD_WIDTH,
  EMPLOYEE_GAP,
  EMPLOYEE_START_OFFSET,
  nodeHeightByType,
} from "../style/nodeDimensions";

export function applyEmployeesAndVagasBelowDepartments(
  nodes,
  employeesByDepartment,
  vagasByDepartment
) {
  const updated = [...nodes];
  const map = new Map(updated.map((node) => [node.id, node]));

  const departmentNodes = updated.filter((node) => node.type === "departamento");

  for (const departmentNode of departmentNodes) {
    const departmentId = departmentNode.id;

    const funcionarios = (employeesByDepartment.get(departmentId) || [])
      .map((id) => map.get(id))
      .filter(Boolean);

    const vagas = (vagasByDepartment.get(departmentId) || [])
      .map((id) => map.get(id))
      .filter(Boolean);

    const columnX = departmentNode.position.x;
    let currentY =
      departmentNode.position.y +
      (departmentNode.height ?? nodeHeightByType.departamento) +
      EMPLOYEE_START_OFFSET;

    for (const funcionarioNode of funcionarios) {
      funcionarioNode.position = {
        x: columnX,
        y: currentY,
      };

      funcionarioNode.width = CARD_WIDTH;
      funcionarioNode.height = nodeHeightByType.funcionario;

      currentY += nodeHeightByType.funcionario + EMPLOYEE_GAP;
    }

    if (vagas.length) {
      currentY += 12;
    }

    for (const vagaNode of vagas) {
      vagaNode.position = {
        x: columnX,
        y: currentY,
      };

      vagaNode.width = CARD_WIDTH;
      vagaNode.height = nodeHeightByType.vaga;

      currentY += nodeHeightByType.vaga + EMPLOYEE_GAP;
    }
  }

  return updated;
}