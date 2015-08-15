var ObjectID = require('mongodb').ObjectID
  , _ = require('lodash')
  , path = require('path');

function Song(s) {
  this.name     = s.name;
  this.albumId  = ObjectID(s.albumId);
}

Object.defineProperty(Song, 'collection', {
  get: function() {
    return global.db.collection('song');
  }
});

Song.prototype.getAlbum = function(cb) {
  var Album = require(path.join(process.cwd(),
                     '/models/Album'));

  Album.collection.findOne(
    { _id : ObjectID(this.albumId) },
    cb);
};

Song.prototype.save = function(cb) {
  Song.collection.save(this,cb);
};

Song.prototype.update = function(updatedSong,cb) {
  Song.collection.update({ _id : this._id},
    { $set : {
      'name' : updatedSong.name
    } },
    cb);
};

Song.getById = function(id,cb) {
  Song.collection.findOne(
    { _id : ObjectID(id) },
    function(err,song) {
      cb(err,prototyped(song));
    });
};

module.exports = Song;

function prototyped(pojo) {
  return _.create(Song.prototype, pojo);
}
