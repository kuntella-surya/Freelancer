import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  uname:{type:String,unique:true},
  email: { type: String, unique: true },
  phno: String,
  password: String,
  role: String,
  country: String,
  city: String,
  address: String,
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
