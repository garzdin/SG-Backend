var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
  humidity: {
    type: Number,
    match: /[.0-9]+$/
  },
  temperature: {
    type: Number,
    match: /[.0-9]+$/
  },
  light: {
    type: Number,
    match: /[.0-9]+$/
  },
  dateRead: Date
});

module.exports = mongoose.model('Reading', readingSchema);
