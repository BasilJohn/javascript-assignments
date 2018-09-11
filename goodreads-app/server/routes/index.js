const goodReadsRoutes = require('./goodreads_routes');
module.exports = function (app, db) {
    goodReadsRoutes(app, db);
};