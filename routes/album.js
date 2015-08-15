var express = require('express');
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'))
  , Album = require(path.join(process.cwd(),
                             '/models/Album'))
  , Song = require(path.join(process.cwd(),
                             '/models/Song'));

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
          Song.findByAlbumId( album._id,
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

router.post('/:_id/delete', function(req,res) {
  var _id = req.params._id;
  Album.findById(_id,
    function(err,album) {
      console.log('album:',album);
      if(err) console.log(err);
      album.remove(
        function(err,result) {
          if(err) console.log(err);
          console.log('result-n',result.result.n);
          res.redirect('/artists/'+album.artistId);
        });
    });
});

// referenced from /views/album/index.ejs
// not sure I want to keep this feature, as it
// requires multiple updates of songs in a for-loop,
// which is doable, but unsightly.

//router.get('/:_id/edit', function(req,res) {
  //var _id = req.params._id;
  //Album.findById(_id,
    //function(err,album) {
      //if(err) console.log(err);
      //Song.findByAlbumId( album._id,
        //function(err,songs) {
          //album.songs = songs;
          //album.getArtist(
            //function(err,artist) {
              //album.artist = artist;
              //res.render('album/edit',
                        //{ album : album });
            //});
        //});
    //});
//});

//router.post('/:_id/edit', function(req,res) {
  //var _id = req.params._id;
  //Album.findById(_id,
    //function(err,album) {
      //album.getSongs(
        //function(err,songs) {
          //console.log(songs);
          //res.send(songs);
        //});
    //});
//});

module.exports = router;
