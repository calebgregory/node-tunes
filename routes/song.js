var express = require('express');
var path = require('path');

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

router.post('/add/:albumId', function(req,res) {
  req.body.albumId = req.params.albumId;
  console.log(req.body);
  var song = new Song(req.body);
  song.save(function(err,result) {
    var albumId = result.ops[0].albumId;
    res.redirect('/album/'+albumId);
  });
});

module.exports = router;
