var Board = require('../models/board');
var Reading = require('../models/reading');

var createBoard = function(request, response) {
  if(!request.body.name || !request.body.serial) {
    return response.json({"message": "Provide a name and a serial number"});
  }
  var board = new Board.model({
    name: request.body.name,
    serialNumber: request.body.serial,
    owner: request.user,
    dateAdded: new Date()
  }).save(function(error, board) {
    if (error) response.json({"message": error});
    return response.json({"message": "Board saved"});
  });
}

var listAllBoards = function(request, response) {
  Board.model.find({ owner: request.user }, function(error, boards) {
    if (error) response.json({"message": error});
    return response.json({"boards": boards});
  });
}

var listOneBoard = function(request, response) {
  Board.model.findOne({ _id: request.params.id, owner: request.user }, function(error, board) {
    if (error) response.json({"message": error});
    return response.json({"board": board});
  });
}

var updateBoard = function(request, response) {
  Board.model.findByIdAndUpdate(request.params.id, {
    name: request.body.name,
    serialNumber: request.body.serial
  }, function(error, board) {
    if (error) response.json({"message": error});
    return response.json({"message": "Board updated successfully"});
  });
}

var deleteBoard = function(request, response) {
  Board.model.findByIdAndRemove(request.params.id, function(error, board) {
    if (error) response.json({"message": error});
    return response.json({"message": "Board delete successfully"});
  });
}

var saveReading = function(request, response) {
  if (!request.body.humidity || !request.body.temperature || !request.body.light) {
    return response.json({"message": "Provide a humidity, temperature and light indexes"});
  }
  Board.model.findOne({ _id: request.params.id, owner: request.user }, function(error, board) {
    if (error) response.json({"message": error});
    board.readings.push({
      humidity: request.body.humidity,
      temperature: request.body.temperature,
      light: request.body.light,
      dateRead: new Date()
    });
    board.save(function(error) {
      if (error) response.json({"message": error});
      return response.json({"message": "Reading saved successfully"});
    });
  });
}

module.exports = {
  createBoard: createBoard,
  listAllBoards: listAllBoards,
  listOneBoard: listOneBoard,
  updateBoard: updateBoard,
  deleteBoard: deleteBoard,
  saveReading: saveReading
}
