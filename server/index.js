const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Databasefeil:', err);
  } else {
    console.log('Database tilkoblet:', res.rows[0].now);
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const rateLimit = require('express-rate-limit');

// Maks 10 jobbforslag per IP per 15 min — beskytter Claude-kvoten din
const suggestLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

app.post('/suggest-jobs', suggestLimiter, async (req, res) => {
  const { name, education, experience, skills, preferences, interest, extra } = req.body;
  const prompt = `Based on the following user profile, suggest 5 job titles that would be a good fit. Provide a brief description for each job title.

Profile:
- Name: ${name || "Not provided"}
- Education: ${education || "Not provided"}
- Experience: ${experience || "Not provided"}
- Skills: ${(skills || []).join(", ") || "Not provided"}
- Preferences: ${(preferences || []).join(", ") || "Not provided"}
- Interest: ${interest || "Not provided"}
- Extra: ${extra || "Not provided"}

Respond ONLY with a JSON array. No preamble, no markdown, no code fences. Pure JSON only.
Each object must have: "title", "match", "why", "tags" (array of 3-4 strings).`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!r.ok) return res.status(r.status).json({ error: 'Claude API-feil' });
    const data = await r.json();
    const text = data.content.map((i) => i.text || '').join('');
    res.json(JSON.parse(text.replace(/```json|```/g, '').trim()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunne ikke hente jobbforslag' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server kjører!' });
});

app.post('/profiles', async (req, res) => {
  const { name, education, experience, skills, preferences, interests, extra } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO profiles (name, education, experience, skills, preferences, interests, extra)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, education, experience, skills, preferences, interests, extra]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunne ikke lagre profil' });
  }
});

app.post('/profiles/:id/jobs', async (req, res) => {
  const { id } = req.params;
  const jobs = req.body;
  try {
    const savedJobs = await Promise.all(
      jobs.map(job =>
        pool.query(
          `INSERT INTO job_results (profile_id, title, match, why, tags)
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [id, job.title, job.match, job.why, job.tags]
        )
      )
    );
    res.json(savedJobs.map(r => r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunne ikke lagre jobber' });
  }
});

app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});