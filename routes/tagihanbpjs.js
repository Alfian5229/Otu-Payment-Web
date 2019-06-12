var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var timestamp = require('time-stamp');
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// variabel for storing json cek file
var hasilcek;

// get json data paket data
router.post('/cektagihanbpjs', function(req, res){
    var options = {
        method: 'POST',
        url: apiglobal + 'Pascabayar/inquiry',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                productCode: req.body.kodeitem,
                customerID: req.body.nomerpelanggan,
                customerMSISDN: req.body.nomerhp,
                aplUse: aplglobal
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        hasilcek = JSON.parse(body);

        res.send(hasilcek);
    });
});

// buying tagihan bpjs
router.post('/buytagihanbpjs', function(req, res){
    var options = { 
        method: 'POST',
        url: apiglobal + 'Pascabayar/payment',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                billingReferenceID: req.body.referenceid,
                aplUse: aplglobal
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasilbeli = JSON.parse(body);
        res.send(hasilbeli.respMessage);
    });
});

module.exports = router;