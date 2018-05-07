var socket = io(); // init request

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'jem',
    text: 'Hey this is a message from client'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('Got the message', message);
});
