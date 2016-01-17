/**
 * Created by nicobrooks on 10/24/15.
 */
exports.getCallRailData = function(startDate,endDate) {
    var Client = require('node-rest-client').Client;
    var Gs_mapping = require('../models/gs_mapping');
    var env = require('../config/env');

    var getCallsAndPost = function(){
        getCompanyIDs();
    }

    //get company ids from mongo
    var getCompanyIDs = function () {
        Gs_mapping.find({ 'callrailCompanyId' : {$exists : true, $ne : null}},
            'callrailCompanyId',function (err, gs_mappings) {
            if (err) {
                console.log(err);
                return
            }
            parseCompanyIDs(gs_mappings);
        });
    }

    //parse the list of company IDs and call callRailAPI
    var parseCompanyIDs = function (companyIDs) {
        for (var i = 0, x = companyIDs.length; i < x; i++) {
            var ID = companyIDs[i].callrailCompanyId;
            callRailAPI(ID,startDate,endDate);
        }
    }

    //get calls from Callrail
    var callRailAPI = function (company_id, start_date, end_date) {
        var client = new Client();
        var pageCount = 1;
        var page = 1;
        while (page <= pageCount) {
            var args = {
                parameters: {page: page,company_id: company_id, start_date: start_date, end_date: end_date}, // query parameter substitution vars
                headers: {"Authorization": 'Token token="af4b3af27b73a1067aa11ceb49575b3d"'} // request headers
            };
            client.get("https://api.callrail.com/v1/calls.json", args,
                function (data, response) {
                    // parsed response body as js object
                    data = JSON.parse(data.toString());
                    pageCount = (page = 1) ? data.total_pages : pageCount;
                    summarizeData(data,start_date,end_date);
                }).on('error', function (err) {
                console.log('something went wrong on the request', err.request.options);
            });
            // handling client error events
            client.on('error', function (err) {
                console.error('Something went wrong on the client', err);
            });
            page++;
        }
    };
    //summarize data from callrail API
    var summarizeData = function(data,start_date,end_date){
        var sumData = {}; // collection object to aggregate calls
        var arSumData = [];
        if (data.hasOwnProperty('calls')) {
            for (var i = 0, x = data.calls.length; i < x; i++) {
                var call = data.calls[i];
                var id = call.company_id;
                var s_type = call.source_type;
                var s_name = call.source_name;
                sumData[id] = sumData[id] || {};
                sumData[id][s_type] = sumData[id][s_type] || {};
                sumData[id][s_type][s_name] = sumData[id][s_type][s_name] || {};
                sumData[id][s_type][s_name]['calls'] = 1 + sumData[id][s_type][s_name]['calls'] || 1;
            }
        }
        for (a in sumData){
            for (b in sumData[a]){
                for (c in sumData[a][b]){
                    arSumData.push({'company_id':Number(a),'source_type':b,
                    'source_name':c,'calls':sumData[a][b][c]['calls'],
                    'startDate': new Date(start_date),'endDate': new Date(end_date)})
                }
            }
        }
        postToAPI(arSumData)
    }
    //post
    var postToAPI = function(payload){
        var client = new Client();
        var URL = env.toAPIURL + "/api/gs/calls";
        var args = {
            data: payload,
            headers:{"Content-Type": "application/json"}
        };
        client.post(URL, args,
            function (data, response) {
                console.log(data.toString());
            }).on('error', function (err) {
            console.log('something went wrong on the request', err.request.options);
        });
        // handling client error events
        client.on('error', function (err) {
            console.error('Something went wrong on the client', err);
        });
        console.log(JSON.stringify(payload));
    }
    getCallsAndPost();
}

/*
 company_id: String,
 source_name: String,
 source_type: String,
 calls: Number,
 startDate  : Date,
 endDate    : Date
 */
