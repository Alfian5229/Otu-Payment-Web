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

//get operator list
router.post('/getoperator', function(req, res){
    var options = {
        method: 'POST',
        url: apiglobal + 'Pascabayar/product_name',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                productGroup: 'PASCA BAYAR'
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        // variabel for storing list operator
        var listpasca = JSON.parse(body);
        
        var listpascahasil = [];
        for(var i = 0; i < listpasca.productList.length; i++){
            listpascahasil[i] = listpasca.productList[i];
        }

        res.send(listpascahasil);
    });
});

// get json data pascabayar
router.post('/cektagihanpascabayar', function(req, res){
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

// buying tagihan pascabayar
router.post('/buytagihanpascabayar', function(req, res){
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