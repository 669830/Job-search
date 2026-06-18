import { useState } from 'react';
import { fetchJobSuggestions, saveProfile, saveJobs } from '../utils/api';

const initialProfile = {
  name: "",
  education: "",
  experience: "",
  skills: [],
  preferences: [],
  interests: "",
  extra: "",
};

export function useJobFinder() {
  const [profile, setProfile] = useState(initialProfile);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArrayItem(field, value) {
    setProfile((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter(i => i !== value)
          : [...arr, value],
      };
    });
  }

  async function submit() {
    setLoading(true);
    setError(null);
    setSubmitted(true);
    try {
      const savedProfile = await saveProfile(profile);
      const results = await fetchJobSuggestions(profile);
      await saveJobs(savedProfile.id, results);
      setJobs(results);
    } catch (err) {
      setError("Noe gikk galt, prøv igjen");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setProfile(initialProfile);
    setJobs([]);
    setError(null);
    setSubmitted(false);
  }

  const isValid =
    profile.education && profile.experience && profile.skills.length > 0;

  return {
    profile, jobs, loading, error, submitted, isValid,
    updateField, toggleArrayItem, submit, reset,
  };
}