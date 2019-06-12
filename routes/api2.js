var express = require('express');
var router = express.Router();
var request = require("request");
var md5 = require('md5');
var timestamp = require('time-stamp');

router.get( '/', ( req, res, next ) => {

    res.send( {
        "status": 'ok',
        "test": "testing"
    } );
    
} );

router.post( '/login', ( req, res, next ) => {

    let username = req.body.username ;
    let pass = req.body.password;

    var md5pass = md5(pass);
	var token1 = timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss');
	var presc = token1+md5pass;
	var sc = md5(presc);
	
	var options = { 
		method: 'POST',
  		// url: 'https://api.eklanku.com/developapi/Member/login',
  		url: 'https://payment.eklanku.com/Member/login',
  		headers: 
		{ 
			'postman-token': 'd82f2e0f-fb09-0c88-edef-04b1f35cec80',
			'cache-control': 'no-cache',
			'x-api-key': '222',
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' 
		},
		formData: 
		{
			// userID: '+6285692178890',
			// token: '2019-01-18T00:35:24',
            // securityCode: '97a233643fa4beaafd5892ea61f830d7',
			// passwd: '121121112' 
            userID: username,
            token: token1,
            securityCode: sc,
            passwd: pass
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
		// var hasil = JSON.parse(body);
		// var hs = {};
		// hs.result = hasil;
		// hs.tokendt = token1;
        // has(hs);
        res.send( JSON.parse(body) );
	});
} );

router.post( '/getAllProviders', ( req, res, next ) => {

    let userID = req.body.userID ;
    let accessToken = req.body.accessToken;
    var options = { 
        method: 'POST',
        // url: 'https://api.eklanku.com/Prabayar/prefix_pulsa',
        url: 'https://payment.eklanku.com/Prabayar/prefix_pulsa',
        headers: { 
            'postman-token':'d82f2e0f-fb09-0c88-edef-04b1f35cec80',
            'cache-control':'no-cache',
            'x-api-key':'222',
            'content-type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        // formData: { 
        //     'userID':'EKL0078459',
        //     'accessToken':'97a233643fa4beaafd5892ea61f830d7',
        //     'aplUse':'OTUWEB'
        // } 
        formData: { 
            'userID': userID,
            'accessToken': accessToken,
            'aplUse':'OTUWEB'
        } 
    };

    request(options, (error, response, body) => {
        res.send( JSON.parse(body) );
    });
});

router.post( '/getAllPlans', ( req, res, next ) => {

    let userID = req.body.userID ;
    let accessToken = req.body.accessToken;

    var options = { 
        method: 'POST',
        // url: 'https://api.eklanku.com/Prabayar/product_pulsa',
        url: 'https://payment.eklanku.com/Prabayar/product_pulsa',
        headers: { 
            'postman-token':'d82f2e0f-fb09-0c88-edef-04b1f35cec80',
            'cache-control':'no-cache',
            'x-api-key':'222',
            'content-type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        // formData: { 
        //     'userID':'EKL0078459',
        //     'accessToken':'97a233643fa4beaafd5892ea61f830d7',
        //     'aplUse':'OTUWEB'
        // } 
        formData: { 
            'userID': userID,
            'accessToken': accessToken,
            'aplUse':'OTUWEB'
        } 
    };

    request(options, (error, response, body) => {
        res.send( JSON.parse(body) );
    });
});

router.post( '/order', ( req, res, next ) => {

    let userID = req.body.userID;
    let accessToken = req.body.accessToken;
    let MSISDN = req.body.MSISDN;
    let productCode = req.body.productCode;

    var options = { 
        method: 'POST',
        url: 'https://payment.eklanku.com/Prabayar/order',
        // headers: { 
        //     'postman-token':'d82f2e0f-fb09-0c88-edef-04b1f35cec80',
        //     'cache-control':'no-cache',
        //     'x-api-key':'222',
        //     'content-type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        // },
        // formData: { 
        //     'userID':'EKL0078459',
        //     'accessToken':'97a233643fa4beaafd5892ea61f830d7',
        //     'aplUse':'OTUWEB',
        //     'MSISDN': '085815222251',
        //     'productCode': 'A5'
        // } 
        headers: { 
            'x-api-key':'222'
        },
        formData: { 
            'userID': userID,
            'accessToken': accessToken,
            'MSISDN': MSISDN,
            'aplUse':'OTUWEB',
            'productCode': productCode
        } 
    };
    request(options, (error, response, body) => {
        res.send( JSON.parse(body) );
    });
} );

router.post( '/get_saldo_bonus', ( req, res, next ) => {
    
    let userID = req.body.userID;
    let accessToken = req.body.accessToken;

    var options = { 
        method: 'POST',
        url: 'https://payment.eklanku.com/Member/get_saldo_bonus',
        headers: { 
            'x-api-key':'222'
        },
        formData: { 
            'userID': userID,
            'aplUse':'OTUWEB',
            'accessToken': accessToken
        } 
    };

    request(options, (error, response, body) => {
        res.send( JSON.parse(body) );
    });
} );

module.exports = router;
