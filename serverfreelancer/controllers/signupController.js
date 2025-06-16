import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signupUser = async (req, res) => {
  const { name, uname,email, phno, password, role, country, city, address } = req.body;

  if (!name || !email || !phno || !password || !role || !country || !city || !address || !uname) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
   const existingUser = await User.findOne({
       $or: [{ email }, { uname }],
      });

  if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }


    const user = new User({ name, uname,email, phno, password, role, country, city, address });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
