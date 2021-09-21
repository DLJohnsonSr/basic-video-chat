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

// Collection of online users
const users = new Map();

// websocket
io.on("connection", (socket) => {
  let user = { userId: socket.id, username: "User" + users.size };

  users.set(socket.id, user);

  let msg = { ...user, text: " has logged in." };

  io.emit("chat message", msg);

  socket.on("chat message", (msg) => {
    // if message has no username find userId in user Set
    if (msg.username === undefined) {
      msg.username = users.get(msg.userId).username;
    }
    io.emit("chat message", msg);
  });
});

// Set PORT
const PORT = 3000;

// Create server
server.listen(PORT, () => {
  console.log(`Listing on PORT: ${PORT}`);
});
