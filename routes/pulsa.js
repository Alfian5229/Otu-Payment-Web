var express = require('express');
var FormData = require('form-data');
//var http = require('http');

var router = express.Router();
var form = new FormData();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pulsa', { title: 'Express' });
});

module.exports = router;