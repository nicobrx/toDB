module.exports = function(router){
    var mongoose = require('mongoose');
    var Gs_ga     = require('../models/gs_ga');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/ga')
        .post(function(req, res) {
            console.log(req.body);
            Gs_ga.create(req.body, function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'records inserted' });
            });

        })
        .get(function(req, res) {
            Gs_ga.find(function(err, gs_gaRecords) {
                if (err)
                    res.send(err);

                res.json(gs_gaRecords);
            });
        });
}

/*
 var gs_ga = new Gs_ga();      // create a new instance of the Order model
 gs_ga.gaProfile = gs_ga.gaProfile,
 gs_ga.source = gs_ga.source,
 gs_ga.medium = gs_ga.medium,
 gs_ga.sessions = gs_ga.sessions,
 gs_ga.bounceRate = gs_ga.bounceRate,
 gs_ga.tos = gs_ga.tos,
 gs_ga.pvs = gs_ga.pvs,
 gs_ga.goalCompletions = gs_ga.goalCompletions,
 gs_ga.goal1 = req.body.goal1,
 gs_ga.goal2 = Number,
 gs_ga.goal3 = Number,
 gs_ga.goal4 = Number,
 gs_ga.goal5 = Number,
 gs_ga.goal6 = Number,
 gs_ga.goal7 = Number,
 gs_ga.goal8 = Number,
 gs_ga.goal9 = Number,
 gs_ga.goal10 = Number,
 gs_ga.goal11 = Number,
 gs_ga.goal12 = Number,
 gs_ga.goal13 = Number,
 gs_ga.goal14 = Number,
 gs_ga.goal15 = Number,
 gs_ga.goal16 = Number,
 gs_ga.goal17 = Number,
 gs_ga.goal18 = Number,
 gs_ga.goal19 = Number,
 gs_ga.goal20 = Number,
 gs_ga.startDate   = Date,
 gs_ga.endDate     = Date
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
 */