var ObjectID = require('mongodb').ObjectID
  , _ = require('lodash');

function Album(a) {
  this.name     = a['album-name'];
  this.artistId = ObjectID(a['artist']);
}

Object.defineProperty(Album, 'collection', {
  get: function() {
    return global.db.collection('album');
  }
});

Album.prototype.save = function(cb) {
  Album.collection.save(this,cb);
};

Album.findById = function(id,cb) {
  Album.collection.findOne(
    { _id : ObjectID(id) },
    cb);
};

Album.findByArtistId = function(id,cb) {
  Album.collection.find(
    { artistId : ObjectID(id) }
  ).toArray(cb);
};

module.exports = Album;

function prototyped(pojo) {
  return _.create(Artist.prototype, pojo);
}
