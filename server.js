const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Change this to your frontend URL in production
        methods: ["GET", "POST"]
    }
});

const PORT = 9535; // ✅ Fixed PORT issue

// Enable CORS for all routes
app.use(cors());

// Serve static files (Ensure your frontend files are in a 'public' folder)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server & bind to all IPs
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
