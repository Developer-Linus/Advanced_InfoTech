// Responsible for 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user_routes.js";
import categoryRoutes from "./routes/category_routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);



app.use('/', async(req, res)=>{
    res.send('Welcome to Advanced InfoTech.');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler (catches thrown errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Internal server error." });
});

export default app;
