var ObjectID = require('mongodb').ObjectID
  , _ = require('lodash');

function Artist(a) {
  this.name   = a.name;
  this.genre  = a.genre;
  this.wiki   = a.wiki;
  this.userId = ObjectID(a.userId);
}

Object.defineProperty(Artist, 'collection', {
  get: function() {
    return global.db.collection('artist');
  }
});

Artist.prototype.save = function(cb) {
  Artist.collection.save(this,cb);
};

Artist.prototype.update = function(updatedArtist,cb) {
  Artist.collection.update({ _id : this._id },
    { $set : {
      'name'  : updatedArtist.name ,
      'genre' : updatedArtist.genre,
      'wiki'  : updatedArtist.wiki
    } },
    cb);
};

Artist.prototype.remove = function(cb) {
  Artist.collection.remove(
    { _id : this._id },
    cb);
};

Artist.findById = function(id,cb) {
  Artist.collection.findOne(
    { _id : ObjectID(id) },
    function(err,artist) {
      cb(err,prototyped(artist))
    });
};

Artist.findByName = function(query,cb) {
  Artist.collection.find({ name : query })
    .toArray(cb);
};

Artist.findByUserId = function(id,cb) {
  Artist.collection.find({
    userId : ObjectID(id)
  }).toArray(
    function(err,artists) {
      var prototypedArtists =
        artists.map(function(artist) {
          return prototyped(artist);
        });
      cb(err, prototypedArtists);
    });
};

module.exports = Artist;

function prototyped(pojo) {
  return _.create(Artist.prototype, pojo);
}
