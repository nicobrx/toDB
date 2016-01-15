/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');

var Gs_mappingSchema = mongoose.Schema({
    property: String,
    active: Boolean,
    semCampaigns: Array,
    rmCampaigns: Array,
    gaProfile: String,
    gaFormGoals: Array,
    callrailCompanyId: Number
}).index({ property: 1}, { unique: true });

module.exports = mongoose.model('Gs_mapping', Gs_mappingSchema);