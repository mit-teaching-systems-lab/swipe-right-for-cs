const {Client} = require('pg');
const {createPool} = require('../server/util/database.js');

// This script can be used to grab a snapshot of the database and
// print it in a JSON format that can be used for offline analysis.
//
// Example usage:
//   DATABASE_URL=foo NODE_ENV=development node scripts/clone.js
//   or you can run in through Heroku and dump to local disk

// Output json in the format {[tableName]: [row]}
function clone(tableNames) {
  const postgresUrl = (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true';
  
  const {escapeIdentifier} = new Client();
  const pool = createPool(postgresUrl);
  const tables = Promise.all(tableNames.map(tableName => {
    const identifier = escapeIdentifier(tableName);
    const sql = `SELECT * FROM ${identifier} ORDER BY id;`;
    return pool.query(sql).then(response => {
      const {rows} = response;
      return {tableName, rows};
    });
  }));

  tables
    .catch(err => {
      console.log('---- error ----');
      console.log(err);
      process.exit(1); // eslint-disable-line no-process-exit
    })
    .then(results => {
      const output = results.reduce((map, result) => {
        const {tableName, rows} = result;
        map[tableName] = rows;
        return map;
      }, {});
      console.log(JSON.stringify(output));
      process.exit(0);  // eslint-disable-line no-process-exit
    });
}

clone([
  'interactions'
]);