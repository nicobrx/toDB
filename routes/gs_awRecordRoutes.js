module.exports = function(router){
    var Gs_aw     = require('../models/gs_aw');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/aw')
        .post(function(req, res) {
            Gs_aw.create(req.body, function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records inserted' });
            });

        })
        .get(function(req, res) {
            Gs_aw.find(function(err, gs_awRecords) {
                if (err) {res.send(err); return}
                res.json(gs_awRecords);
            });
        });
}
