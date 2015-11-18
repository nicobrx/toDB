/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');

var Gs_qsSchema = mongoose.Schema({
    account: String,
    qs: Number,
    startDate  : Date,
    endDate    : Date
}).index({ account: 1, startDate: 1, endDate: 1 }, { unique: true });;

module.exports = mongoose.model('Gs_qsRecord', Gs_qsSchema);