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
router.post('/cektagihanlistrik', function(req, res){
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

        var day = timestamp('DD');
        var month = timestamp('MM');
        
        switch (month) {
            case "01":
                month = "Januari";
                break;
            case "02":
                month = "Februari";
                break;
            case "03":
                month = "Maret";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "Mei";
                break;
            case "06":
                month = "Juni";
                break;
            case "07":
                month = "Juli";
                break;
            case "08":
                month = "Agustus";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "Oktober";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "Desember";
                break;
        }

        var year = timestamp('YYYY');
        var time = timestamp('HH:mm:ss');
        var date = day + " " + month + " " + year + " " + time;
        hasilcek.respTime = date;
        res.send(hasilcek);
    });
});

// buying tagihan listrik
router.post('/buytagihanlistrik', function(req, res){
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