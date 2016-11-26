var mongoose = require('mongoose');
var Board = require('./board');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    match: /[a-zA-Z]+$/
  },
  lastName: {
    type: String,
    match: /[a-zA-Z]+$/
  },
  email: {
    type: String,
    required: true,
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  password: {
    type: String,
    required: true
  },
  boards: [Board],
  dateRegistered: Date
});

module.exports = mongoose.model('User', userSchema);
