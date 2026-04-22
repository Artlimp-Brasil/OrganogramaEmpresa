export async function fetchOrganograma() {
  try {
    const response = await fetch(import.meta.env.VITE_ORGANOGRAMA_API_URL, {
      method: "GET",
      headers: {
        "authorization": `${import.meta.env.VITE_N8N_HEADER}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data.elements ?? []; 
    
  } catch (error) {
    console.error("Falha ao buscar organograma:", error);
    throw error; 
  }
}
