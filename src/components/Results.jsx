import JobCard from "./JobCard";

export default function Results({ jobs, loading, error, name, onReset }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
        <p>Finding your best job matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#c0392b" }}>
        <p>{error}</p>
        <button onClick={onReset}>← Try again</button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "1rem" }}>
        Your top job matches{name ? `, ${name}` : ""}
      </h2>

      {jobs.map((job, i) => (
        <JobCard key={i} job={job} />
      ))}

      <button
        onClick={onReset}
        style={{
          marginTop: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#888",
          textDecoration: "underline",
          fontFamily: "inherit",
          fontSize: "13px",
        }}
      >
        ← Start over
      </button>
    </div>
  );
}