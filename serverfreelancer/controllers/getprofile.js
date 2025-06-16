import FreelanceProfile from "../models/FreelancerProfile.js";
export const getFreelanceProfile = async (req, res) => {
  try {
    const profile = await FreelanceProfile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
