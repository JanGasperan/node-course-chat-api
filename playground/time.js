// UNIX EPIC --  Jan 1 1970 00:00:00 am == time == 0.

var moment = require('moment');

var date = moment();
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));

var createdAt = 1234556;
var date = moment(createdAt);

console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));


var someTimestamp = moment().valueOf();
console.log(someTimestamp);
