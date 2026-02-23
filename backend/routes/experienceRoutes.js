import express from "express";
import {
  getExperiences,
  createExperience,
  deleteExperience,
    updateExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", createExperience);
router.delete("/:id", deleteExperience);
router.put("/:id", updateExperience);

export default router;