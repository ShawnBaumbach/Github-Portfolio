var express = require('express');
var router = express.Router();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var request = require('request'); // Fetch API

// Database
var db;

MongoClient.connect('mongodb://shawn:Pizza1992@ds259144.mlab.com:59144/mongotest', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db('mongotest'); // Database Name
  //client.close();
})

var options = {
  uri: 'https://api.github.com/users/ShawnBaumbach/repos',
  method: 'GET',
  headers: {'user-agent': 'ShawnBaumbach'}
};

// Load Webpage
router.get('/', function(req, res, next) {
  // res.sendFile('views\\test.html', { root: '.'  });
  // GITHUB API
  console.log(new Buffer.from(`Q29kZSBzYW1wbGVzIGZvciBTdGF0ZSBGYXJtIEluc3VyYW5jZS4KRWFjaCBm\nb2xkZXIgaGFzIGEgcmVhZG1lIGZpbGUgZXhwbGFpbmluZyB3aGF0IHRoZSBw\ncm9ncmFtcyBwdXJwb3NlIGlzIGFuZCB3aGF0IHdhcyB1c2VkLgo=\n`, `base64`).toString(`ascii`));

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info[0].name);
        console.log(info.length-1);
      } if (error) {
        console.log(error);
        console.log("API status code: " + response.statusCode);
        console.log(body)
      }
  })

  // MONGO
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err);
    console.log(results);
    // html file (forms) being passed results with the name quotes
    res.render('forms.ejs', {quotes: results});
    console.log(results);
  })
});

router.post('/form', (req, res, next) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
  })
    res.redirect('/forms');
})

// TODO: close not working?
process.on('SIGINT', function() {
  MongoClient.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

module.exports = router;
