import pool from "../config/db.js";

// Create a new category
export const createCategory = async (name, description) => {
  const query = `INSERT INTO categories (name, description) VALUES (?, ?)`;
  const [result] = await pool.execute(query, [name, description]);
  return result.insertId;
};

// Get all categories
export const getAllCategories = async () => {
  const query = `SELECT * FROM categories`;
  const [rows] = await pool.query(query);
  return rows;
};

// Get category by Id
export const getCategoryById = async (category_id) => {
  const query = `SELECT * FROM categories WHERE category_id=?`;
  const [rows] = await pool.query(query, [category_id]);
  return rows[0];
};

// Update a category
export const updateCategory = async (category_id, name, description) => {
  const query = `UPDATE categories SET name=?, description=? WHERE category_id=?`;
  const [result] = await pool.execute(query, [name, description, category_id]);
  return result.affectedRows;
};

// Delete a category
export const deleteCategory = async (category_id) => {
  const query = `DELETE FROM categories WHERE category_id=?`;
  const [result] = await pool.execute(query, [category_id]);
  return result.affectedRows;
};
