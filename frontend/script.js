const username = localStorage.getItem('username');
document.getElementById('user').innerText = username;

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'login', username }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const box = document.getElementById('chatBox');
  const msg = `[${data.type === 'private' ? 'Private' : 'Public'}] ${data.from}: ${data.message}`;
  box.innerHTML += `<p>${msg}</p>`;
};

function sendMessage() {
  const msg = document.getElementById('message').value;
  const to = document.getElementById('to').value;

  const type = to ? 'private_message' : 'public_message';
  ws.send(JSON.stringify({ type, message: msg, to }));
  document.getElementById('message').value = '';
}
