// For getting all interactions
function interactionsEndpoint(pool, req, res) {
  const sql = `SELECT * FROM interactions`;

  pool.query(sql)
    .then(results => {
      console.log(results.rows);
      res.status(200).end();
    });
}

module.exports = {
  interactionsEndpoint
};
