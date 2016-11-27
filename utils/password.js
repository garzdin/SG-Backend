var bcrypt = require('bcrypt-nodejs');

var encrypt = function(password, callback) {
   bcrypt.genSalt(10, function(error, salt) {
    if (error) return callback(error);

    bcrypt.hash(password, salt, function(error, hash) {
      return callback(error, hash);
    });

  });
};

var compare = function(password, rawPassword, callback) {
   bcrypt.compare(password, rawPassword, function(error, match) {
      if (error) return callback(error);
      return callback(null, match);
   });
};

module.exports = {
  encrypt: encrypt,
  compare: compare
}
