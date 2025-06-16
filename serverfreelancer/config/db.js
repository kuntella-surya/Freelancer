import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: './config.env' });
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
