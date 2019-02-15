var express = require('express');
var router = express.Router();

/* GET cat page. */
router.get('/', function(req, res, next) {
  res.render('cat');
});

module.exports = router;
