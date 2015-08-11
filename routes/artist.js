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

router.get('/add', function(req,res) {
  res.render('templates/artist-add');
});

router.post('/', function(req,res) {
  var coll = global.db.collection('artist')
    , artist = req.body;
  coll.save(artist,
    function(err,result) {
      res.redirect('/artists');
    });
});

router.get('/:_id/edit', function(req,res) {
  console.log('req.params',req.params);
  res.render('templates/artist-edit');
});

// in order to delete, we need to have access to
// our unique identifier for each item.
// if we want to access it this way, we have to
// pass in the item's _id to some element in the
// html.

router.post('/:_id/delete', function(req,res) {
  var coll = global.db.collection('artist')
    , _id = ObjectID(req.params._id);
  coll.remove({ _id : _id },
    function(err,result) {
      if (err) console.log(err);
      console.log(result);
      res.send('omg deleted');
    });
});

module.exports = router;
