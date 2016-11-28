var bcrypt = require('bcrypt');
var config = require('../config');

var encrypt = function(string, callback) {
  bcrypt.hash(string, config.salt_rounds, function(error, hash) {
    return callback(error, hash);
  });
};

var compare = function(string, hash, callback) {
   bcrypt.compare(string, hash, function(error, match) {
      if (error) return callback(error);
      return callback(null, match);
   });
};

module.exports = {
  encrypt: encrypt,
  compare: compare
}
