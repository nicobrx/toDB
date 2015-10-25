var express = require('express');
var bodyParser = require('body-parser');
var htmlController = require('./controllers/htmlController');
var mysql = require('mysql');
var app = express();
var port = process.env.PORT || 3000;

var jsonParser = bodyParser.json();

app.use('/assets',express.static(__dirname + '/public'));
app.set('view engine','ejs');

htmlController(app);

app.post('/personjson', jsonParser, function(req,res){
    res.send('Received');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.get('/api',function(req,res){
    res.json({firstname:"John"});
});

app.listen(port);


