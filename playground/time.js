//jan 1 1970 unix epic
var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth()); //month is returned from 0-11


// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'))

// console.log(date.hours()+':'+date.minutes());
// console.log(date.format('h:m a'));

// new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))
