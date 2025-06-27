// Handle business logic and request/response cycle

import {
  createUser,
  createAdmin,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserPassword,
  deleteUserAccount,
  getAllUsers,
} from "../models/user_model.js";

import { hashPassword, comparePassword } from "../utils/password_hash.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Register a user controller
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, address } =
      req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashed = await hashPassword(password);

    const newUserId = await createUser({
      first_name,
      last_name,
      email,
      password: hashed,
      phone_number,
      address,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user_id: newUserId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user.", error: err.message });
  }
};

// Create an admin (Only registered admins are allowed)
export const registerAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, address } =
      req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Admin with this email address already exists." });
    }

    const hashed = await hashPassword(password);

    const adminId = await createAdmin({
      first_name,
      last_name,
      email,
      password: hashed,
      phone_number,
      address,
    });

    res
      .status(201)
      .json({ message: "Admin created successfully.", admin_id: adminId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error creating an admin.", error: err.message });
  }
};

// Login a user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    // Check if the user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // Check if the password provided is correct
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // Generate jwt token for valid credentials
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
};

// Get user by Id
export const getUserByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await getUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user.", error: err.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updates = req.body;

    const updated = await updateUser(user_id, updates);

    if (updated === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided or user not found." });
    }

    res.status(200).json({ message: "User profile updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user.", error: err.message });
  }
};

// Update password
export const updateUserPasswordController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required." });
    }

    const success = await updateUserPassword(user_id, oldPassword, newPassword);

    if (!success) {
      return res.status(400).json({ message: "Password update failed." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating password.", error: err.message });
  }
};

// Delete user
export const deleteUserAccountController = async (req, res) => {
  try {
    const { user_id } = req.params;

    const deleted = await deleteUserAccount(user_id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted." });
    }

    res.status(200).json({ message: "User account deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user.", error: err.message });
  }
};

// Admin: Get all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users.", error: err.message });
  }
};
