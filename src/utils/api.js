
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchJobSuggestions(profile) {
  const response = await fetch(`${BACKEND_URL}/suggest-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function saveProfile(profile) {
  const response = await fetch(`${BACKEND_URL}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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