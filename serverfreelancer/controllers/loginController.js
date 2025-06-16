import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password} = req.body;
  if (!email || !password ) {
    return res.status(400).json({ message: 'All fiels required' });
  }

  try {
    const Users = await User.findOne({ email });
    if (!Users)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password,Users.password);
    if(!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: Users._id, email: Users.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};