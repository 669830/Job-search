const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Oppretter tabellene automatisk ved oppstart hvis de ikke finnes
pool.query(`
  CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    name TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT[],
    preferences TEXT[],
    interests TEXT,
    extra TEXT
  );
  CREATE TABLE IF NOT EXISTS job_results (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    title TEXT,
    match TEXT,
    why TEXT,
    tags TEXT[]
  );
`)
  .then(() => console.log('Tabeller klare'))
  .catch((err) => console.error('Kunne ikke opprette tabeller:', err));

module.exports = pool;
