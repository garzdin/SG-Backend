var jwt = require('jwt-simple')
var User = require('../models/user')
var config = require('../config')
var crypto = require('../utils/crypto')

var register = function(request, response) {
  if (!request.body.email || !request.body.password) {
    return response.json({"message": "Provide an email and a password"})
  }
  crypto.encrypt(request.body.password, function(error, hash) {
    if (error) return response.json({"message": error})
    var user = new User.model({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hash,
      dateRegistered: new Date()
    }).save(function(error, data) {
      if (error) return response.json({"message": error})
      return response.json({"message": "User saved"})
    })
  })
}

var login = function(request, response) {
  if (!request.body.email || !request.body.password) {
    return response.json({"message": "Provide an email and a password"})
  }
  User.model.findOne({ email: request.body.email }, function(error, user) {
    if (!user) return response.json({"message": "User not found"})
    if (error) return response.json({"message": error})
    crypto.compare(request.body.password, user.password, function(error, match) {
      if (error) return response.json({"message": error})
      if (match) {
        return response.json({"token": jwt.encode({user: user._id}, config.jwt_secret)})
      } else {
        return response.json({"message": "Wrong password"})
      }
    })
  })
}

var middleware = function(request, response, next) {
  var token = request.body.token || request.get('Token') || request.query.token
  if (token) {
    if (jwt.decode(token, config.jwt_secret)) {
      request.user = jwt.decode(token, config.jwt_secret).user
      next()
    }
  } else {
    return response.json({"message": "Invalid token"})
  }
}

module.exports = {
  register: register,
  login: login,
  middleware: middleware
}
