import Resume from "../models/Resume.js";
import axios from "axios";

/* ================= GET RESUME ================= */
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPLOAD RESUME ================= */
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    await Resume.deleteMany();

    const newResume = new Resume({
      fileUrl: req.file.path,
    });

    await newResume.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DOWNLOAD RESUME ================= */
export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }

    const response = await axios({
      url: resume.fileUrl,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Anbumani_Resume.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");

    response.data.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Download failed",
    });
  }
};