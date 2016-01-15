module.exports = function(router){
    var Gs_ga     = require('../models/gs_ga');

// ----------------------------------------------------
    router.route('/gs/ga')
        .post(function(req, res) {
            var bulk = Gs_ga.collection.initializeOrderedBulkOp();
            var body = req.body;
            for (var i = 0,x = body.length;i<x;i++){
                var query = {gaProfile : body[i].gaProfile,startDate : new Date(body[i].startDate),
                    endDate : new Date(body[i].endDate)};
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
            Gs_ga.find(function(err, gs_gaRecords) {
                if (err) {res.send(err); return}
                res.json(gs_gaRecords);
            });
        });
}
