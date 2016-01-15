/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');

var Gs_callSchema = mongoose.Schema({
    company_id: String,
    source_name: String,
    source_type: String,
    calls: Number,
    startDate  : Date,
    endDate    : Date
}).index({ company_id: 1, source_name: 1,  source_type: 1,startDate: 1, endDate: 1 }, { unique: true });

module.exports = mongoose.model('Gs_call', Gs_callSchema);