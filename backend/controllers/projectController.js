import Project from "../models/Project.js";

// ➕ Create Project
export const createProject = async (req, res) => {
  try {
const { title, description, techStack, github, live, featured, category } = req.body;
    // Convert techStack string to array
    const techArray = techStack.split(",").map((tech) => tech.trim());

    const newProject = new Project({
      title,
      description,
      techStack: techArray,
      github,
      live,
      image: req.file?.path, // Cloudinary URL
      category: category || "personal",
      featured: featured === "true",
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 📄 Get All Projects
export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const category = req.query.category;

    const skip = (page - 1) * limit;

    const filter = category ? { category } : {};

    const total = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ⭐ Get Featured Projects
export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ❌ Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ✏ Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, github, live, featured, category } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack
      ? techStack.split(",").map((t) => t.trim())
      : project.techStack;
    project.github = github || project.github;
    project.live = live || project.live;
    project.category = category || project.category;
    project.featured =
      featured !== undefined ? featured === "true" : project.featured;

    if (req.file) {
      project.image = req.file.path;
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};