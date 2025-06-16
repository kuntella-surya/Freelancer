import express from 'express';
import Message from '../models/Message.js';
import { protect } from "../middleware/auth.js";
const routerMessage = express.Router();


routerMessage.get('/:roomId',protect, async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 }); // oldest first
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

routerMessage.post('/', protect,async (req, res) => {
  try {
    const { roomId, senderId, receiverId,senderName, content } = req.body;
    console.log(senderName);
    const newMessage = new Message({ roomId, senderId,receiverId, senderName, content });
    await newMessage.save();
  
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

export default routerMessage;
