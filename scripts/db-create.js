const {Pool} = require('pg');

function makeCreateQuery(dbName) {
  if (dbName === 'swipe-right-db') return 'CREATE DATABASE "swipe-right-db";';
  if (dbName === 'swipe-right-db-test') return 'CREATE DATABASE "swipe-right-db-test";';
  throw new Error('unexpected database name: ', dbName);
}

function createDatabase(databaseName) {
  const pool = new Pool();
  const sql = makeCreateQuery(databaseName);
  console.log(`Creating database ${databaseName}...`);
  return pool.query(sql);
}

function createTables(database) {
  const pool = new Pool({database});
  const sql = `
    CREATE TABLE interactions (
      id serial primary key,
      interaction jsonb,
      session jsonb,
      timestampz timestamptz
    );
    CREATE TABLE links (
      id serial primary key,
      email text,
      link text,
      timestampz timestamptz
    );
    CREATE TABLE whitelist (
      id serial primary key,
      email text
    );`;
  console.log(`Creating tables...`);
  return pool.query(sql);
}


// Create a new database for test or development mode, and 
// create the tables for the database.
//
// Usage:
// yarn db-create-test swipe-right-db-test
// yarn db-create-test swipe-right-db
const databaseName = process.argv[2];
createDatabase(databaseName)
  .then(results => createTables(databaseName))
  .then(results => {
    console.log('Done.');
    process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1); // eslint-disable-line no-process-exit
  });

