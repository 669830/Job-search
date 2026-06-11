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