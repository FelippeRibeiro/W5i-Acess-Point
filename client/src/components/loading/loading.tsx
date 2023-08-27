import "./loading.css";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#161616",
      }}
    >
      <div className="loader"></div>
    </div>
  );
}
