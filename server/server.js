const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey, what is going on.',
  //   createdAt: 123
  // });
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail',newEmail);
  // })
  // socket.emit('newMessage', { //emits a message toa single connection
  //   from : 'andrew',
  //   text: 'u do good coding',
  //   createdAt: 123
  // });
  socket.on('createMessage',(message) => {
    console.log('CreateMessage',message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});
//new messasge    create message

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});






// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');
//
// const publicPath = path.join(__dirname,'../public');
//
// // console.log(__dirname+'/../public');
// // console.log(publicPath);
//
// var app = express();
// const port = process.env.PORT || 3000;
// var server = http.createServer(app);
// var io = socketIO(server);
//
// app.use(express.static(publicPath));
//
// io.on('connection',(socket) => {   //used to register an event
//   console.log('new user connected');
// });
// app.listen(port,() => {
//   console.log(`Server is up on port ${port}`);
// })
