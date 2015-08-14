var ObjectID = require('mongodb').ObjectID
  , _ = require('lodash');

function Song(s) {
  this.name     = s.name;
  this.albumId  = ObjectID(s.albumId);
}

Object.defineProperty(Song, 'collection', {
  get: function() {
    return global.db.collection('song');
  }
});

Song.prototype.save = function(cb) {
  Song.collection.save(this,cb);
};

module.exports = Song;

function prototyped(pojo) {
  return _.create(Song.prototype, pojo);
}
