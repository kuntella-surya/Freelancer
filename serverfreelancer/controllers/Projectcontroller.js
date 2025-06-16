import User from "../models/User.js"; 
import Projectpost from "../models/Project.js";

export const postProject = async (req, res) => {
  try {
    const {
      title,
      description,
      skillsRequired,
      minBudget,
      maxBudget,
      duration,
      category,
      projectType,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired.split(',').map(skill => skill.trim());

    const projectcc = new Projectpost({
      clientId: req.user.id,
      uname: user.uname, // fetched from DB
      title,
      description,
      skillsRequired: skillsArray,
      budget: {
        min: minBudget,
        max: maxBudget,
      },
      duration,
      category,
      projectType,
    });

    await projectcc.save();
    res.status(201).json({ message: "Project posted successfully", projectcc });

  } catch (err) {
    console.error("Error posting project:", err);
    res.status(500).json({ message: "Server error while posting project" });
  }
};
