var express = require('express');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();

router.get('/add', function(req,res) {
  res.render('templates/album-add');
});

router.post('/add', function(req,res) {
  var coll = global.db.collection('album')
    , album = {
      name : req.body['album-name'],
      artistId : ObjectID(req.body.artist)
    };
  coll.save(album,
    function(err, result) {
      res.redirect('/artists');
    });
});

module.exports = router;
