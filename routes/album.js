var express = require('express');
var path = require('path');

var Album = require(path.join(process.cwd(),
                             '/models/Album'));
var router = express.Router();

router.get('/add', function(req,res) {
  res.render('templates/album-add');
});

router.post('/add', function(req,res) {
  var album = new Album(req.body);
  album.save(function(err,result) {
    var artistId = result.ops[0].artistId
      , albumId = result.ops[0]._id;
    res.redirect('/artists/'+artistId+
                 '/album/'+albumId);
  });
});

module.exports = router;
