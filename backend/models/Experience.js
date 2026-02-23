import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: String,
    type: String, // Internship / Freelance / Full-Time
    startDate: String,
    endDate: String,
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);