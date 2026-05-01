export default function JobCard({ job }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8e8e8",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      marginBottom: "0.75rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "500", color: "#111" }}>
          {job.title}
        </h3>
        <span style={{
          fontSize: "12px",
          padding: "3px 10px",
          borderRadius: "100px",
          background: "#eaf3de",
          color: "#3b6d11",
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}>
          {job.match}
        </span>
      </div>

      <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#555", lineHeight: "1.65" }}>
        {job.why}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {job.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: "12px",
            padding: "3px 10px",
            borderRadius: "6px",
            background: "#f4f4f4",
            color: "#666",
            border: "1px solid #e8e8e8",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}