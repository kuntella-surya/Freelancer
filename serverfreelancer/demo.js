import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './config/Socket.js';
import routerMessage from './routes/MessageRoutes.js';

import { setSocketInstance } from './config/setSocketInstsnce.js';



dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP server
const httpServer = createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Setup Socket.IO logic
setupSocket(io);
// after creating the io instance
setSocketInstance(io);
// Store connected users
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("⚡ User connected");

  // Save user to connected users map
  socket.on("register", (userId) => {
    connectedUsers[userId] = socket.id;
    socket.join(userId); // Join private room
    console.log(`✅ User registered: ${userId}`);
  });

  socket.on("disconnect", () => {
    for (const [uid, sid] of Object.entries(connectedUsers)) {
      if (sid === socket.id) {
        delete connectedUsers[uid];
        break;
      }
    }
    console.log("❌ User disconnected");
  });
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Serve static files (e.g. profile pics, certificates)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);
app.use('/api/messages', routerMessage);

// Test route
app.get('/', (req, res) => res.send('✅ API Running'));

// Start the server
const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
