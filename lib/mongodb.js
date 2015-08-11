var MongoClient = require('mongodb').MongoClient;

if(!global.db) {
  var url = process.env.MONGODB_URL;
  MongoClient.connect(url, function(err,db) {
    global.db = db;
    console.log('connected to server');
  });
}
