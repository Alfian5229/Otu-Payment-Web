var express = require("express");
var app = express();
var async = require("async");
var fetch = require("node-fetch");
var fs = require("fs");
var request = require("request");
 
var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

//var dev = process.env.NODE_ENV !== 'production';
//var server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

app.set(8899, process.env.PORT || 8899);

function square(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Math.pow(x, 2),2000);
		})
	})
}

async function layer(x,rs){
	const value = await square(x);
	rs(value);
}

async function apiproduct(x,rs){
	var options = {
			method: 'POST',
			url: 'https://api.eklanku.com/topup/product',
			headers: { 
				'postman-token': '273393e4-57d1-f8b3-3fa4-713520c133e0',
			 'cache-control': 'no-cache',
			 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		  formData: { 
				userID: 'EKL0078459',
			 accessToken: '2b7f32e049b3813e54c094f5d4b59d06',
			 aplUse: 'OTUIOS',
			 provider: 'XL' } };
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			rs(body);
		});
}

app.get('/', function(req, res, cb){
	/*
	layer('11', function(rs) {
		var hasil = JSON.parse(rs);
		res.write('<p>'+hasil+'</p>');
		res.end('END');
	})
	/*/
	///*
	apiproduct('31', function(rs) {
		var hasil = JSON.parse(rs);
		res.write('<p>'+hasil+'</p>');
		res.end('END');
	})
	//*/
});

app.listen(8899);