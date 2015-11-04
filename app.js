var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var htmlController = require('./controllers/htmlController');
var apiController = require("./controllers/apiController");
var app = express();
var port = process.env.PORT || 3000;


// alias http://.../assets to /public
app.use('/assets',express.static(__dirname + '/public'));
// configure app to use bodyParser()
// this lets us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// static html routes are handled here:
htmlController(app);
// api routes are handled here
apiController(app);


app.use(function(req, res, next){
    res.status(404);
    res.json({ error: 'Invalid URL' });
});

app.listen(port);
console.log('Server started on port ' + port);


