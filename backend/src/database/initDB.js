require("dotenv").config();

const pool = require("../config/db");

async function initializeDatabase() {
  try {

    // Main Data Table
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

    console.log("uploaded_data table created successfully ✅");


    // Upload History Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS upload_history (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        total_rows INTEGER NOT NULL,
        uploaded_rows INTEGER NOT NULL,
        duplicate_rows INTEGER NOT NULL,
        failed_rows INTEGER NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("upload_history table created successfully ✅");

  } catch (error) {

    console.error("Database Initialization Error:", error);

  } finally {

    await pool.end();

  }
}

initializeDatabase();