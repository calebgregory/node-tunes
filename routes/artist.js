var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'));
var router = express.Router();

router.get('/', function(req,res) {
  Artist.findAll(function(err,artists) {
    if(err) console.log(err);
    res.render('templates/index',
              { artists : artists });
  });
});

router.post('/', function(req,res) {
  var artist = new Artist(req.body);
  artist.save(function(err) {
    if(err) console.log(err);
    res.redirect('/artists');
  });

});

router.get('/add', function(req,res) {
  res.render('templates/artist-add');
});

router.get('/search', function(req,res) {
  var query = new RegExp(req.query.name,"i");
  Artist.findByName(query, function(err,matches) {
    if(err) console.log(err);
    res.send(matches);
  });
});

router.get('/:_id', function(req,res) {
  var _id = req.params._id
    , artists = global.db.collection('artist')
    , albums = global.db.collection('album');
  artists.findOne({ _id : ObjectID(_id) },
    function(err,artist) {
      albums.find({ artistId : ObjectID(_id) })
        .toArray(function(err,matches) {
          artist.albums = matches;
          res.render('templates/artist',
                    { artist : artist });

        });
    });
});

router.get('/:_id/edit', function(req,res) {
  var _id = req.params._id;
  Artist.findById(_id, function(err,artist) {
    if(err) console.log(err);
    res.render('templates/artist-edit',
              { artist : artist });
  });
});

router.post('/:_id/edit', function(req,res) {

  var updatedArtist = req.body;
  Artist.findById(req.params._id,
    function(err,artist) {
      if(err) console.log(err);
      artist.update(updatedArtist,
        function(err,artist) {
          res.redirect('/artists/'+req.params._id);
        });
    });
});

router.post('/:_id/delete', function(req,res) {
  var coll = global.db.collection('artist')
    , _id = ObjectID(req.params._id);
  coll.remove({ _id : _id },
    function(err,result) {
      if (err) console.log(err);
      res.redirect('/artists');
    });
});

router.get('/:artistId/album/:albumId', function(req,res) {
  var albums = global.db.collection('album')
    , artists = global.db.collection('artist')
    , artistId = req.params.artistId
    , albumId = req.params.albumId;
  albums.findOne({ _id : ObjectID(albumId) },
    function(err, album) {
      artists.findOne({ _id : ObjectID(artistId) },
        function(err, artist) {
          album.artist = artist;
          res.render('templates/album',
                    { album : album });
        });
    });
});

module.exports = router;
