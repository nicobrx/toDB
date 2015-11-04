/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema = mongoose.Schema({
    order_id : Number,
    owner    : String,
    advertiser : String,
    order      : String,
    service    : String,
    startDate  : Date,
    endDate    : Date,
    mediaBudget : Number,
    toFee       : Number,
    billedToClient : Number
});

module.exports = mongoose.model('Order', OrderSchema);