require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const auth_route = require("./router/auth-router/auth-router");
const block_route = require("./router/blockRouter/index");
const dorm_route = require("./router/dormRouter/index");
const student_Route = require('./router/student/studentRoute');
const user_Route = require('./router/user/user_Router');
const maintenance_Route = require('./router/maintenanceRouter/index');
const recentuser_Route = require('./router/recentlySearchedUser/recentuser-router');
const passwordReset_Route = require('./router/passwordReset/passwordResetRoutes');
const feedBack_Route = require('./router/FeedBack-route/feedBack-rout');
const attendance_Route = require('./router/attendance-router/attendance-route');
const controle_Route = require('./router/controleRoute/control-Route');
const chatRoutes = require('./routes/chatRouter/chatRoutes')
const chat_Routes = require('./routes/chatRouter/chatRoutes')
const backup_Route = require('./router/backup/backupRouter');
const { scheduleAutomatedBackups } = require('./controller/backup/backupController');
const http = require('http');
const socketIo = require('socket.io');

 
//mongodb://localhost:27017/DMS   zulkifazher2   1234qwer  ,AOgfdirkqlryg9bB
//admin123
//

mongoose
  .connect(process.env.MONGO_URL, 
    {serverSelectionTimeoutMS: 30000}
  )
  .then(() => {
    console.log(`Connected to database: DMS`);
    // Start automated backup schedule after DB connection
    scheduleAutomatedBackups();
  })
  .catch((err) => {
    console.log(err);
});

const app = express();

app.use(cookieParser());
app.use(express.json());

 
 app.use('/uploads', (req, res, next) => {
  const allowedOrigins =process.env.Client_URL; // Corrected array
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

 
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Your existing CORS configuration, corrected to accept an array of origins
app.use(cors({
  origin:process.env.Client_URL, // Corrected to an array
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  exposedHeaders: ['set-cookie'],
}));

// ... rest of your application code

// ... rest of your application code, including your routes and app.listen()
const PORT = process.env.PORT || 9000;

// Routes
app.use("/api/auth/", auth_route);
app.use("/api/block/", block_route);
app.use("/api/dorm/", dorm_route);
app.use('/api/student/', student_Route);
app.use('/api/user', user_Route);
app.use('/api/maintainanceIssue/', maintenance_Route);
app.use('/api/recentuser', recentuser_Route);
app.use('/api/user', passwordReset_Route);
app.use('/api/feedBack', feedBack_Route); 
app.use('/api/attendance', attendance_Route);
app.use('/api/control', controle_Route);
app.use('/api/Groupchat', chatRoutes);
app.use('/api/chat', chat_Routes);
app.use('/api/backup', backup_Route);

// Create HTTP server
const server = http.createServer(app);

 
const io = socketIo(server, {
  cors: {
    origin:process.env.Client_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling']
});

// Track online users and their rooms
const onlineUsers = new Map();
const userRooms = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
 // console.log('New client connected:', socket.id);
   
  // Add user to online users when they connect with their userId
  const userId = socket.handshake.auth?.userId;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    // console.log('User connected:', userId);
    // console.log('Online users:', Array.from(onlineUsers.entries()));
  }

  // Handle joining chat rooms
  socket.on('join', ({ userId, receiverId }) => {
    if (!userId || !receiverId) {
      socket.emit('error', { message: 'Invalid user IDs for room joining' });
      return;
    }
    
    // Create a unique room ID by sorting and joining user IDs
    const roomId = [userId, receiverId].sort().join('-');
    
    // Leave previous rooms
    if (userRooms.has(socket.id)) {
      const previousRooms = userRooms.get(socket.id);
      previousRooms.forEach(room => socket.leave(room));
    }
    
    // Join new room
    socket.join(roomId);
    
    // Store room for this socket
    if (!userRooms.has(socket.id)) {
      userRooms.set(socket.id, new Set());
    }
    userRooms.get(socket.id).add(roomId);
    
    //console.log(`User ${userId} joined room ${roomId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', (messageData) => {
    const { senderId, receiverId, message, roomId } = messageData;
    if (!senderId || !receiverId || !message || !roomId) {
      socket.emit('error', { message: 'Invalid message data' });
      return;
    }
    
    const chatRoomId = [senderId, receiverId].sort().join('-');
    //console.log(`Sending message to room ${chatRoomId}:`, messageData);
    
    // Emit to the specific room
    io.to(chatRoomId).emit('message', messageData);
  });

  // Handle errors
  socket.on('error', (error) => {
    //console.error('Socket error:', error);
    socket.emit('error', { message: 'Internal socket error' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit('onlineUsers', Array.from(onlineUsers.keys()));
      
      // Clean up rooms
      if (userRooms.has(socket.id)) {
        userRooms.delete(socket.id);
      }
      
      // console.log('User disconnected:', userId);
      // console.log('Remaining online users:', Array.from(onlineUsers.entries()));
    }
  });
});

// Change this to use the HTTP server instead of the Express app
server.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
});

// Update server export
module.exports = { app, server };
