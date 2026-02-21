const bcrypt = require('bcryptjs');

async function generatePassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return {
      salt,
      hash,
    };
  } catch (error) {
    console.error('Error generating password hash:', error);
    throw error;
  }
}

async function verifyPassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}

module.exports = {
  generatePassword,
  verifyPassword,
};
