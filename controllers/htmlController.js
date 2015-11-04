/**
 * Created by nicobrooks on 10/24/15.
 */
module.exports = function(app){
    var jade = require('jade');
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    app.get('/',function(req,res){
        var html = jade.renderFile('./views/index.jade');
        res.send(html);
    });

}