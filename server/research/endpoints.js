// For getting all interactions
function interactionsEndpoint(pool, req, res) {
  const sql = `SELECT * FROM interactions`;

  pool.query(sql)
    .then(results => {
      console.log(results.rows);
      console.log(JSON.parse(JSON.stringify(results.rows)));
      console.log('response ended');
      res.set('Content-Type', 'application/json');
      res.json(JSON.parse(JSON.stringify(results.rows)));
      return res.status(200).end();

    })
    .catch(err => {
      console.log({ error: err });
    });
}

module.exports = {
  interactionsEndpoint
};
