var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

//variable for storing which content is clicked by content
var title;
// variabel for storing json data file
var hasilgame;

// get json data paket data
router.post('/getjsongame', function(req, res){
    title = req.body.title;
    
    var options = {
        method: 'POST',
        url: apiglobal + 'Prabayar/product_game',
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
        hasilgame = JSON.parse(body);
        hasilgame = hasilgame.data.filter(({ provider }) => provider == title);
        for(var i = 0; i<hasilgame.length; i++){
            hasilgame[i].checked = "false";
        }
        res.send(hasilgame);
    });
});

// buying game
router.post('/buygame', function(req, res){
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