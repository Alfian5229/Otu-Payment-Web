// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  /*
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });
  */
  
  var post_data = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"userID\"\r\n\r\n+6285692178890\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n2018-12-30T16:07:44\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"securityCode\"\r\n\r\n4f0f83c2d90a4b4846c2a38752d4ec32\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"passwd\"\r\n\r\n121121112\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

  // An object of options to indicate where to post to
  var post_options = {
      host: 'api.eklanku.com',
      port: '80',
      path: '/developapi/Member/login',
      method: 'POST',
      headers: {
		  'X-API-KEY': '222',
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

fs.readFile('ajax.js', 'utf-8', function (err, data) {
	if (err) {
		process.exit(-2);
	}
	if(data) {
		PostCode(data);
	}
	else {
		process.exit(-1);
	}
});