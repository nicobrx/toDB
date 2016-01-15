module.exports = function(router){
    var Gs_calls     = require('../models/gs_calls');

// ----------------------------------------------------
    router.route('/gs/calls')
        .post(function(req, res) {
            var bulk = Gs_calls.collection.initializeOrderedBulkOp();
            var body = req.body;
            for (var i = 0,x = body.length;i<x;i++){
                var query = {company_id : body[i].company_id,source_name: body[i].source_name,
                    startDate : new Date(body[i].startDate), endDate : new Date(body[i].endDate)};
                body[i].startDate = new Date(body[i].startDate);
                body[i].endDate = new Date(body[i].endDate);
                bulk.find(query).upsert().updateOne({$set: body[i]});
            }
            bulk.execute(function(err) {
                if (err) {res.send(err); return}
                res.json({ message: 'records updated' });
            });
        })
        .get(function(req, res) {
            Gs_calls.find(function(err, gs_callRecords) {
                if (err) {res.send(err); return}
                res.json(gs_callRecords);
            });
        });
}
