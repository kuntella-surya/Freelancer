import User from "../models/User.js";
export const getUserProfile = async (req, res) => {
    try{
      const email = req.user.email;
       const Users = await User.findOne({email});
       res.json(Users);
  }catch(error){
      console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
};