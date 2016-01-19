module.exports = function(router){
    var Gs_aw     = require('../models/gs_aw');

// ----------------------------------------------------
    router.route('/gs/aw')
        .post(function(req, res) {
            var bulk = Gs_aw.collection.initializeOrderedBulkOp();
            var body = req.body;
            for (var i = 0,x = body.length;i<x;i++){
                var query = {account : body[i].account,campaignName : body[i].campaignName,
                    startDate : new Date(body[i].startDate) , endDate : new Date(body[i].endDate)};
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
            Gs_aw.find(function(err, gs_awRecords) {
                if (err) {res.send(err); return}
                res.json(gs_awRecords);
            });
        });
}
