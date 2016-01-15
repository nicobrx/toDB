module.exports = function(router){
    var Gs_mapping     = require('../models/gs_mapping');


    // on routes that end in /orders
// ----------------------------------------------------
    router.route('/gs/mappings')
        .post(function(req, res) {
            /*
            Gs_mapping.create(req.body, function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records inserted' });
            });
            */
            var bulk = Gs_mapping.collection.initializeOrderedBulkOp();
            var body = req.body;
            for (var i = 0,x = body.length;i<x;i++){
                var query = {property : body[i].property};
                bulk.find(query).upsert().updateOne(body[i]);
            }
            bulk.execute(function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records updated' });
            });
        })
        .get(function(req, res) {
            Gs_mapping.find(function(err, gs_mappings) {
                if (err) {res.send(err); return}
                res.json(gs_mappings);
            });
        });
}


