import { useJobFinder } from "./hooks/useJobFinder";
import ProfileForm from "./components/ProfileForm";
import Results from "./components/Results";

export default function App() {
  const {
    profile,
    jobs,
    loading,
    error,
    submitted,
    isValid,
    updateField,
    toggleArrayItem,
    submit,
    reset,
  } = useJobFinder();

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem 4rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "600", color: "#111", letterSpacing: "-0.5px" }}>
            Job Finder
          </h1>
          <p style={{ fontSize: "15px", color: "#777", marginTop: "6px" }}>
            Fortell om deg selv, og AI vil foreslå de perfekte jobbene for deg.
          </p>
        </div>

        {!submitted ? (
          <ProfileForm
            profile={profile}
            isValid={isValid}
            onUpdate={updateField}
            onToggle={toggleArrayItem}
            onSubmit={submit}
          />
        ) : (
          <Results
            jobs={jobs}
            loading={loading}
            error={error}
            name={profile.name}
            onReset={reset}
          />
        )}

      </div>
    </div>
  );
}