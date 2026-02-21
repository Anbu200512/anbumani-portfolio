import express from "express";
import {
  createSkill,
  getSkills,
  deleteSkill,
} from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getSkills);

// Admin Protected
router.post("/", protect, createSkill);
router.delete("/:id", protect, deleteSkill);

export default router;