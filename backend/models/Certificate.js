import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    category: { type: String },
    issueDate: { type: String },
    credentialLink: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);