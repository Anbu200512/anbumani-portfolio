import Skill from "../models/Skill.js";

// ➕ Create Skill (Admin)
export const createSkill = async (req, res) => {
  try {
    const { name, category } = req.body;

    const skill = new Skill({ name, category });
    await skill.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 📄 Get All Skills (Public)
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ❌ Delete Skill (Admin)
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    await Skill.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Skill deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};