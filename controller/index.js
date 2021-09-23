const path = require("path");

function getHomepage(req, res) {
  res.sendFile(path.resolve("public", "index.html"));
}

function postUsername(req, res) {
  const username = req.body.username;
  res.redirect(`/chatroom/username/${username}`);
}

function getChatroom(req, res) {
  res.sendFile(path.resolve("public", "chatroom.html"));
}

module.exports = {
  getHomepage,
  postUsername,
  getChatroom,
};
