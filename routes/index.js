var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
  if(req.session.user) res.redirect('/artists');
  else res.render('home');
});

module.exports = router;
