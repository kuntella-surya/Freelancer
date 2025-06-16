
import Projectpost from "../models/Project.js";

export const findWork = async (req, res) => {
  try {
    const projects = await Projectpost.find({ clientId: { $ne: req.user.id } }).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
