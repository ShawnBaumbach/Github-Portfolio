var express = require('express');
var router = express.Router();
var request = require('request'); // Fetch API

var options = {
  uri: 'https://api.github.com/users/ShawnBaumbach/repos',
  method: 'GET',
  // Accept header is used to ask for topics
  headers: {'user-agent': 'ShawnBaumbach', "Accept":"application/vnd.github.mercy-preview+json"} 
};

/* GET index of project page. */
router.get('/', function(req, res, next) {

  var name = [];
  var mylist;
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.render('Projects', {git: info }); 
    } if (error) {
      console.log("hello")
      console.log(error);
      console.log("API status code: " + response.statusCode);
      console.log(body)
    } if (response.statusCode >= 400){
      console.log(response.statusCode);
      console.log(body);
    }
    // Cant parse http headers without installing a module for it
    // console.log(response.headers.status);
    // var info = JSON.parse(response.headers);
    // can get api limit with GET /rate_limit instead
  })
});

function decodeContent(){
  console.log(new Buffer.from(`Q29kZSBzYW1wbGVzIGZvciBTdGF0ZSBGYXJtIEluc3VyYW5jZS4KRWFjaCBm\nb2xkZXIgaGFzIGEgcmVhZG1lIGZpbGUgZXhwbGFpbmluZyB3aGF0IHRoZSBw\ncm9ncmFtcyBwdXJwb3NlIGlzIGFuZCB3aGF0IHdhcyB1c2VkLgo=\n`, `base64`).toString(`ascii`));
}

module.exports = router;
