/**
 * Created by nicobrooks on 11/3/15.
 */
var mongoose     = require('mongoose');

var Gs_gaSchema = mongoose.Schema({
    gaProfile: String,
    source: String,
    medium: String,
    sessions: Number,
    bounceRate: Number,
    tos: Number,
    pvs: Number,
    goalCompletions: Number,
    goal1: Number,
    goal2: Number,
    goal3: Number,
    goal4: Number,
    goal5: Number,
    goal6: Number,
    goal7: Number,
    goal8: Number,
    goal9: Number,
    goal10: Number,
    goal11: Number,
    goal12: Number,
    goal13: Number,
    goal14: Number,
    goal15: Number,
    goal16: Number,
    goal17: Number,
    goal18: Number,
    goal19: Number,
    goal20: Number,
    startDate  : Date,
    endDate    : Date
}).index({ gaProfile: 1, startDate: 1, endDate: 1 }, { unique: true });

module.exports = mongoose.model('Gs_gaRecord', Gs_gaSchema);