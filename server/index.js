const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {maybeSendConsentEmail} = require('./mailer.js');
const {tellSlack} = require('./slack.js');

// config
const config = {
  port: process.env.PORT || 4000,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  mailgunEnv: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
  }
};

// Create server with middleware
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

app.use(bodyParser.json());

// Endpoints
app.get('/api/hello', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({ message: 'Hello from the server!' });
});

// For receiving log data from the client
app.post('/api/log', (req, res) => {
  const log = req.body;

  // Log to Slack
  const {slackWebhookUrl} = config;
  if (slackWebhookUrl) {
    const text = JSON.stringify(log);
    tellSlack(slackWebhookUrl, text);
  }

  // Check for sending consent emails
  maybeSendConsentEmail(log, config.mailgunEnv);

  // Return success
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