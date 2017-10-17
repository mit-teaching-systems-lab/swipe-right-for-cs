const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const {maybeSendConsentEmail, sendResponsesEmail} = require('./emails.js');
const {createPool} = require('./database.js');
const {InteractionTypes} = require('../client/src/shared/data.js');


// config
const config = {
  port: process.env.PORT || 4000,
  mailgunEnv: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
  },
  postgresUrl: (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true'
};

// Create server with middleware, connect to database
const app = express();
app.use(bodyParser.json());
app.use(function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }
  return next();
});
const pool = createPool(config.postgresUrl);

// As a precaution for emailing routes
const limiter = new RateLimit({
  windowMs: 60*60*1000, // 60 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  onLimitReached: (req, res, options) => {
    console.log('RateLimit reached!');
  }
});

// API endpoints
// For receiving log data from the client
app.post('/api/log', (req, res) => {
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
  maybeSendConsentEmail(log, config.mailgunEnv);

  // Return success no matter what
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
});

// For receiving anonymized responses of peers within
// the same workshop.
app.get('/api/peers/:workshopCode', limiter, (req, res) => {
  const {workshopCode} = req.params;

  // Aggregate query, returning:
  // [{profile_name, argument_text, percentage_right}]
  const sql = `
    SELECT
      profile_name,
      argument_text,
      CAST(100.0 * count_by_type / total as int) as percentage_right
    FROM (
      SELECT
        interaction->'turn'->>'profileName' as profile_name,
        interaction->'turn'->>'argumentText' as argument_text,
        interaction->>'type' as type,
        COUNT(*) OVER (PARTITION BY
          interaction->'turn'->>'profileName',
          interaction->'turn'->>'argumentText'
        ) as total,
        COUNT(*) OVER (PARTITION BY
          interaction->'turn'->>'profileName',
          interaction->'turn'->>'argumentText',
          interaction->>'type'
        ) as count_by_type
      FROM interactions
      WHERE 1=1
        AND session->>'workshopCode' = $3
        AND interaction->>'type' IN ($1, $2)
    ) as swipes
    WHERE
      type = $1
    ;`;
  const values = [
    InteractionTypes.SWIPE_RIGHT,
    InteractionTypes.SWIPE_LEFT,
    workshopCode
  ];

  res.set('Content-Type', 'application/json');
  pool.query(sql, values)
    .catch(err => {
      console.log('query returned err: ', err);
      res.json({ status: 'error' });
    })
    .then(results => {
      res.json({
        status: 'ok',
        rows: results.rows
      });
    });
});

app.post('/api/share', limiter, (req, res) => {
  const {moves, email} = req.body;

  // Send email with responses
  sendResponsesEmail(email, moves, config.mailgunEnv);

  // Return success no matter what
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
});


// Serve any static files.
// Route other requests return the React app, so it can handle routing.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});