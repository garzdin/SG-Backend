var bcrypt = require('bcrypt');
var config = require('../config');

var encrypt = function(password, callback) {
  bcrypt.hash(password, config.salt_rounds, function(error, hash) {
    return callback(error, hash);
  });
};

var compare = function(password, hash, callback) {
   bcrypt.compare(password, hash, function(error, match) {
      if (error) return callback(error);
      return callback(null, match);
   });
};

module.exports = {
  encrypt: encrypt,
  compare: compare
}
