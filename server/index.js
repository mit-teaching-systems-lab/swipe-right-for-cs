const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {maybeSendConsentEmail} = require('./mailer.js');
const {createPool} = require('./database.js');

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