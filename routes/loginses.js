///*
var express = require('express');
var router = express.Router();
var timestamp = require('time-stamp');
var md5 = require('md5');
var request = require("request");
var qs = require('querystring');
var bodyParser = require("body-parser");
var session = require('express-session');
var https = require('https');

/*
router.use(session({ 
	path: '/', 
	httpOnly: true, 
	secure: false, 
	maxAge: null })
);
*/

function loginapi(userid,pass,has){
	var md5pass = md5(pass);
	var token1 = timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss');
	var presc = token1+md5pass;
	var sc = md5(presc);
	
	var options = { 
		method: 'POST',
  		url: 'https://api.eklanku.com/developapi/Member/login',
  		headers: 
		{ 
			'postman-token': 'd82f2e0f-fb09-0c88-edef-04b1f35cec80',
			'cache-control': 'no-cache',
			'x-api-key': '222',
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' 
		},
		formData: 
		{
			userID: '+6285692178890',
			token: '2019-01-18T00:35:24',
			securityCode: '97a233643fa4beaafd5892ea61f830d7',
			passwd: '121121112' 
		} 
	};
	
	// var options = {
	// 	method: 'POST',
	// 	url: 'https://api.eklanku.com/developapi/Member/login',
	// 	headers: { 
	// 		'postman-token': 'fa4a998b-00c2-0956-e3cf-a058760d87e3',
	// 		'cache-control': 'no-cache',
	// 		'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
	// 	formData: { 
	// 		userID: userid,
	// 		token: token1,
	// 		securityCode: sc,
	// 		passwd: pass 
	// 	} 
	// };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		var hasil = JSON.parse(body);
		var hs = {};
		hs.result = hasil;
		hs.tokendt = token1;
		has(hs);
	});
}

function logoutapi(userID,accessToken,token,hs){
	var options = { 
		method: 'POST',
		url: 'https://api.eklanku.com/logout',
		headers: { 
			'postman-token': '0d1c7f43-fbe8-c32e-acd1-8d7e433dccb6',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		formData: { 
			userID: userID,
			accessToken: accessToken,
			token: token }};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
			hs(body);
	});
}
	
router.post('/', function(req, res) {
	if(req.body.username && req.body.password) {
		loginapi(req.body.username, req.body.password, function(has){
			//var hasil = JSON.parse(has);
			sess = req.session;
			sess.userID = has.result.userID;
			sess.accessToken = has.result.accessToken;
			sess.token = has.tokendt;
			req.session.save();
			res.redirect('/home');
			/*
			res.send(JSON.stringify(hasil.userID));
			sess = req.session;
			sess.userID = hasil.userID;
			sess.accessToken = hasil.accessToken;
			req.session.save();
			*/
		});
	}else {
		process.exit(-1);
	}
});

router.get('/', function(req, res) {
	/*
	var pass = '121121112';
	var md5pass = md5(pass);
	var token1 = timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss');
	var presc = token1+md5pass;
	var sc = md5(presc);
	res.setHeader("Content-Type", "text/html");
	res.write('<p>'+token1+'</p>');
	res.write('<p>'+sc+'</p>');
	res.end('<p>END</p>');
*/
// if(req.body.username && req.body.password) {
	if(req.query.username && req.query.passwd) {
// loginapitest(req.params.username, req.params.passwd, function(has){
	loginapi(req.query.username, req.query.passwd, function(has){
			//var hasil = JSON.parse(has);
			sess = req.session;
			sess.userID = has.result.userID;
			sess.accessToken = has.result.mbr_token;
			sess.token = has.tokendt;
			req.session.save();
			res.redirect('/home');
			/*
			res.send(JSON.stringify(hasil.userID));
			sess = req.session;
			sess.userID = hasil.userID;
			sess.accessToken = hasil.accessToken;
			req.session.save();
			*/
		});
// res.send(JSON.stringify({
// 	'in': 'if',
// 	'req': req.query
// }));
	}else {
		process.exit(-1);
		// res.send(JSON.stringify({
		// 	'in': 'else',
		// 	'req': req.query
		// }));
	}

});

router.get('/logout', function(req, res) {
	logoutapi(req.session.userID, req.session.accessToken, req.session.token, function(hs){
		req.session.destroy(function(err){
			if(err){
			}  
			else{  
				res.redirect('/home');  
			}  
		});  
	});
});

module.exports = router;