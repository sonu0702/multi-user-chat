import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});

const users = new Map<string, string>();
const messageHistory = new Map<string, any[]>();

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('register', (username) => {
    users.set(socket.id, username);
    io.emit('users', Array.from(users.values()));
    console.log(`${username} registered with socket id ${socket.id}`);
  });

  socket.on('private_message', ({ to, message }) => {
    const from = users.get(socket.id);
    let recipientSocketId: string | undefined;
    for (const [id, username] of users.entries()) {
      if (username === to) {
        recipientSocketId = id;
        break;
      }
    }

    if (recipientSocketId) {
      const conversationKey = [from, to].sort().join('-');
      if (!messageHistory.has(conversationKey)) {
        messageHistory.set(conversationKey, []);
      }
      const newMessage = { from, message, timestamp: new Date() };
      messageHistory.get(conversationKey)?.push(newMessage);

      io.to(recipientSocketId).emit('private_message', { from, message });
      console.log(`Message from ${from} to ${to}: ${message}`);
    } else {
      console.log(`User ${to} not found`);
    }
  });

  socket.on('get_history', (friendName) => {
    const self = users.get(socket.id);
    if (self) {
      const conversationKey = [self, friendName].sort().join('-');
      const history = messageHistory.get(conversationKey) || [];
      socket.emit('history', history);
    }
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      io.emit('users', Array.from(users.values()));
      console.log(`${username} disconnected`);
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
