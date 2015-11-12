module.exports = function(router){
    var Gs_mapping     = require('../models/gs_mapping');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/mappings')
        .post(function(req, res) {
            Gs_mapping.create(req.body, function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records inserted' });
            });

        })
        .get(function(req, res) {
            Gs_mapping.find(function(err, gs_mappings) {
                if (err) {res.send(err); return}
                res.json(gs_mappings);
            });
        });
}
