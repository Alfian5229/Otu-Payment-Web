var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var errorpageRouter = require('./routes/errorpage');
var pulsaproductRouter = require('./routes/pulsaproduct');
var pulsacheckoutRouter = require('./routes/pulsacheckout');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var testRouter = require('./routes/test');
//var testsessionRouter = require('./routes/testsession');
//var pulsaRouter = require('./routes/pulsa');
var loginsesRouter = require('./routes/loginses');

var newDesigns = require('./routes/newDesigns');
var riwayat = require('./routes/riwayat');
var topup = require('./routes/topup');
var buyCreditpulsa = require('./routes/buyCreditpulsa');
var buyCreditpaketdata = require('./routes/buyCreditpaketdata');
var buyCredittokenlistrik = require('./routes/buyCredittokenlistrik');
var buyCreditetoll = require('./routes/buyCreditetoll');
var buyCreditgame = require('./routes/buyCreditgame');
var buyCreditsms = require('./routes/buyCreditsms');
var buyCredittelepon = require('./routes/buyCredittelepon');
var buyCreditesaldo = require('./routes/buyCreditesaldo');
var buyCreditwifiid = require('./routes/buyCreditwifiid');
var tagihanlistrik = require('./routes/tagihanlistrik');
var tagihanbpjs = require('./routes/tagihanbpjs');
var tagihantelkom = require('./routes/tagihantelkom');
var tagihanpgn = require('./routes/tagihanpgn');
var tagihanpascabayar = require('./routes/tagihanpascabayar');
var tagihantvkabel = require('./routes/tagihantvkabel');
var tagihanpdam = require('./routes/tagihanpdam');
var tagihanfinance = require('./routes/tagihanfinance');
var tagihankartukredit = require('./routes/tagihankartukredit');
var pulsaRouter = require( './routes/pulsa' );

// var apiRouter = require( './routes/api' );
var api1Router = require( './routes/api2' );

var app = express();

//variabel session global
var sess;
//variabel api global
// global.apiglobal = 'https://api.eklanku.com/developapi/';
global.apiglobal = 'https://payment.eklanku.com/';
global.aplglobal = 'OTUWEB';
// global.aplglobal = 'OTU';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({ origin: '*' , credentials :  true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '/assets')));
app.use(logger('dev'));

app.use('/', homeRouter);
// app.use( '/api', apiRouter );
app.use( '/api1', api1Router );
app.use('/home', homeRouter);
app.use('/errorpage', errorpageRouter);
app.use('/pulsaproduct', pulsaproductRouter);
app.use('/pulsacheckout', pulsacheckoutRouter);

//app.use('/users', usersRouter);
//app.use('/test', testRouter);
//app.use('/testsession',testsessionRouter);
//app.use('/pulsa', pulsaRouter);

app.use('/loginses', loginsesRouter);

app.use( '/newdesigns', newDesigns );
app.use( '/riwayat', riwayat );
app.use( '/topup', topup );
app.use( '/buycreditpulsa', buyCreditpulsa );
app.use( '/buycreditpaketdata', buyCreditpaketdata );
app.use( '/buycredittokenlistrik', buyCredittokenlistrik );
app.use( '/buycreditetoll', buyCreditetoll );
app.use( '/buycreditgame', buyCreditgame);
app.use( '/buycreditsms', buyCreditsms );
app.use( '/buycredittelepon', buyCredittelepon );
app.use( '/buycreditesaldo', buyCreditesaldo );
app.use( '/buycreditwifiid', buyCreditwifiid );
app.use( '/tagihanlistrik', tagihanlistrik );
app.use( '/tagihanbpjs', tagihanbpjs );
app.use( '/tagihantelkom', tagihantelkom );
app.use( '/tagihanpgn', tagihanpgn );
app.use( '/tagihanpascabayar', tagihanpascabayar );
app.use( '/tagihantvkabel', tagihantvkabel );
app.use( '/tagihanpdam', tagihanpdam );
app.use( '/tagihanfinance', tagihanfinance );
app.use( '/tagihankartukredit', tagihankartukredit );

// Catch all other routes and return the index file
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/otu-view/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// process.title = app;
module.exports = app;