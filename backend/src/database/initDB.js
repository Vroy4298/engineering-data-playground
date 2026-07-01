
require("dotenv").config();

const pool = require("../config/db");

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploaded_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INTEGER,
        city VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Table created successfully ✅");
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();