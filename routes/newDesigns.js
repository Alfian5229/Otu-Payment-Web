var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var md5 = require('md5');
var timestamp = require('time-stamp');
var request = require("request");
var router = express.Router();
var app = express();

var token;

router.use(session({secret: 'OTUCHATPAYMENT', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('errorpage', { title: 'Error Page' });
    res.send('design route Working');
});

//for get email or nohp
router.post('/getemail', function(req, res){
    var nohp = sess.email;
    var modnohp = nohp.replace("62","0");
    res.send(modnohp);
});

//cek session
router.get('/ceksession', function(req, res) {
    sess = req.session;
    if(sess.email) {
        res.end("loggedin");
    }
    else {
        res.end("loggedout");
    }
});

//get banner
router.get('/getBanner', function(req, res) {
    
    var options = { 
        method: 'GET',
        url: apiglobal + 'Konten/banner',
        headers: 
			{ 
				'x-api-key': '222'
			}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasil = JSON.parse(body);
        var hasilbanner = [];
        for (var i=0 ; i < hasil.data.length ; i++){
            hasilbanner[i] = hasil.data[i];
        }
        res.send(hasilbanner);
    });
});

//login
router.post('/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.pass;

    token = timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss');
    var kode = 'x@2564D';
    var securityCode = md5(token + md5(kode + password));

    var options = { 
		method: 'POST',
        url: apiglobal + 'Member/login',
        headers:
			{ 
				'x-api-key': '222'
			},
			formData: 
			{
				userID: email,
				token: token,
				securityCode: securityCode,
				passwd: password
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasil = JSON.parse(body);
        if(hasil.errNumber != 0){
            res.end('gagal');
        }
        else{
            sess = req.session;
            sess.email = req.body.email;
            sess.userID = hasil.userID;
            sess.accessToken = hasil.mbr_token;
            console.log(hasil.userID + " is logged in " + timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss'));
            res.end('done');
        }
    });
});

//get saldo
router.post('/getSaldo', function(req, res) {

    var options = { 
		method: 'POST',
        url: apiglobal + 'Member/get_saldo_bonus',
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
        var hasil = JSON.parse(body);
        var hasildata = hasil.Balance;
        res.send(hasildata);
    });

});

router.post('/logout', function(req, res) {

    var options = { 
		method: 'POST',
        url: apiglobal + 'Member/logout',
        headers:
			{
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                token: token
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasil = JSON.parse(body);

        if(hasil.errNumber == 0){
            req.session.destroy(function(err) {
                if(err) {
                } else{
                    console.log(hasil.userID + " is logged out " + timestamp('YYYY-MM-DD')+"T"+timestamp('HH:mm:ss'));
                    res.end('sukses');
                }
            });
        }
    });
});

router.post('/cektujuantransfer', function(req, res) {
    var options = { 
		method: 'POST',
        url: apiglobal + 'Transfer/cek_member',
        headers:
			{
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                destination: req.body.destination
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasil = JSON.parse(body);
        res.send(hasil);
    });
});

router.post('/transfersaldofix', function(req, res) {
    var pin = md5(req.body.pin + "x@2016ekl");
    var options = { 
		method: 'POST',
        url: apiglobal + 'Transfer/transfer_saldo',
        headers:
			{
				'x-api-key': '222'
			},
			formData: 
			{
				userID: sess.userID,
                accessToken: sess.accessToken,
                aplUse: aplglobal,
                tujuan: req.body.tujuan,
                nominal: req.body.nominal,
                pin: pin
			} 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var hasil = JSON.parse(body);
        res.send(hasil);
    });
});

router.get( '/payment-page', function( req, res, next ) {
    res.render( 'newDesign', {} );
} );

router.get( '/buycreditpulsa', function( req, res, next ) {
    res.render( 'buycreditpulsa', {} );
} );

router.get( '/buycreditpaketdata', function( req, res, next ) {
    res.render( 'buycreditpaketdata', {} );
} );

router.get( '/buycredittokenlistrik', function( req, res, next ) {
    res.render( 'buycredittokenlistrik', {} );
} );

router.get( '/buycreditetoll', function( req, res, next ) {
    res.render( 'buycreditetoll', {} );
} );

router.get( '/buycreditgame', function( req, res, next ) {
    res.render( 'buycreditgame', {} );
} );

router.get( '/buycreditsms', function( req, res, next ) {
    res.render( 'buycreditsms', {} );
} );

router.get( '/buycredittelepon', function( req, res, next ) {
    res.render( 'buycredittelepon', {} );
} );

router.get( '/buycreditesaldo', function( req, res, next ) {
    res.render( 'buycreditesaldo', {} );
} );

router.get( '/buycreditwifiid', function( req, res, next ) {
    res.render( 'buycreditwifiid', {} );
} );

router.get( '/tagihanlistrik', function( req, res, next ) {
    res.render( 'tagihanlistrik', {} );
} );

router.get( '/tagihanbpjs', function( req, res, next ) {
    res.render( 'tagihanbpjs', {} );
} );

router.get( '/tagihantelkom', function( req, res, next ) {
    res.render( 'tagihantelkom', {} );
} );

router.get( '/tagihanpgn', function( req, res, next ) {
    res.render( 'tagihanpgn', {} );
} );

router.get( '/tagihanpascabayar', function( req, res, next ) {
    res.render( 'tagihanpascabayar', {} );
} );

router.get( '/tagihantvkabel', function( req, res, next ) {
    res.render( 'tagihantvkabel', {} );
} );

router.get( '/tagihanpdam', function( req, res, next ) {
    res.render( 'tagihanpdam', {} );
} );

router.get( '/tagihanfinance', function( req, res, next ) {
    res.render( 'tagihanfinance', {} );
} );

router.get( '/tagihankartukredit', function( req, res, next ) {
    res.render( 'tagihankartukredit', {} );
} );

router.get( '/forbiddenpage', function( req, res, next ) {
    res.render( 'forbiddenpage', {} );
} );

router.get( '/underconstruction', function( req, res, next ) {
    res.render( 'underconstruction', {} );
} );

router.get( '/riwayat', function( req, res, next ) {
    res.render( 'riwayat', {} );
} );

router.get( '/topup', function( req, res, next ) {
    res.render( 'topup', {} );
} );

module.exports = router;
