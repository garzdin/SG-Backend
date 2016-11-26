var jwt = require('jwt-simple');
var User = require('../models/user');
var config = require('../config');

var register = function(request, response) {
  if(!request.body.email || !request.body.password) {
    response.json({"message": "Provide an email and a password"});
  }
  var user = new User.model({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    dateRegistered: new Date()
  }).save(function(error, data) {
    return response.send({
      "message": error ? "There was a problem" : "User saved"
    });
  });
}

var login = function(request, response) {
  if(!request.body.email || !request.body.password) {
    response.json({"message": "Provide an email and a password"});
  }
  User.model.findOne({ email: request.body.email }, function(error, user) {
    if(!user) {
      response.json({"message": "User not found"});
    }
    if(error) {
      response.json({"message": error});
    }
    if(user.password === request.body.password) {
      var payload = {
        user: user._id
      }
      response.json({"token": jwt.encode(payload, config.jwt_secret)})
    }
  });
}

var middleware = function(request, response, next) {
  var token = request.body.token || request.get('Token') || request.query.token;
  if(token) {
    if(jwt.decode(token, config.jwt_secret)) {
      next()
    }
  }
  response.json({"message": "Invalid token"});
}

module.exports = {
  register: register,
  login: login,
  middleware: middleware
}
