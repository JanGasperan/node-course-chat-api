const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    var room = params.room.toLowerCase();
    if (!isRealString(params.name) || !isRealString(room)) {
      return callback('Name and room name are required');
    }

    var usersInRoom = users.getUserList(room);
    if(usersInRoom && usersInRoom.indexOf(params.name) != -1 ){
      return callback(`Can not join room with name "${params.name}". User with same name already in room`);
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, room);

    // socket.leave(room);

    // io.emit -> io.to(room).emit
    // socket.broadcast.emit -> socket.broadcast.to(room).emit
    // socket.emit

    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (m, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(m.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, m.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

  socket.on('getRooms', (callback) => {
    callback(socket.rooms);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
