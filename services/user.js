const users = new Map();

function getUsersArr() {
  return Array.from(users.values());
}
function getUser(userId) {
  return users.get(userId);
}
function addUser(user) {
  users.set(user.userId, user.username);
}

function deleteUser(userId) {
  users.delete(userId);
}

module.exports = {
  getUsersArr,
  addUser,
  deleteUser,
};
