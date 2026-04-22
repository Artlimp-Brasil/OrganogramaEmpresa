import { useEffect, useState } from "react";
import { fetchOrganograma } from "../services/organogramaService";

export function useOrganograma() {
  const [rawElements, setRawElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrganograma() {
      try {
        setLoading(true);
        setError("");

        const elements = await fetchOrganograma();
        setRawElements(elements);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o organograma.");
      } finally {
        setLoading(false);
      }
    }

    loadOrganograma();
  }, []);

  return {
    rawElements,
    loading,
    error,
  };
}