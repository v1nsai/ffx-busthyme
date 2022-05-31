// import express from 'express'

function startProxy() {
    // const app = express();
    // const port = 8080;
    
    // // app.get('/', (req, res) => res.send('Hello World!'));
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     next();
    //   });
    // app.listen(port, () => console.log(`http://localhost:${port}`));



    // Test the express server
    // app.get("/", (req, res) => {
    //     // read query parameters
    //     const symbol = req.query["symbol"];
    //     const range = req.query["range"];
      
    //     // craft IEX API URL
    //     const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=quote,chart&range=${range}`;
      
    //     // make request to IEX API and forward response
    //     request(url).pipe(res);
    //   });








    // cors-anywhere

    // // Listen on a specific host via the HOST environment variable
    // var host = '0.0.0.0';
    // // Listen on a specific port via the PORT environment variable
    // var port = 8080;

    // var cors_proxy = require('cors-anywhere');
    // cors_proxy.createServer({
    //     originWhitelist: [], // Allow all origins
    //     requireHeader: ['origin', 'x-requested-with'],
    //     removeHeaders: ['cookie', 'cookie2']
    // }).listen(port, host, function () {
    //     console.log('Running CORS Anywhere on ' + host + ':' + port);
    // });






    // var express = require('express'),
    // request = require('request'),
    // bodyParser = require('body-parser'),
    // app = express();

    // var myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
    // console.log('Using limit: ', myLimit);

    // app.use(bodyParser.json({limit: myLimit}));

    // app.all('*', function (req, res, next) {

    // // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    // res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    // if (req.method === 'OPTIONS') {
    //     // CORS Preflight
    //     res.send();
    // } else {
    //     var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
    //     if (!targetURL) {
    //         res.send(500, { error: 'There is no Target-Endpoint header in the request' });
    //         return;
    //     }
    //     request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
    //         function (error, response, body) {
    //             if (error) {
    //                 console.error('error: ' + response.statusCode)
    //             }
    //         }).pipe(res);
    // }});

    // app.set('port', 1355);

    // app.listen(app.get('port'), function () {
    // console.log('Proxy server listening on port ' + app.get('port'));
    // });    
}

export default startProxy;