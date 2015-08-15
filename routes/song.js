var express = require('express');
var path = require('path');

var Album = require(path.join(process.cwd(),
                             '/models/Album'));
var Song = require(path.join(process.cwd(),
                             '/models/Song'));
var router = express.Router();

router.get('/add', function(req,res) {
  res.render('templates/song-add');
});

router.post('/', function(req,res) {
  var song = new Song(req.body);
  song.save(function(err,result) {
    var albumId = result.ops[0].albumId;
    res.redirect('/album/'+albumId);
  });
});

router.get('/add/:albumId', function(req,res) {
  Album.findById(req.params.albumId,
    function(err,album) {
      if(err) console.log(err);
      album.getArtist(
        function(err, artist) {
          album.artist = artist;
          res.render('song/add',
                    { album : album });
        });
    });
});

router.post('/add/:albumId', function(req,res) {
  req.body.albumId = req.params.albumId;
  var song = new Song(req.body);
  song.save(function(err,result) {
    var albumId = result.ops[0].albumId;
    res.redirect('/album/'+albumId);
  });
});

module.exports = router;
