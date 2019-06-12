var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret: 'ssshhhhh'}));
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
	if(typeof req.session.userID !== 'undefined' && req.session.accessToken !== 'undefined'){
		res.render('home', { title: 'Product OTU' });
	}else{
		res.redirect('errorpage');
	}
});

module.exports = router;
