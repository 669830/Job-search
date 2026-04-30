import {useState} from 'react';
import { fetchJobSuggestions } from '../utils/api';

const initialProfile = {
    name: "",
    education:"",
    experience:"",
    skills: [],
    preferences:[],
    interest: "",
    extra: "",
};

export function useJobFinder(){
    const [profile, setProfile] = useState(initialProfile);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    function updateField(field, value){
        setProfile((prev) => ({...prev, [field]: value}));
    }

    function toggleArrayItem(field, value){
        setProfile((prev) => {
            const arr = prev[field];
            return {
                ...prev,
                [field]: arr.includes(value) 
                ? arr.filter(i => i !== value) 
                : [...arr, value]
            }
        })
    }

async function submit(){
    setLoading(true);
    setError(null);
    setSubmitted(true);

    try{
        const results = await fetchJobSuggestions(profile);
        setJobs(results);

    } catch(err){
        setError("Something went wrong, try again");
    } finally {
        setLoading(false);
    }
}

function reset(){
    setProfile(initialProfile);
    setJobs([]);
    setError(null);
    setSubmitted(false);
}

const isValid =
    profile.education && profile.experince && profile.skills.length > 0;

    return{
        profile, jobs, loading, error, submitted, isValid,
        updateField, toggleArrayItem, submit, reset,
    };
}