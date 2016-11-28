var User = require('../models/user')
var crypto = require('../utils/crypto')

var index = function(request, response) {
  User.model.find({ _id: request.user }, function(error, user) {
    if (error) response.json({"message": error})
    return response.json({"user": user})
  })
}

var update = function(request, response) {
  User.model.findOne({_id: request.user}, function(error, user) {
    if (error) return response.json({"message": error})
    if (request.body.password) {
      user.password = crypto.encrypt(request.body.password)
    }
    if (request.body.firstName) {
      user.firstName = request.body.firstName
    }
    if (request.body.lastName) {
      user.lastName = request.body.lastName
    }
    user.save(function(error, data) {
      if (error) return response.json({"message": error})
      return response.json({"message": "User updated"})
    })
  })
}

module.exports = {
  index: index,
  update: update
}
