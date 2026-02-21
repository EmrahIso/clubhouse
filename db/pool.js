const { Pool } = require('pg');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
