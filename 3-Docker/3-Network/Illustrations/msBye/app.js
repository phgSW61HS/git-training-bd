'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var logger = require('morgan');




/*
* Server definition
* */
const PORT = 9999;
const HOST = '0.0.0.0';
app.use(bodyParser.json());
app.use(logger("combined"));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/*
* Route definition
* */

app.get('/', function(req, res) {
    console.log("This is the root of ms bye - local dev")
    res.send('This is the root of ms bye - local dev')
});

app.get('/sayByeToSomeone', function(req, res) {

    var msg={personToSayBye: req.query.personToSalute}
    res.send(msg);
});

