var express = require('express');
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'));
var Album = require(path.join(process.cwd(),
                             '/models/Album'));
var router = express.Router();

router.get('/add', function(req,res) {
  res.render('album/add');
});

router.post('/', function(req,res) {
  var album = new Album(req.body);
  album.save(function(err,result) {
    var albumId = result.ops[0]._id;
    res.redirect('/album/'+albumId);
  });
});

router.get('/:_id', function(req,res) {
  Album.findById(req.params._id,
    function(err,album) {
      if(err) console.log(err);
      album.getArtist(
        function(err, artist) {
          album.artist = artist;
          album.getSongs(
            function(err,songs) {
              album.songs = songs;
              res.render('album/index',
                        { album : album });
            });
        });
    });
});

router.get('/add/:artistId', function(req,res) {
  Artist.findById(req.params.artistId,
    function(err,artist) {
      if (err) console.log(err);
      res.render('artist/album-add',
                { artist : artist });
    });
});

router.post('/add/:artistId', function(req,res) {
  Artist.findById(req.params.artistId,
    function(err,artist) {
      if (err) console.log(err);
      var album = new Album(req.body);
      album.artistId = artist._id;
      album.save(function(err,result) {
        var albumId = result.ops[0]._id;
        res.redirect('/album/'+albumId);
      });
    });
});

router.get('/:_id/edit', function(req,res) {
  var _id = req.params._id;
  Album.findById(_id,
    function(err,album) {
      if(err) console.log(err);
      album.getSongs(
        function(err,songs) {
          album.songs = songs;
          album.getArtist(
            function(err,artist) {
              album.artist = artist;
              res.render('album/edit',
                        { album : album });
            });
        });
    });
});

module.exports = router;
