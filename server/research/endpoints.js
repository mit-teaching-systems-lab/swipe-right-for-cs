// For getting all interactions blindly
function interactionsEndpoint(pool, req, res) {
  // TODO
  // 1. Query for all `interactions` from database table
  // 2. Return them with status code 200 as json
  res.status(405);
  res.end();
}

module.exports = {
  interactionsEndpoint
};
