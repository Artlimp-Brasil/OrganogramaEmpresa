export default function ErrorState({ message = "Ocorreu um erro." }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        color: "#b91c1c",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {message}
    </div>
  );
}