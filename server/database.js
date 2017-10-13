const pg = require('pg');

// For querying the database
module.exports = function queryDatabase(connectionUrl, text, values, cb) {
  pg.connect(connectionUrl, function(err, client, done) {
    if (err) {
      throw new Error('pg.connect failed: ' + JSON.stringify({connectionUrl, err}, null, 2));
    }
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
}

