"use strict";

const socket = io();
const username = window.location.href
  .split("/")
  .slice(-1)
  .pop()
  .match(/\w*/g)[0];
const user = { userId: "", username };

const chatForm = document.querySelector("#chat-form");
const chatMsg = document.querySelector("#chat-messages");
const chatUsers = document.querySelector("#chat-users");
const chatInput = document.querySelector("#chat-input");

/*************************************************/
// USER ONLINE
/*************************************************/
socket.emit("add user", user);

socket.on("update user", (users) => {
  chatUsers.querySelectorAll("li").forEach((li) => {
    li.remove();
  });
  users.forEach((name) => {
    let listItem = document.createElement("li");
    listItem.textContent = name;
    chatUsers.appendChild(listItem);
  });
});

/*************************************************/
// CHAT MESSAGES
/*************************************************/

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (chatInput.value) {
    socket.emit("chat message", {
      username,
      text: chatInput.value,
    });
    chatInput.value = "";
  }
});

socket.on("chat message", (msg) => {
  let listItem = document.createElement("li");
  listItem.textContent = `${msg.username}: ${msg.text}`;
  chatMsg.appendChild(listItem);
});

/*************************************************/
// VIDEO SIGNAL
/*************************************************/
