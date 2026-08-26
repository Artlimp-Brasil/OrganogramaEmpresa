export function getDiscColor(perfil = "") {
  const letra = perfil.trim().charAt(0).toUpperCase();

  switch (letra) {
    case "D":
      return {
        bg: "#fee2e2",
        border: "#ef4444",
        text: "#991b1b",
      };
    case "I":
      return {
        bg: "#dcfce7",
        border: "#22c55e",
        text: "#166534",
      };
    case "S":
      return {
        bg: "#dbeafe",
        border: "#3b82f6",
        text: "#1e3a8a",
      };
    case "C":
      return {
        bg: "#fef9c3",
        border: "#eab308",
        text: "#854d0e",
      };
    default:
      return {
        bg: "#f1f5f9",
        border: "#cbd5e1",
        text: "#334155",
      };
  }
}

export function getMbtiColor(grupo = "") {
  const g = grupo.toLowerCase();

  if (g.includes("analista")) {
    return {
      bg: "#f3e8ff",
      border: "#a855f7",
      text: "#6b21a8",
    };
  }

  if (g.includes("diplomata")) {
    return {
      bg: "#dcfce7",
      border: "#22c55e",
      text: "#166534",
    };
  }

  if (g.includes("sentinela")) {
    return {
      bg: "#dbeafe",
      border: "#3b82f6",
      text: "#1e3a8a",
    };
  }

  if (g.includes("explorador")) {
    return {
      bg: "#fef9c3",
      border: "#eab308",
      text: "#854d0e",
    };
  }

  return {
    bg: "#f1f5f9",
    border: "#cbd5e1",
    text: "#334155",
  };
}

export const getBorderColor = ( numFuncIdeal,numFuncAtual ) => {
  
  if ( !numFuncAtual && !numFuncAtual ) return "#dbe3ea"
  if ( numFuncIdeal > 0 && numFuncAtual > numFuncIdeal ) return "#6917a0"
  if ( numFuncIdeal > 0 && numFuncAtual < numFuncIdeal ) return "#991b1b"
  return "#084298" 
  
}


export const getBgColor = ( numFuncIdeal,numFuncAtual ) => {
    
  if ( !numFuncAtual && !numFuncAtual ) return "#747474"
  if ( numFuncIdeal > 0 && numFuncAtual > numFuncIdeal ) return "#9326dc"
  if ( numFuncIdeal > 0 && numFuncAtual < numFuncIdeal ) return "#dc2626"
  return "#0d6efd" 

}