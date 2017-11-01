// For getting all interactions
function interactionsEndpoint(pool, req, res) {
  // query!!!
  const sql = `
    SELECT
      id,
      interaction,
      timestampz,
      session
        
    FROM interactions`;


  const promise = pool.query(sql);
  promise.then(results => {
    res.status(200);
    res.json({rows: results.rows});
    res.end();
  });
}

module.exports = {
  interactionsEndpoint
};
