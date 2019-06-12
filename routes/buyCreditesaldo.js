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
var hasilesaldo;

// get json data paket data
router.post('/getjsonesaldo', function(req, res){
    title = req.body.title;
    
    if(title == 'gojek'){
        title = "GO-JEK";
    }
    if(title == 'grab'){
        title = "GRAB";
    }
    if(title == 'ovo'){
        title = "OVO CASH";
    }
    if(title == 'dana'){
        title = "DANA";
    }
    if(title == 'tcash'){
        title = "TCASH";
    }
    if(title == 'mtixcinema21'){
        title = "CINNEMA 21";
    }
    if(title == 'tixidmovie'){
        title = "TIX-ID MOVIE";
    }

    var options = {
        method: 'POST',
        url: apiglobal + 'Prabayar/product_esaldo',
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
        hasilesaldo = JSON.parse(body);
        hasilesaldo = hasilesaldo.data.filter(({ provider }) => provider == title);
        for(var i = 0; i<hasilesaldo.length; i++){
            hasilesaldo[i].checked = "false";
        }
        res.send(hasilesaldo);
    });
});

// buying pulsa
router.post('/buyesaldo', function(req, res){
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