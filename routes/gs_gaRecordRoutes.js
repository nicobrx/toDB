module.exports = function(router){
    var Gs_ga     = require('../models/gs_ga');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/ga')
        .post(function(req, res) {
            Gs_ga.create(req.body, function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records inserted' });
            });

        })
        .get(function(req, res) {
            Gs_ga.find(function(err, gs_gaRecords) {
                if (err) {res.send(err); return}
                res.json(gs_gaRecords);
            });
        });
}
