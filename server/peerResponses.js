const __groupBy = require('lodash/groupBy');
const {InteractionTypes} = require('../client/src/shared/data.js');

// Returns a Promise of:
// [{profileName, argumentText, percentageRight}]
function queryForGroupedResponses(pool, workshopCode) {
  const sql = `
    SELECT
      interaction->'turn'->>'profileName' as profile_name,
      interaction->'turn'->>'argumentText' as argument_text,
      interaction->>'type' as type
    FROM interactions
    WHERE 1=1
      AND session->>'workshopCode' = $3
      AND interaction->>'type' IN ($1, $2)
    ;`;
  const values = [
    InteractionTypes.SWIPE_RIGHT,
    InteractionTypes.SWIPE_LEFT,
    workshopCode
  ];

  return pool.query(sql, values)
    .then(results => groupPeerResponses(results.rows));
}

// Group all swipe right and swipe left interactions
// into an aggregate:
// [{profileName, argumentText, percentageRight}]
function groupPeerResponses(rows) {
  // Group by (profile, argument)
  const byTuple = __groupBy(rows, row => {
    const profileName = row['profile_name'];
    const argumentText = row['argument_text'];
    return JSON.stringify({profileName, argumentText});
  });

  // Count left, right for each grouping
  return Object.keys(byTuple).map(key => {
    const keyRows = byTuple[key];
    const byType = __groupBy(keyRows, 'type');
    const swipesRight = byType[InteractionTypes.SWIPE_RIGHT] || [];
    const percentageRight = Math.floor(100 * swipesRight.length / keyRows.length);
    const {profileName, argumentText} = JSON.parse(key);
    return {profileName, argumentText, percentageRight};
  });
}

module.exports = {
  queryForGroupedResponses,
  groupPeerResponses
};