const { Client } = require('pg');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const SQL_INIT = `
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  is_member BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
`;

async function initDB() {
  try {
    await client.connect();

    await client.query(SQL_INIT);
    console.log('Database initialized successfully');

    await client.end();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDB();
