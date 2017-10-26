const {queryForGroupedResponses} = require('./peerResponses.js');
const {sendResponsesEmail} = require('./sendEmails.js');


// For receiving log data from the client
function logEndpoint(pool, req, res) {
  const log = req.body;

  // Write into database
  const sql = `INSERT INTO interactions(interaction, session, timestampz) VALUES ($1, $2, $3)`;
  const now = new Date();
  const values = [log.interaction, log.session, now];
  pool.query(sql, values).catch(err => {
    console.log('query returned err: ', err);
    console.log({ error:err });
  });

  // Check for sending consent emails
  // TODO(kr) this is disabled since we're removing emails
  // maybeSendConsentEmail(log, config.mailgunEnv);

  // Return success no matter what
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
}

// For receiving anonymized responses of peers within
// the same workshop.
// Returns: {status, rows}
// where rows: [{profileName, argumentText, percentageRight}]
function peerResponsesEndpoint(pool, req, res) {
  res.set('Content-Type', 'application/json');
  
  const {workshopCode} = req.params;
  queryForGroupedResponses(pool, workshopCode)
    .catch(err => {
      console.log('query returned err: ', err);
      res.json({ status: 'error' });
    })
    .then(aggregatedRows => {
      res.json({
        status: 'ok',
        rows: aggregatedRows
      });
    });
}

function emailMyResponsesEndpoint(mailgunEnv, req, res) {
  const {moves, email} = req.body;

  // Send email with responses
  sendResponsesEmail(email, moves, mailgunEnv);

  // Return success no matter what
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
}

module.exports = {
  logEndpoint,
  peerResponsesEndpoint,
  emailMyResponsesEndpoint
};
