import express from "express";
import {
  getExperiences,
  createExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", createExperience);
router.delete("/:id", deleteExperience);

export default router;