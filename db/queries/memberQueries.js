const pool = require('../pool');

async function updateMemberStatus({ userId, newValue }) {
  try {
    await pool.query('UPDATE users SET is_member = $1 WHERE id = $2', [
      newValue,
      userId,
    ]);
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

module.exports = {
  updateMemberStatus,
};
