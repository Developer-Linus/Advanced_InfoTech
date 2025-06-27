import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category_controller.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth_middleware.js";

const router = express.Router();

// Public
router.get("/", getAllCategoriesController);
router.get("/:category_id", getCategoryByIdController);

// Admin only
router.post("/", authenticateUser, authorizeAdmin, createCategoryController);
router.put(
  "/:category_id",
  authenticateUser,
  authorizeAdmin,
  updateCategoryController
);
router.delete(
  "/:category_id",
  authenticateUser,
  authorizeAdmin,
  deleteCategoryController
);

export default router;
