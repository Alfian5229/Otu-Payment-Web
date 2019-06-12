var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// variabel for storing json prefix file
var prefixPaketData;
// variabel for storing json data file
var hasildata;

// get json prefix operator
router.post('/getjsonprefixdata', function(req, res) {
    var options = { 
		method: 'POST',
        url: apiglobal + 'Prabayar/prefix_data',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        prefixPaketData = JSON.parse(body);
        res.send(prefixPaketData);
    });
});

// get json data paket data
router.post('/getjsonPaketData', function(req, res){
    var options = { 
		method: 'POST',
        url: apiglobal + 'Prabayar/product_data',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        hasildata = JSON.parse(body);
        res.send(hasildata);
    });
});

// buying paket data
router.post('/buypaketdata', function(req, res){
    var options = { 
        method: 'POST',
        url: apiglobal + 'Prabayar/order',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                MSISDN: req.body.nomerhp,
                sequence: 1,
                buyerPhone: "",
                refIDCustomer: "",
                productCode: req.body.kodeitem
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasilbeli = JSON.parse(body);
        res.send(hasilbeli.respMessage);
    });
});

module.exports = router;