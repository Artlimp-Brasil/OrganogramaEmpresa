import { ORGANOGRAMA_API_URL } from "../constants/organograma";

export async function fetchOrganograma() {
  const response = await fetch(ORGANOGRAMA_API_URL);

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  const data = await response.json();

  return data.elements || [];
}