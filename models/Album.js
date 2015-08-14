var ObjectID = require('mongodb').ObjectID
  , _ = require('lodash')
  , path = require('path')
  , Artist = require(path.join(process.cwd(),
                              '/models/Artist'))
  , Song = require(path.join(process.cwd(),
                            '/models/Song'));

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

Album.prototype.getArtist = function(cb) {
  Artist.collection.findOne(
    { _id : ObjectID(this.artistId) },
    cb);
};

Album.prototype.getSongs = function(cb) {
  console.log(this);
  Song.collection.find(
    { 'albumId' : ObjectID(this._id) }
  ).toArray(cb);
};

Album.findById = function(id,cb) {
  Album.collection.findOne(
    { _id : ObjectID(id) },
    function(err, album) {
      cb(err, prototyped(album));
    });
};

Album.findByArtistId = function(id,cb) {
  Album.collection.find(
    { artistId : ObjectID(id) }
  ).toArray(cb);
};

module.exports = Album;

function prototyped(pojo) {
  return _.create(Album.prototype, pojo);
}
