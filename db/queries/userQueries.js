const pool = require('../pool');

async function isEmailTaken(email) {
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking email in database:', error);
    throw error;
  }
}

async function isUsernameTaken(username) {
  try {
    const result = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking username in database:', error);
    throw error;
  }
}

async function addUser({ username, full_name, email, hash, salt, isMember }) {
  try {
    await pool.query(
      'INSERT INTO users (username, full_name, email, password_hash, password_salt, is_member) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, full_name, email, hash, salt, isMember]
    );
  } catch (error) {
    console.error('Error adding user to database:', error);
    throw error;
  }
}

async function getUserByEmail({ email }) {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return rows[0];
  } catch (error) {
    console.error('Error database:', error);
    throw error;
  }
}

async function getUserById({ userId }) {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);

    return rows[0];
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

module.exports = {
  isEmailTaken,
  isUsernameTaken,
  addUser,
  getUserByEmail,
  getUserById,
};
