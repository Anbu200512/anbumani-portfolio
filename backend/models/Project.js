import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
    },
    github: {
      type: String,
    },
    live: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
  type: String,
  enum: ["personal", "freelance"],
  default: "personal",
},
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;