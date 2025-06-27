import express from "express";
import {
  registerUser,
  registerAdmin,
  loginUser,
  getUserByIdController,
  updateUserProfile,
  updateUserPasswordController,
  deleteUserAccountController,
  getAllUsersController,
} from "../controllers/user_controller.js";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth_middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);   // Register new user
router.post("/login", loginUser);         // Login user and receive JWT

// Protected Routes
router.get("/:user_id", authenticateUser, getUserByIdController); // View own profile
router.put("/:user_id", authenticateUser, updateUserProfile);     // Update own profile
router.put("/:user_id/password", authenticateUser, updateUserPasswordController); // Change password
router.delete("/:user_id", authenticateUser, deleteUserAccountController);        // Delete own account

// Admin-only route to create other admins
router.post("/register-admin",authenticateUser, authorizeAdmin, registerAdmin);

// Admin-only Routes
router.get("/", authenticateUser, authorizeAdmin, getAllUsersController); // Admin: List all users

export default router;
