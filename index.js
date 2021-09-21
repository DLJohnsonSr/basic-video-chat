const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);

// create websocket connection
const { Server } = require("socket.io");
const io = new Server(server);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// websocket
io.on("connection", (socket) => {
  io.emit("chat message", "User Connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// Set PORT
const PORT = 3000;

// Create server
server.listen(PORT, () => {
  console.log(`Listing on PORT: ${PORT}`);
});
