import User from "../models/User.js";
export const updateUserProfile = async (req, res) => {
  const { name, email, phno, address, city, country } = req.body;
  try {
   const user = await User.findOne({email});
   
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name ;
    user.email = email ;
    user.phno = phno ;
    user.address = address ;
    user.city = city ;
    user.country = country ;
    
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Updates failed' });
  }
};