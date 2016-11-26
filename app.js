var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config.json');

app.use(bodyParser.json());

mongoose.connect(config.db_url);

var connection = mongoose.connection;

connection.on("error", function() {
  console.log("Error connection to MongoLab");
});

connection.on("open", function() {
  console.log("Successfully connected to MongoLab");
});

app.get('/', function(request, response) {
  return response.send({
    "message": "Welcome to the SmartGarden API"
  });
});

app.listen(process.env.PORT || 3000);
