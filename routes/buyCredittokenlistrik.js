var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// variabel for storing json data file
var hasildata;

// get json data paket data
router.post('/getjsonTokenListrik', function(req, res){
    var options = {
        method: 'POST',
        url: apiglobal + 'Prabayar/product_pln_token',
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
        hasildata = hasildata.data.filter(({ provider }) => provider == "PLN TOKEN");
        for(var i = 0; i<hasildata.length; i++){
            hasildata[i].checked = "false";
        }
        res.send(hasildata);
    });
});

// buying token listrik
router.post('/buylistrik', function(req, res){
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
                MSISDN: req.body.nomerpelanggan,
                sequence: 1,
                buyerPhone: req.body.nomerhp,
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