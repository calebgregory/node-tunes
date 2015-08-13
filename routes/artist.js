var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'));
var Album = require(path.join(process.cwd(),
                             '/models/Album'));

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
  Artist.findById(req.params._id,
    function(err,artist) {
      if(err) console.log(err);
      Album.findByArtistId(artist._id,
        function(err,albums){
          if(err) console.log(err);
          artist.albums = albums;
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
  Artist.findById(req.params._id,
    function(err,artist) {
      artist.remove(function(err) {
        if (err) console.log(err);
        res.redirect('/artists');
      });
    });
});

router.get('/:_id/album/add', function(req,res) {
  Artist.findById(req.params._id,
    function(err,artist) {
      if (err) console.log(err);
      console.log(artist);
      res.render('templates/artist-album-add',
                { artist : artist });
    });
});

router.get('/:artistId/album/:albumId', function(req,res) {
  var artistId = req.params.artistId
    , albumId = req.params.albumId;
  Album.findById(albumId,
    function(err,album) {
    Artist.findById(album.artistId,
      function(err, artist) {
        album.artist = artist;
        res.render('templates/album',
                  { album : album });
      });
    });
});

module.exports = router;
