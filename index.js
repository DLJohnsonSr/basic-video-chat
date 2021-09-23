const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);

const path = require("path");
const routes = require("./routes");

const { Server } = require("socket.io");
const io = new Server(server);

// const users = new Set();
const userService = require("./services/user");

// load static files
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// Set PORT
const PORT = 3000;

// Create server
server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

// Websocket
io.on("connect", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("add user", (user) => {
    user.userId = socket.id;
    userService.addUser(user);
    const users = userService.getUsersArr();
    io.emit("update user", users);
  });
  socket.on("disconnect", () => {
    userService.deleteUser(socket.id);
    const users = userService.getUsersArr();
    io.emit("update user", users);
  });
});
