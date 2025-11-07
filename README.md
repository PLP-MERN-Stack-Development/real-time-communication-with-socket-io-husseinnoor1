# Server


cd server
npm install
npm run dev


Endpoints:
- POST /api/login { username }
- GET /api/messages?room=global&before=<timestamp>&limit=20


Socket events (client -> server):
- 'auth' with token
- 'join_room' room
- 'leave_room' room
- 'typing' { room, typing }
- 'message' { room, to?, text?, file? } (ack optional)
- 'message_read' { messageId }


Socket events (server -> client): 'online', 'notification', 'typing', 'message', 'private_message', 'message_read'
