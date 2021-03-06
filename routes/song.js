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
  var s = req.body;
  var song = new Song(s);
  song.save(function(err,result) {
    if(err) console.log(err);
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

router.get('/:_id/edit', function(req,res) {
  var _id = req.params._id;
  var song = Song.findById(_id,
    function(err,song) {
      if(err) console.log(err);
      res.render('song/edit',
                { song : song });
    });
});

router.post('/:_id/delete', function(req,res) {
  var _id = req.params._id;
  Song.findById(_id,
    function(err,song) {
      if(err) console.log(err);
      song.getAlbum(
        function(err,album) {
          if(err) console.log(err);
          song.remove(
            function(err,result) {
              if(err) console.log(err);
              res.redirect('/album/'+album._id);
            });
        });
    });
});

router.post('/:_id/edit', function(req,res) {
  var _id = req.params._id;
  var updatedSong = req.body;
  var song = Song.findById(_id,
    function(err,song) {
      if(err) console.log(err);
      song.update(updatedSong,
        function(err,result) {
          Album.findById(song.albumId,
            function(err,album) {
              res.redirect('/album/'+album._id);
            });
        });
    });
});

module.exports = router;
