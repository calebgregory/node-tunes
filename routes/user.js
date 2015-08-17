var express = require('express');
var path = require('path');

var User = require(path.join(process.cwd(),
                            '/models/User'));

var router = express.Router();

router.post('/', function(req,res) {
  var u = req.body;
  User.create( u ,
    function(err) {
      if(err) console.log(err);
      res.redirect('/');
    });
});

router.get('/login', function(req,res) {
  res.render('user/login');
});

router.get('/new', function(req,res) {
  res.render('user/register');
});

module.exports = router;
