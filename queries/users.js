const db = require("../db/dbConfig");

/**
 * Finds a user by their username.
 */
const findUserByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const user = await db.oneOrNone(query, [username]);
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

/**
 * Creates a new user in the database.
 */
const createUser = async ({ username, passwordHash, email }) => {
  try {
    const query = `
      INSERT INTO users (username, password_hash, email, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, username, email, created_at; 
    `;
    const newUser = await db.one(query, [username, passwordHash, email]);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = {
  findUserByUsername,
  createUser,
};
