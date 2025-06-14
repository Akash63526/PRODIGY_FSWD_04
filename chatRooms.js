const chatRooms = {}; // roomName -> Set of usernames

function createRoom(roomName) {
  if (!chatRooms[roomName]) {
    chatRooms[roomName] = new Set();
  }
}

function joinRoom(roomName, username) {
  createRoom(roomName);
  chatRooms[roomName].add(username);
}

function leaveRoom(roomName, username) {
  if (chatRooms[roomName]) {
    chatRooms[roomName].delete(username);
    if (chatRooms[roomName].size === 0) {
      delete chatRooms[roomName];
    }
  }
}

function getRoomUsers(roomName) {
  return chatRooms[roomName] ? Array.from(chatRooms[roomName]) : [];
}

function getAllRooms() {
  return Object.keys(chatRooms);
}

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoomUsers,
  getAllRooms
};
