const pg = require('pg');
const {Client} = require('pg')
const {createPool} = require('../server/database.js');

// This script can be used to grab a snapshot of the database and
// print it in a JSON format that can be used for offline analysis.
//
// Example usage:
//   heroku run NODE_ENV=production node scripts/clone.js

// Output json in the format {[tableName]: [row]}
function clone(tableNames) {
  const postgresUrl = (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true'
  
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
      process.exit(1);
    })
    .then(results => {
      const output = results.reduce((map, result) => {
        const {tableName, rows} = result;
        map[tableName] = rows;
        return map;
      }, {});
      console.log(JSON.stringify(output));
      process.exit(0);
    });
}

clone([
  'interactions'
]);