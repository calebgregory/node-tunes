var MongoClient = require('mongodb').MongoClient;

if(!global.db) {
  var url = process.env.MONGODB_URL || 'mongodb://localhost:27017/nodetunes';
  MongoClient.connect(url, function(err,db) {
    global.db = db;
    console.log('connected to server');
  });
}
