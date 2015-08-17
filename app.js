var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');


// define routes

var index = require(path.join(process.cwd(),
                             '/routes/index'));
var artist = require(path.join(process.cwd(),
                              '/routes/artist'));
var album = require(path.join(process.cwd(),
                             '/routes/album'));
var song = require(path.join(process.cwd(),
                            '/routes/song'));
var user = require(path.join(process.cwd(),
                            '/routes/user'));

var app = express();
if(process.env.NODE_ENV !== 'production') {
  require(path.join(process.cwd(),
                    '/lib/secrets'));
}
require(path.join(process.cwd(),
                  '/lib/mongodb'));


app.set('view engine', 'ejs');
app.set('case sensitive routing', true);


app.locals.title = 'nodeTunes';


app.use(session({
  secret : 'nodetunes',
  resave : false,
  saveUninitialized : true
}));

app.use(lessCSS('www'));

var logStream = fs.createWriteStream(
  'access.log',
  {flags:'a'});
app.use(morgan('combined', {stream:logStream}));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended : true,
  type     : '*/x-www-form-urlencoded'
}));


app.use(function getAuthStatus(req,res,next) {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', index);
app.use('/user', user);
app.use(express.static('www'));

app.use(function requireAuth(req,res,next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/user/login');
  }
});

app.use('/artists', artist);
app.use('/album', album);
app.use('/song', song);


app.use(function(req,res,next) {
  res.status(403).send('Unauthorized');
});

app.use(function(err,req,res,next) {
  var log = require(path.join(process.cwd(),
                              '/lib/log'));
  var errStream = fs.createWriteStream(
    'errors.log',
    {flags:'a'});
  errStream.write(
    log.printNoColors(req,res)+'\n'+
    err+'\n'+
    err.stack+'\n');

  res.status(500).send('Server Error');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App: I\'m listening');
  console.log('@ http://localhost:3000');
});
