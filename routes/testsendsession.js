var request = require('request');

request.post(
    'localhost/testsession',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
        }
    }
);