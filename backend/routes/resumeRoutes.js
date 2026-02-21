import express from "express";
import { getResume, uploadResume, downloadResume } from "../controllers/resumeController.js";
import resumeUpload from "../middleware/resumeUpload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getResume);
router.get("/download", downloadResume);   // 👈 ADD THIS
router.post("/", protect, resumeUpload.single("resume"), uploadResume);

export default router;