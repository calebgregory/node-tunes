var express = require('express');
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'));
var Album = require(path.join(process.cwd(),
                             '/models/Album'));
var router = express.Router();

router.get('/add', function(req,res) {
  res.render('templates/album-add');
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
          res.render('templates/album',
                    { album : album });
        });
    });
});


router.post('/add/:artistId', function(req,res) {
  Artist.findById(req.params.artistId,
    function(err,artist) {
      if (err) console.log(err);
      console.log(artist);
      var album = new Album(req.body);
      album.artistId = artist._id;
      album.save(function(err,result) {
        var albumId = result.ops[0]._id;
        res.redirect('/album/'+albumId);
      });
    });
});

router.get('/:_id/addsong', function(req,res) {
  Album.findById(req.params._id,
    function(err,album) {
      if(err) console.log(err);
      album.getArtist(
        function(err, artist) {
          album.artist = artist;
          res.render('templates/song-add',
                    { artist : artist });
        });
    });
});

module.exports = router;
