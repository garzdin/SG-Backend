var mongoose = require('mongoose');
var Reading = require('./reading');

var boardSchema = mongoose.Schema({
  serialNumber: {
    type: Number,
    required: True,
    match: /[a-zA-Z0-9]+$/
  },
  readings: [Reading],
  dateAdded: Date
});

module.exports = mongoose.model('Board', boardSchema);
