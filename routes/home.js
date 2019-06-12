var express = require('express');
var router = express.Router();
var session = require('express-session');

//router.use(session({secret: 'ssshhhhh'}));
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('home', { title: 'Product OTU' });
	///*
	// if(typeof req.session.userID !== 'undefined' && req.session.accessToken !== 'undefined'){
	// 	res.render('home', { title: 'Product OTU' });
	// }else{
	// 	res.redirect('errorpage');
	// }
	//*/
	// res.render('home', { title: 'Product OTU' });
	res.render('newDesign', { title: 'Product OTU' });
});

module.exports = router;
