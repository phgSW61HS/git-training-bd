'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var request = require("request");
var logger = require('morgan');

var app = express();



/*
* Server definition
* */
const PORT = 7777;
const HOST = '0.0.0.0';
app.use(bodyParser.json());
app.use(logger("combined"));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
/*
monitor(function (event) {
      console.log('Log event: ', event);
});
*/


/*
* Route definition
* */

app.get('/', function(req, res) {

    res.send('This is the root local dev from ms hello')
});

app.get('/sayHelloToSomeone', function(req, res) {

    var msg={personToSayHello: req.query.personToSalute}
    res.send(msg);
});