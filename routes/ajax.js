var request = require("request");

var options = { method: 'POST',
  url: 'https://api.eklanku.com/developapi/Member/login',
  headers: 
   { 'postman-token': 'd82f2e0f-fb09-0c88-edef-04b1f35cec80',
     'cache-control': 'no-cache',
     'x-api-key': '222',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData: 
   { userID: '+6285692178890',
     token: '2019-01-18T00:35:24',
     securityCode: '97a233643fa4beaafd5892ea61f830d7',
     passwd: '121121112' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
});