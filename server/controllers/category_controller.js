import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../models/categories_model.js";

// Create category controller
export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required." });
    }
    const insertId = await createCategory(name, description);
    res
      .status(201)
      .json({ message: "Category created.", category_id: insertId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error creating category.", error: err.message });
  }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error retrieving categories.",
      error: err.message,
    });
  }
};

// Get category by Id
export const getCategoryByIdController = async (req, res) => {
  try {
    const { category_id } = req.params;

    const category = await getCategoryById(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json({message: "Category retrieved successfully.", category});
  } catch (err) {
    res.status(500).json({ message: "Server error retrieving category." });
  }
};

// Update a category
export const updateCategoryController = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { name, description } = req.body;

    const affectedRows = await updateCategory(category_id, name, description);
    if (!affectedRows) {
      return res
        .status(404)
        .json({ message: "Category not found or not updated." });
    }
    res.status(200).json({ message: "Category updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error updating category.", error: err.message });
  }
};

// Delete a category
export const deleteCategoryController = async (req, res) => {
  try {
    const { category_id } = req.params;
    const affectedRows = await deleteCategory(category_id);
    if (!affectedRows) {
      return res
        .status(404)
        .json({ message: "Category not found or already deleted." });
    }
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error deleting category.", error: err.message });
  }
};
