import express from "express";
import {
  createProject,
  getProjects,
  getFeaturedProjects,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);

// Protected Routes
router.post("/", protect, upload.single("image"), createProject);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, upload.single("image"), updateProject);

export default router;