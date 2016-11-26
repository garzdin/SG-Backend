var mongoose = require('mongoose');
var Reading = require('./reading');

var boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /[a-zA-Z0-9]+$/
  },
  serialNumber: {
    type: Number,
    required: true,
    match: /[a-zA-Z0-9]+$/
  },
  readings: [Reading.schema],
  dateAdded: Date
});

module.exports = {
  schema: boardSchema,
  model: mongoose.model('Board', boardSchema)
}
