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

Album.prototype.remove = function(cb) {
  var my = this;
  Song.findByAlbumId( my._id,
    function(err,songs) {
      // remove all the songs
      // when finished, execute callback
      removeAll(songs,
        function() {
          console.log('all songs removed');
          console.log('this album:',my);
          Album.collection.remove(
            { _id : ObjectID(my._id) },
            cb);
        });
    });
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

function removeAll(songs,cb) {
  if(!songs || songs.length === 0) cb();
  songs.forEach(function(song,i,a) {
    Song.findById(song._id,
      function(err,s) {
        console.log(i,': ',s);
        s.remove(
          function() {
            console.log('   removed');
            if(i === a.length - 1) cb();
          });
      });
  });
}
