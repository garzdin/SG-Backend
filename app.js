var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config.json');
var index = require('./controllers/index');
var authentication = require('./controllers/authentication');
var boards = require('./controllers/boards');

app.use(bodyParser.json());

mongoose.connect(config.db_url);

var connection = mongoose.connection;

connection.on("error", function() {
  console.log("Error connection to MongoLab");
});

connection.on("open", function() {
  console.log("Successfully connected to MongoLab");
});

app.get('/', index);
app.post('/register', authentication.register);
app.post('/login', authentication.login);
app.use(authentication.middleware);
app.post('/boards/create', boards.createBoard);
app.get('/boards', boards.listAllBoards);
app.get('/boards/:id', boards.listOneBoard);
app.put('/boards/:id', boards.updateBoard);
app.delete('/boards/:id', boards.deleteBoard);
app.post('/boards/:id/reading', boards.saveReading);

app.listen(process.env.PORT || 3000);
