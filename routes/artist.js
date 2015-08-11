var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req,res) {
  var coll = global.db.collection('artist');
  coll.find().toArray(function(err,artists) {
    if(err) console.log(err);
    res.render('templates/index',
              { artists : artists });
    console.log('req.url:',req.url);
    console.log('artists:',artists);
  });
});

router.post('/', function(req,res) {
  var coll = global.db.collection('artist')
    , artist = req.body;
  coll.save(artist,
    function(err,result) {
      res.redirect('/artists');
    });
});

router.get('/add', function(req,res) {
  res.render('templates/artist-add');
});

router.get('/search', function(req,res) {
  var coll = global.db.collection('artist')
    , query = new RegExp(req.query.name,"i");
  coll.find({ name : query })
    .toArray(function(err,matches) {
      res.send(matches);
    });
});

router.get('/:_id', function(req,res) {
  var _id = ObjectID(req.params._id)
    , coll = global.db.collection('artist');
  coll.findOne({ _id : _id },
    function(err,artist) {
      res.render('templates/artist',
                { artist : artist });
    });
});

router.get('/:_id/edit', function(req,res) {
  var _id = ObjectID(req.params._id)
    , coll = global.db.collection('artist');
  coll.findOne({ _id : _id },
    function(err,artist) {
      console.log(artist);
      res.render('templates/artist-edit',
                { artist : artist });
    });
});

router.post('/:_id/edit', function(req,res) {
  var _id = ObjectID(req.params._id)
    , artist = res.body
    , coll = global.db.collection('artist');
  coll.update({ _id : _id },
    { $set : {
      "name"  : artist.name ,
      "genre" : artist.genre,
      "wiki"  : artist.wiki
    } },
    function(err,artist) {
      res.render('/artists/'+req.params._id);
    });
});

router.post('/:_id/delete', function(req,res) {
  var coll = global.db.collection('artist')
    , _id = ObjectID(req.params._id);
  coll.remove({ _id : _id },
    function(err,result) {
      if (err) console.log(err);
      console.log(result);
      res.redirect('/artists');
    });
});

module.exports = router;
