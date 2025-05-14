// Manages customers SQL queries

import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password_hash.js";

// Create a user
export const createUser = async (user) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    role = "customer",
  } = user;

  const sql = `INSERT INTO users (first_name, last_name, email, password_hash, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const [result] = await pool.execute(sql, [
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    role,
  ]);
  return result.insertId;
};

// Get user by email
export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

// Get user by id
export const getUserById = async (user_id) => {
  const sql = `SELECT first_name, last_name, email, phone_number, address FROM users WHERE user_id=?`;
  const [rows] = await pool.query(sql, [user_id]);
  return rows[0];
};

// Update user
export const updateUser = async (user_id, updates) => {
  const allowedFields = [
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "address",
  ];

  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      fields.push(`$key=?`);
      values.push(updates[key]);
    }
  }

  if (fields.length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`;

  // Add user_id to the values
  values.push(user_id);

  const [result] = await pool.execute(sql, values);
  return result.affectedRows;
};

// Update user password
export const updateUserPassword = async (user_id, oldPassword, newPassword) => {
  // Get current hashed password from DB
  const [rows] = await pool.query(
    `SELECT password_hash FROM users WHERE user_id = ?`,
    [user_id]
  );

  if(rows.length === 0){
    throw new Error('User not found.');
  }

  const currentHash = rows[0].password_hash;

  // Verify old password
  const isMatch = await comparePassword(oldPassword, currentHash);
  if(!isMatch){
    throw new Error('Old password is incorrect.');
  }

  // Hash new password using hash utility
  const newHash = await hashPassword(newPassword);

  // Update password in DB
  const [ result ] = await pool.execute(`UPDATE users SET password_hash = ? WHERE user_id = ?`, [newHash, user_id]);
  return result.affectedRows;
};

// Delete a user account
export const deleteUserAccount = async (user_id) => {
  const sql = `DELETE FROM users WHERE user_id=?`;
  const [result] = await pool.execute(sql, [user_id]);
  return result.affectedRows;
};

// Get all users (Admin feature)
export const getAllUsers = async () => {
  const sql = `SELECT user_id, first_name, last_name, email, phone_number, role, created_at FROM users`;
  const [rows] = await pool.query(sql);
  return rows;
};
