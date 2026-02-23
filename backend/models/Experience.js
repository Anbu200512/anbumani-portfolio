import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    type: {
      type: String,
      enum: ["Internship", "Freelance", "Full-time"],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);