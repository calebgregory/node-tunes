var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var path = require('path');

var Artist = require(path.join(process.cwd(),
                             '/models/Artist'));
var Album = require(path.join(process.cwd(),
                             '/models/Album'));

var router = express.Router();

router.get('/', function(req,res) {
  var _id = req.session.user._id;
  console.log(_id);
  Artist.findByUserId( _id ,
    function(err,artists) {
      if(err) console.log(err);
      res.render('index',
                  { artists : artists });
    });
});

router.post('/', function(req,res) {
  var a = req.body;
  a.userId = req.session.user._id;
  var artist = new Artist(a);
  artist.save(function(err) {
    if(err) console.log(err);
    res.redirect('/artists');
  });

});

router.get('/add', function(req,res) {
  res.render('artist/add');
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
          res.render('artist/index',
                    { artist : artist });
        });
    });
});

router.get('/:_id/edit', function(req,res) {
  var _id = req.params._id;
  Artist.findById(_id, function(err,artist) {
    if(err) console.log(err);
    res.render('artist/edit',
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

module.exports = router;
