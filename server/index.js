const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const { Server } = require('socket.io');
const io = new Server({
  cors: {
    origin: 'http://localhost:8080',
  },
});

const port = process.env.PORT || 3002;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(__dirname, '../src/index.html');

const jsonName = './server/db.json';
app.use(cors());
app.use(express.json());

app.use(express.static(DIST_DIR));

io.listen(4000);

let chatRoom = ''; // E.g. javascript, node,...
let allUsers = [];

function leaveRoom(userID, chatRoomUsers) {
  return chatRoomUsers.filter((user) => user.id != userID);
}

io.on('connection', (socket) => {
  socket.on('get_rooms', () => {
    fs.readFile(jsonName, (error, data) => {
      if (error) {
        throw new Error();
      }
      const parsedData = JSON.parse(data);
      socket.emit('rooms', parsedData.rooms);
    });
  });
  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    const __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      __createdtime__,
      isLogged: true,
      id: socket.id,
    });

    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username,
      isLogged: true,
      id: socket.id,
      __createdtime__,
    });

    chatRoom = room;
    // check if user existed
    if (!allUsers.some((user) => user.username === username)) {
      allUsers.push({ id: socket.id, username, room });
    }
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    console.log(chatRoomUsers, socket.id);
    io.in(room).emit('chatroom_users', chatRoomUsers);
  });

  socket.on('addMessage', (dataSocket) => {
    io.in(chatRoom).emit('receive_message', {
      ...dataSocket,
      isLogged: false,
      id: socket.id,
    });
  });

  socket.on('user_typing', (dataSocket) => {
    const { isTyping } = dataSocket;

    socket.to(chatRoom).emit('status_user_typing', {
      isTyping,
      user: allUsers.find((i) => i.id === socket.id),
    });
  });

  socket.on('getAllMessage', () => {
    fs.readFile(jsonName, (error, data) => {
      if (error) {
        throw new Error();
      }
      const parsedData = JSON.parse(data);

      socket.emit('messages', parsedData.messages);
    });
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username,
      message: `${username} has left the chat`,
      __createdtime__,
      isLogged: true,
      id: socket.id,
    });
  });

  socket.on('disconnect', () => {
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
        isLogged: true,
        id: socket.id,
      });
    }
  });
});

// app.get('/api/message', (req, res) => {
//   fs.readFile(jsonName, (error, data) => {
//     if (error) {
//       throw new Error();
//     }
//     const parsedData = JSON.parse(data);
//     res.send(parsedData.messages);
//   });
// });

// app.post('/api/message', (req, res) => {
//   fs.readFile(jsonName, (error, data) => {
//     if (error) {
//       throw new Error();
//     }
//     const parsedData = JSON.parse(data);
//     parsedData.messages.push(req.body);
//     fs.writeFile(jsonName, JSON.stringify(parsedData, null, 2), (err) => {
//       if (err) {
//         throw new Error();
//       }
//       res.send(parsedData);
//     });
//   });
// });

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});
