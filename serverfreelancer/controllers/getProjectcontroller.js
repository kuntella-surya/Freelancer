import Projectpost from "../models/Project.js";
export const getProject = async (req, res) => {
  try {
    const projects = await Projectpost.find({ clientId: req.user.id });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
