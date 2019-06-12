var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('jadi nya gmna klo bikin tampilan');
});

module.exports = router;