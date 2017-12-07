var socket = io();

socket.on('connect', function () {
  console.log('connected to the server');

  // socket.emit('createEmail', {
  //   to: 'goapal@gmail.com',
  //   text: 'Hey,this is andrew'
  // });
  socket.emit('createMessage',{
    to: 'Mead',
    text: 'Had a good da?'
  });
});

socket.on('diconnect',function ()  {
  console.log('disconnected from the server');
});

// socket.on('newEmail',function (email) {
//   console.log('New email',email);

socket.on('newMessage',function (message) {
  console.log('newMessage', message);
})
