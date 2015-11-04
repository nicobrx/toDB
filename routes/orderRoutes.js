/**
 * Created by nicobrooks on 11/3/15.
 */

module.exports = function(router){
    var mongoose = require('mongoose');
    var Order     = require('../models/order');
    var db = require('../config/db');

    //connect to mongoose/DB
    mongoose.connect(db.url);
    var toDB = mongoose.connection;
    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/orders')

        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function(req, res) {

            var order = new Order();      // create a new instance of the Order model
            order.order_id = req.body.order_id;  // set the order ID (comes from the request)

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

        // get the order with that id (accessed at GET http://localhost:8080/api/bears/:order_id)
        .get(function(req, res) {
            Order.find({order_id : req.params.order_id}, function(err, order) {
                if (err)
                    res.send(err);
                res.json(order);
            });
        })
        // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req, res) {

            // use our order model to find the order we want
            Order.findOneAndUpdate({order_id : req.params.order_id}, {owner : req.body.owner}, function(err, order) {
                console.log(req.params.order_id);
                if (err)
                    res.send(err);

                // save the order
                order.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'order updated!' });
                });

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
