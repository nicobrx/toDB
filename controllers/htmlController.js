/**
 * Created by nicobrooks on 10/24/15.
 */
module.exports = function(app){
    var jade = require('jade');
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var callrail = require("./callrailController");
    app.get('/',function(req,res){
        var html = jade.renderFile('./views/index.jade');
        res.send(html);
    });
    app.get('/callrail',function(req,res){
        var html = jade.renderFile('./views/callrail.jade');
        res.send(html);
    });
    app.post('/callrail',function(req,res){
        var fn = jade.compileFile('./views/callrail.jade');
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var html = fn(callrail.getCallRailData(startDate,endDate));
        res.send(html);
    });

}