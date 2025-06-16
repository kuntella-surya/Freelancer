
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: String,
  senderId: String,
  receiverId: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  readBy: { type: [String], default: [] }, // ✅ always an array
});

export default mongoose.model('Message', messageSchema);
