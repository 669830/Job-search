const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const BACKEND_URL = 'http://localhost:3000';

export async function fetchJobSuggestions(profile){
    const {name, education, experience, skills, preferences, interest, extra} = profile;
    const prompt = `Based on the following user profile, suggest 5 job titles that would be a good fit. Provide a brief description for each job title.

Profile:
- Name: ${name || "Not provided"}
- Education: ${education || "Not provided"}
- Experience: ${experience || "Not provided"}
- Skills: ${skills.join(", ") || "Not provided"}
- Preferences: ${preferences?.join(", ") || "Not provided"}
- Interest: ${interest || "Not provided"}
- Extra: ${extra || "Not provided"}

Respond ONLY with a JSON array. No preamble, no markdown, no code fences. Pure JSON only.
Each object must have: "title", "match", "why", "tags" (array of 3-4 strings).`;

const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
        "Content-Type" : "application/json",
        "x-api-key":API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages:[{role:"user", content: prompt}]
    }),
});

if(!response.ok){
   throw new Error(`API error: ${response.status}`);
}

const data = await response.json();
const text = data.content.map((i) => i.text || "").join("");
const clean = text.replace(/```json|```/g, "").trim();
return JSON.parse(clean);
}

export async function saveProfile(profile){
    const response = await fetch(`${BACKEND_URL}/profiles`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error('Kunne ikke lagre profil');
    return response.json();
}

export async function saveJobs(profileId, jobs) {
  const response = await fetch(`${BACKEND_URL}/profiles/${profileId}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobs),
  });
  if (!response.ok) throw new Error('Kunne ikke lagre jobber');
  return response.json();
}
