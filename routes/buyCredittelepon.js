var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// variabel for storing json prefix file
var prefixTelepon;
// variabel for storing json telepon file
var hasiltelepon;

// get json prefix operator
router.post('/getjsonprefixtelpon', function(req, res) {
    var options = { 
        method: 'POST',
        url: apiglobal + 'Prabayar/prefix_telpon',
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
        prefixTelepon = JSON.parse(body);
        res.send(prefixTelepon);
    });
});

// get json data telepon
router.post('/getjsonTelepon', function(req, res){
    var options = { 
        method: 'POST',
        url: apiglobal + 'Prabayar/product_telepon',
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
        hasiltelepon = JSON.parse(body);
        res.send(hasiltelepon);
    });
});

// buying telepon
router.post('/buytelepon', function(req, res){
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