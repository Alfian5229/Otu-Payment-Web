var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));

router.get('/', function(req, res, next) {
	res.end("yes");
});

router.post('/testtt',function(reqp,resp){
	var user_name=reqp.body.user;
	var password=reqp.body.user;
	
	if(reqp.session.page_views && reqp.session.user_name==user_name){
		reqp.session.page_views++;
		resp.send('done1');
	} else {
		reqp.session.page_views = 1;
		ssn = reqp.session;
		ssn.user_name=user_name;
		resp.write("Welcome to this page for the first time!");
		resp.write("<br/>");
		resp.write("Saved Session Username = "+ssn.user_name);
		resp.write("<br/>");
		resp.end("done2");
	}
	if(reqp.session.page_views == 3){
		reqp.session.destroy(function(err) {
			if(err) {
			} else {
				resp.write("done3, Ulang kembali !");
				resp.end("done3");
			}
		});
	}
	//resp.write(reqp.session.user_name);
	//resp.write(reqp.body.user);
	//resp.write("<br/>");
	//resp.end("end");
});

module.exports = router;