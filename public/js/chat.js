var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});


// var socket = io();
//
// function scrollToButtom () {
//   var messages = jquery('#messages');
//   var newMessage = messages.children('li:last-child');
//   var clientHeight = message.prop('clientHeight');
//   var scrollTop = messages.prop('scrollTop');
//   var scrollHeight = message.prop('scrollHeight');
//   var newMessageHeight = newMessage.innerHeight();
//   var lastMessageHeight = newMessage.prev().innerHeight();
//
//   if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
//     messages.scrollTop(ScrollHeight);
//   }
// }
//
// socket.on('connect', function () {
//   console.log('connected to the server');
//
//   // socket.emit('createEmail', {
//   //   to: 'goapal@gmail.com',
//   //   text: 'Hey,this is andrew'
//   // });
//   // socket.emit('createMessage',{
//   //   to: 'Mead',
//   //   text: 'Had a good da?'
//   // });
// });
//
// socket.on('diconnect',function ()  {
//   console.log('disconnected from the server');
// });
//
// // socket.on('newEmail',function (email) {
// //   console.log('New email',email);
//
// socket.on('newMessage',function (message) {
//   var formattedTime = moment(message.createdAt).format('h:m a');
//   var template = jQuery('#message-template').html();
//   var html = Mustache.render(template, {
//     text: message.text,
//     from: message.from,
//     createdAt: formattedTime
//   });
//
//   jQuery('#messages').append(html);
//   scrollToBottom();
//   // var formattedTime = moment(message.createdAt).format('h:m a');
//   // var li = jQuery('<li></li>');
//   // li.text(`${message.from} ${formattedTime} :${message.text}`);
//   //
//   // jQuery('#messages').append(li);
// });
//
// socket.on('newLocationMessage', function (message) {
//   var formattedTime = moment(message.createdAt).format('h:m a');
//   var template = jQuery('#location-message-template').html();
//   var html = Mustache.render(template, {
//     from: message.from,
//     createdAt:formattedTime,
//     url: message.url
//   });
//   jQuery('#messages').append(html);
//   scrollToBottom();
//   // var li = jQuery('<li></li>');
//   // var a = jQuery('<a target="_blank">My current location</a>');
//   // var formattedTime = moment(message.createdAt).format('h:m a');
//   //
//   // li.text(`${message.from} ${formattedTime} :`);
//   // a.attr('href',message.url);
//   // li.append(a);
//   // jQuery('#messages').append(li);
// });
//
// jQuery('#message-form').on('submit',function(e) {
//   e.preventDefault();
//
//   var messageTextBox = jQuery('[name=message]');
//
//   socket.emit('createMessage',{
//     from: 'User',
//     text: messageTextBox.val()
//   }, function () {
//       messageTextBox.val('')
//   });
// });
//
// var locationButton = jQuery('#send-location');
// locationButton.on('click',function() {
//   if(!navigator.geolocation){
//     return alert('Geolocation access denied as not supported by your browser');
//   }
//
//   locationButton.attr('diabled','disabled').text('sending location...');
//
//   navigator.geolocation.getCurrentPosition(function (position) {
//     locationButton.removeAttr('disabled').text('send location');
//     socket.emit('createLocationMessage', {
//   latitude: position.coords.latitude,
//   longitude: position.coords.longitude
// });
//   }, function () {
//         alert('Unable to fetch location');
//   });
// });
