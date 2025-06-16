// models/Notification.js
import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  type: { type: String, default: "general" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
