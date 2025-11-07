const express = require('express');


socket.on('typing', ({ room, typing }) => {
socket.to(room).emit('typing', { user: users.get(socket.id)?.username, typing });
});


socket.on('message', (data, ack) => {
// data: { room, to, text, fileBase64 }
const fromUser = users.get(socket.id);
if (!fromUser) return socket.emit('auth_error');


const msg = {
id: messageCounter++,
room: data.room || 'global',
from: { userId: fromUser.userId, username: fromUser.username },
to: data.to || null,
text: data.text || null,
file: data.file || null,
ts: Date.now(),
read: false
};
messages.push(msg);


// Emit to room (or to single recipient)
if (data.to) {
// private: find recipient socket
const sockId = userIndex.get(data.to.userId);
if (sockId) {
io.to(sockId).emit('private_message', msg);
}
socket.emit('private_message', msg);
} else {
io.to(msg.room).emit('message', msg);
}


// ack to sender with message id, ts
if (ack) ack({ status: 'ok', id: msg.id, ts: msg.ts });
});


socket.on('message_read', ({ messageId }) => {
const m = messages.find(x => x.id === messageId);
if (m) {
m.read = true;
// notify sender
const senderSock = userIndex.get(m.from.userId);
if (senderSock) io.to(senderSock).emit('message_read', { messageId });
}
});


socket.on('disconnect', () => {
const u = users.get(socket.id);
if (u) {
users.delete(socket.id);
userIndex.delete(u.userId);
io.emit('online', Array.from(users.values()).map(u=>({ userId: u.userId, username: u.username })));
socket.broadcast.emit('notification', { type: 'leave', user: u.username });
}
console.log('socket disconnected', socket.id);
});
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Server listening on', PORT));