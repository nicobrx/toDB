/**
 * Created by nicobrooks on 10/24/15.
 */
module.exports = function(app){
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    app.get('/',function(req,res){
        res.render('index');
    });

    app.get('/person/:id', function(req,res){
        res.render('person',{ID:req.params.id});
    });


    app.post('/person', urlencodedParser, function(req,res){
        res.send('Received');
        console.log(req.body.firstname);
        console.log(req.body.lastname);
    });
}