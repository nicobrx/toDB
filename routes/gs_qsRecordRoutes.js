module.exports = function(router){
    var Gs_qs     = require('../models/gs_qs');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/qs')
        .post(function(req, res) {
            Gs_qs.create(req.body, function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records inserted' });
            });

        })
        .get(function(req, res) {
            Gs_qs.find(function(err, gs_qsRecords) {
                if (err) {res.send(err); return}
                res.json(gs_qsRecords);
            });
        });
}
