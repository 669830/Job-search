import TagSelector from "./TagSelector";
import { SKILLS, WORK_PREFERENCES } from "../data/options";

export default function ProfileForm({ profile, isValid, onUpdate, onToggle, onSubmit }) {
  return (
    <div>
      <div style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}>

        {/* Name */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Navn
          </label>
          <input
            type="text"
            placeholder="e.g. Ola Nordmann"
            value={profile.name}
            onChange={(e) => onUpdate("name", e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
          />
        </div>

        {/* Education + Experience */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              Utdanning
            </label>
            <select
              value={profile.education}
              onChange={(e) => onUpdate("education", e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
            >
              <option value="">Select...</option>
              <option>Videregående Skole</option>
              <option>Bachelor</option>
              <option>Master</option>
              <option>PhD</option>
              <option>Annet/Selvstudium</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              Erfaring
            </label>
            <select
              value={profile.experience}
              onChange={(e) => onUpdate("experience", e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
            >
              <option value="">Select...</option>
              <option>0–1 (student)</option>
              <option>2–3 år</option>
              <option>4–6 år</option>
              <option>7–10 år</option>
              <option>10+ år</option>
            </select>
          </div>
        </div>

        {/* Ferdigheter */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Ferdigheter
          </label>
          <TagSelector
            options={SKILLS}
            selected={profile.skills}
            onToggle={(val) => onToggle("skills", val)}
          />
        </div>

        {/* Job preferanser */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Job preferanser
          </label>
          <TagSelector
            options={WORK_PREFERENCES}
            selected={profile.preferences}
            onToggle={(val) => onToggle("preferences", val)}
          />
        </div>

        {/* Interesser */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Interesser
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Jeg liker å lære nye ting..."
            value={profile.interests}
            onChange={(e) => onUpdate("interests", e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }}
          />
        </div>

        {/* Annet */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Annet
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Jeg søker nye utforfringer og muligheter..."
            value={profile.extra}
            onChange={(e) => onUpdate("extra", e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!isValid}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "13px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "500",
          cursor: isValid ? "pointer" : "not-allowed",
          opacity: isValid ? 1 : 0.35,
          fontFamily: "inherit",
        }}
      >
        Finn jobb som passer meg
      </button>
    </div>
  );
}