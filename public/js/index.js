var socket = io(); // init request

socket.on('connect', function () {
  socket.emit('getRooms', function(rooms) {
    if (rooms) {
      console.log(rooms);
    } else {
      console.log('No Rooms');
    }
  });
});
