var bcrypt = require('bcrypt')
  , _ = require('lodash');

function User(u) {
  this.email = u.email;
}

module.exports = User;

function prototyped(pojo) {
  return _.create(User.prototype, pojo);
};
