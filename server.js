const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {}; // username => ws

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'login':
        users[data.username] = ws;
        ws.username = data.username;
        break;

      case 'public_message':
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ from: ws.username, message: data.message, type: 'public' }));
          }
        });
        break;

      case 'private_message':
        const receiver = users[data.to];
        if (receiver) {
          receiver.send(JSON.stringify({ from: ws.username, message: data.message, type: 'private' }));
        }
        break;
    }
  });

  ws.on('close', () => {
    delete users[ws.username];
  });
});

app.use(express.static(path.join(__dirname, '../frontend')));

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
