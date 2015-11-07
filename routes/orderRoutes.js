/**
 * Created by nicobrooks on 11/3/15.
 * Routes for /api/orders are defined here
 */

module.exports = function(router){
    var mongoose = require('mongoose');
    var Order     = require('../models/order');

    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/orders')

        // create a order (accessed at POST http://localhost:8080/api/orders)
        .post(function(req, res) {

            var order = new Order();      // create a new instance of the Order model
            order.order_id = req.body.order_id;  // set the order ID (comes from the request)
            order.owner = req.body.owner;
            order.advertiser = req.body.advertiser;
            order.order = req.body.order;
            order.service = req.body.service;
            order.startDate = req.body.startDate;
            order.endDate = req.body.endDate;
            order.mediaBudget = req.body.mediaBudget;
            order.toFee = req.body.toFee;
            order.billedToClient = req.body.billedToClient;

            // save the order and check for errors
            order.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'order created!' });
            });

        })
        // get all the orders (accessed at GET http://localhost:8080/api/orders)
        .get(function(req, res) {
            Order.find(function(err, orders) {
                if (err)
                    res.send(err);

                res.json(orders);
            });
        });
    // on routes that end in /orders/:order_id
// ----------------------------------------------------
    router.route('/orders/:order_id')

        // get the order with that id (accessed at GET http://localhost:8080/api/orders/:order_id)
        .get(function(req, res) {
            Order.find({order_id : req.params.order_id}, function(err, order) {
                if (err)
                    res.send(err);
                res.json(order);
            });
        })
        // update the order with this id (accessed at PUT http://localhost:8080/api/orders/:order_id)
        .put(function(req, res) {

            // use our order model to find the order we want
            Order.findOneAndUpdate({'order_id' : req.params.order_id},
                {'order_id' : req.params.order_id, 'owner' : req.body.owner},
                {upsert : true}, function(err, order) {
                console.log(req.params.order_id);
                if (err)
                    res.send(err);

                    res.json({ message: 'order updated!' });
            });
        })
        .delete(function(req, res) {
            Order.remove({
                order_id : req.params.order_id
            }, function(err, order) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });
}

/*
 var OrderSchema = mongoose.Schema({
 order_id : Number,
 owner    : String,
 advertiser : String,
 order      : String,
 service    : String,
 startDate  : Date,
 endDate    : Date,
 mediaBudget : Number,
 toFee       : Number,
 billedToClient : Number
 });
 */