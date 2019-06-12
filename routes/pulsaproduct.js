var express = require('express');
var router = express.Router();
var readline = require('readline');
var request = require("request");

var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

//readline.emitKeypressEvents(process.stdin);
//process.stdin.setRawMode(true);

function getprodf1(p1,p2,has){
	var options = {
			method: 'POST',
			url: 'https://api.eklanku.com/developapi/Member/login',
			headers: { 
				'postman-token': '504a305d-719b-6c2b-adb2-bb01f77c93d7',
				'cache-control': 'no-cache',
				'content-type': 'application/x-www-form-urlencoded',
				'x-api-key': '222' },
			form: { 
				userID: '+6285692178890',
				token: '2019-01-03T12:53:29',
				securityCode: '22c5317bca4e482b1ee9db5b447f3e5e',
				passwd: '121121112' } 
		};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			has(body);
		});
}

function apiproduct(uid,act,prod,rs){
	var options = {
		method: 'POST',
			url: 'https://api.eklanku.com/topup/product',
			headers: { 
				'postman-token': '273393e4-57d1-f8b3-3fa4-713520c133e0',
			 'cache-control': 'no-cache',
			 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		formData: { 
			userID: uid,
			 accessToken: act,
			 aplUse: 'OTUIOS',
			 provider: prod } };
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		rs(body);
	});
}

router.get('/', function(req, res) {
	/*
	var keycount = 0;
	process.stdin.on('keypress', (str, key) => {
		if(keycount>=5){
			
			process.exit();
		}
		keycount++;
		if( key.name == 'escape' ) {
            process.exit();
        }
	});
	*/
	res.render('pulsaproduct1', { title: 'Product Pulsa OTU' });
});

router.get('/product', function(req, res) {
	apiproduct(req.session.userID, req.session.accessToken, req.query.prov, function(rs) {
		var hasil = JSON.parse(rs);
		res.json(hasil);
		//res.write('<p>'+hasil+'</p>');
		//res.end('END');
	})
	//*/
});

module.exports = router;