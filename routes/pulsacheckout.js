var express = require('express');
var router = express.Router();
var readline = require('readline');
var request = require("request");

function payproduct(p1,p2,p3,p4,has){
	var options = { 
		method: 'POST',
		url: 'https://api.eklanku.com/topup/',
		headers: { 
			'postman-token': '3b8b73e9-b350-eadb-8ce1-29d963e75a6a',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		formData: { 
			userID: p2,
			accessToken: p3,
			aplUse: 'OTUIOS',
			MSISDN: p4,
			sequence: '1',
			buyerPhone: '',
			refIDCustomer: '',
			productCode: p1
			} 
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		has(body);
	});
}

router.post('/', function(req, res) {
	//res.write('<p>'+hasil+'</p>');
	var par = req.body.prodcode.split("|");
	res.render('pulsacheckout', { title: 'Product Checkout', nope:req.body.nohp, code: par[0], par:par });
});

router.post('/pay', function(req, res) {
	var code = JSON.parse(req.body.prodcode);
	var MSISDN = JSON.parse(req.body.MSISDN);
	payproduct(code.code,req.session.userID,req.session.accessToken, MSISDN.nope, function(rs) {
		var hasil = JSON.parse(rs);
		//res.json(hasil);
		//res.end();
		res.render('pulsapay', { title: 'Status Pembelian Product',hasil:hasil });
	});
});

module.exports = router;