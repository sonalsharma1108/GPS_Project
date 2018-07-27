var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getdata', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    
    if (err) throw err;

    var dbo = db.db("GPSData");
    dbo.collection("GPSData").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      db.close();
    });
  });
});

module.exports = router;
