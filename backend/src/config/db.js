const { Pool } = require("pg");

// ─────────────────────────────────────────────────────────────────────────────
// Database Connection Strategy:
//
// Production / Cloud (Render + Neon):
//   Uses DATABASE_URL with SSL (set in cloud environment variables)
//
// Local Development (Docker postgres):
//   Uses individual DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME
//   No SSL needed for local connections
//
// The Pool automatically manages connection lifecycle and reuse.
// ─────────────────────────────────────────────────────────────────────────────

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
      })
    : new Pool({
          host: process.env.DB_HOST || "localhost",
          port: Number(process.env.DB_PORT) || 5432,
          user: process.env.DB_USER || "postgres",
          password: process.env.DB_PASSWORD || "postgres",
          database: process.env.DB_NAME || "data_playground",
      });

module.exports = pool;