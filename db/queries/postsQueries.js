const pool = require('../pool');

async function addNewPost({ userId, title, content }) {
  try {
    await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
      [userId, title, content]
    );
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

async function getAllPostsCount() {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) FROM posts');

    return rows[0].count;
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

async function getAllPosts() {
  try {
    const { rows } = await pool.query(
      'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC;'
    );

    return rows;
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

async function getAllPostsPagination({ limit, offset }) {
  try {
    const { rows } = await pool.query(
      'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return rows;
  } catch (error) {
    console.log('Error database:', error);
    throw error;
  }
}

module.exports = {
  addNewPost,
  getAllPostsCount,
  getAllPosts,
  getAllPostsPagination,
};
