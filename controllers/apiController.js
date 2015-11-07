/**
 * Created by nicobrooks on 10/26/15.
 */
module.exports = function(app) {
    var express = require('express');
    var orderRoutes = require('../routes/orderRoutes');
    var gs_gaRecordRoutes = require('../routes/gs_gaRecordRoutes');
    var db = require('../config/db');
    var mongoose = require('mongoose');
    var router = express.Router();


    //connect to mongoose/DB
    mongoose.connect(db.url, function(err){
        if (err) console.log('db connection failed');
        else { var toDB = mongoose.connection;
            console.log('connected to db')}
    });

    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router();              // get an instance of the express Router

    // sample middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Handling API request.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    //hand off to get routes for /orders
    orderRoutes(router);
    gs_gaRecordRoutes(router);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    app.use('/api', router);

}