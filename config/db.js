// Responsible for creating and exporting MySQL pool connection
const mysql = require("mysql2/promise");

import dotenv from "dotenv";
dotenv.config();

// Create a MySQL connection pool for efficient query management
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
