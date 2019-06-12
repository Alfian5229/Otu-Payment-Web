var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// variabel for storing json data file
var hasilwifiid;

// get json data paket data
router.post('/getjsonWifiId', function(req, res){
    var options = {
        method: 'POST',
        url: apiglobal + 'Prabayar/product_wifi_id',
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
        hasilwifiid = JSON.parse(body);
        hasilwifiid = hasilwifiid.data.filter(({ provider }) => provider == "WIFI ID");
        for(var i = 0; i<hasilwifiid.length; i++){
            hasilwifiid[i].checked = "false";
        }
        res.send(hasilwifiid);
    });
});

// buying pulsa
router.post('/buywifiid', function(req, res){
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