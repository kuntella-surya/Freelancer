import Message from "../models/Message.js";
import User from "../models/User.js";
import FreelancerProfile from "../models/FreelancerProfile.js";

export const getChatuser = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId },
        { roomId: { $regex: currentUserId } }
      ]
    });

    const userIds = new Set();

    for (let msg of messages) {
      if (msg.senderId && msg.senderId !== currentUserId) {
        userIds.add(msg.senderId);
      }

      const [id1, id2] = msg.roomId.split('_');
      const otherUserId = id1 === currentUserId ? id2 : id1;
      if (otherUserId && otherUserId !== currentUserId) {
        userIds.add(otherUserId);
      }
    }

    // ✅ Filter only valid MongoDB ObjectIds
    const validUserIds = [...userIds].filter(id => id && id.length === 24);

    // ✅ Get freelancer profiles based on `userId` not `_id`
   
    const users = await FreelancerProfile.find({
      userId: { $in: validUserIds }
    }).select('userId name profilePicUrl');
     console.log(users)
    res.json({ users });

  } catch (err) {
    console.error('Error fetching chat users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
