const pool = require('../pool');

async function updateAdminStatus({ userId, newValue }) {
  try {
    await pool.query('UPDATE users SET is_admin = $1 WHERE id = $2', [
      newValue,
      userId,
    ]);
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

module.exports = {
  updateAdminStatus,
};
