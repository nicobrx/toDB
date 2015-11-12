/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');

//'account','campaignName','clicks','impressions','ctr','avgPosition','cost'
var Gs_awSchema = mongoose.Schema({
    account: String,
    campaignName: String,
    clicks: Number,
    impressions: Number,
    ctr: Number,
    avgPosition: Number,
    cost: Number,
    startDate  : Date,
    endDate    : Date
}).index({ account: 1, campaignName: 1, startDate: 1, endDate: 1 }, { unique: true });;

module.exports = mongoose.model('Gs_awRecord', Gs_awSchema);