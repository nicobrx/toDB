/**
 * Created by nicobrooks on 10/26/15.
 */
module.exports = {
    dbURL : (process.env.MONGOLAB_URI || 'mongodb://localhost/to'),
    toAPIURL : (process.env.TOAPI_URI || 'http://localhost:3000')

};