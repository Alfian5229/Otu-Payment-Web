var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var router = express.Router();
var app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

// get riwayat saldo
router.post('/cekriwayatsaldo', function(req, res) {
    var options = { 
        method: 'POST',
        url: apiglobal + 'Riwayat/riwayat_by_id',
        headers: 
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                requestID: req.body.requestID,
                start_date: req.body.sdate,
                end_date: req.body.edate
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasildata = JSON.parse(body);
        var hasilsearching = [];
        for(var i = 0; i < hasildata.listData.length; i++){
            hasilsearching[i] = hasildata.listData[i];
        }
        res.send(hasilsearching);
    });
});

module.exports = router;