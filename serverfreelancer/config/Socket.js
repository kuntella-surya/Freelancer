export function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('🔌 User connected');

    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // No saving to DB here — you already do that via POST request
    socket.on('sendMessage', ({ roomId, message }) => {
      io.to(roomId).emit('receiveMessage', message); // only emit to room
    });

    socket.on('disconnect', () => {
      console.log('⚠️ User disconnected');
    });
  });
}
