var bcrypt = require('bcrypt')
  , _ = require('lodash');

function User(u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;
}

Object.defineProperty(User, 'collection', {
  get: function() {
    return global.db.collection('user')
  }
});

User.prototype.save = function(cb) {
  User.collection.save(this,cb);
};

User.create = function(u,cb) {
  if(u.password !== u.password_confirm) {
    cb('Passwords do not match');
  }

  bcrypt.hash( u.password, 8,
    function(err,hash) {
      u.hashedPassword = hash;
      var user = new User(u);
      user.save(cb);
    });
};

User.findByEmail = function(email,cb) {
  User.collection.findOne(
    { email : email },
    function(err,user) {
      cb(err, prototyped(user));
    });
};

User.login = function(u, cb) {
  User.findByEmail( u.email,
    function(err,user) {
      if(user) {
        bcrypt.compare(
          u.password, user.hashedPassword,
          function(err,match) {
            if(match) cb(err,user);
            else cb('Bad email or password');
          });
      } else {
        cb('Bad email or password');
      }
    });
};

module.exports = User;

function prototyped(pojo) {
  return _.create(User.prototype, pojo);
};
