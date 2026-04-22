export default function LoadingState({ message = "Carregando..." }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {message}
    </div>
  );
}