// Simple in-memory user store (replace with DB in production)
const users = {};

function addUser(username, ws) {
  users[username] = ws;
}

function removeUser(username) {
  delete users[username];
}

function getUserSocket(username) {
  return users[username];
}

function getAllUsers() {
  return Object.keys(users);
}

module.exports = {
  addUser,
  removeUser,
  getUserSocket,
  getAllUsers
};
