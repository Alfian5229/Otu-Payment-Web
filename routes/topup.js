var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// get riwayat saldo
router.post('/getbankinfo', function(req, res) {
    var options = { 
        method: 'POST',
        url: apiglobal + 'Deposit/bank',
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
        var hasildata = JSON.parse(body);
        var hasilsearching = [];
        for(var i = 0; i < hasildata.banklist.length; i++){
            hasilsearching[i] = hasildata.banklist[i];
        }
        res.send(hasilsearching);
    });
});

router.post('/topupFix', function(req, res) {
    var options = { 
        method: 'POST',
        url: apiglobal + 'Deposit/request',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                bank: req.body.bank,
                nominal: req.body.nominal
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasildata = JSON.parse(body);
        // var hasilsearching = [];
        // for(var i = 0; i < hasildata.banklist.length; i++){
        //     hasilsearching[i] = hasildata.banklist[i];
        // }
        res.send(hasildata);
    });
});

module.exports = router;