var express = require('express');
var path = require('path');

var User = require(path.join(process.cwd(),
                            '/models/User'));

var router = express.Router();

router.post('/new', function(req,res) {
  var u = req.body;
  User.create( u ,
    function(err) {
      if(err) {
        console.log(err);
        res.render('user/new',
                  { err : err });
      } else {
        User.login( u ,
          function(err,user) {
            req.session.regenerate(
              function() {
                req.session.user = user;
                res.redirect('/');
              });
          });
      }
    });
});

router.get('/new', function(req,res) {
  req.session.regenerate(
    function() {
      res.render('user/new',
                { err : null });
    });
});

router.get('/login', function(req,res) {
  req.session.regenerate(
    function() {
      res.render('user/login');
    });
});

router.post('/login', function(req,res) {
  var u = req.body;
  User.login( u ,
    function(err,user) {
      req.session.regenerate(
        function() {
          req.session.user = user;
          res.redirect('/');
        });
    });
});

router.get('/logout', function(req,res) {
  req.session.regenerate(
    function() {
      res.redirect('/user/login'); // or wherever
    });
});

module.exports = router;
