var User = require('../models/user');
var passwordUtils = require('../utils/crypto');

var index = function(request, response) {
  User.model.find({ _id: request.user }, function(error, user) {
    if (error) response.json({"message": error});
    return response.json({"user": user});
  });
}

var update = function(request, response) {
  if (!request.body.password) {
    return response.json({"message": "Please provide a password, atleast"})
  }
  User.model.findByIdAndUpdate(request.user, {$set: {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: passwordUtils.encrypt(request.body.password),

  }}, {runValidators: true} function(error, user) {
    if (error) return response.json({"message": error});
    return response.json({"message": "User updated"});
  });
}

module.exports = {
  index: index,
  update: update
}
