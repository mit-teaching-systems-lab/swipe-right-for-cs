const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');


function tellSlack(webhookUrl, text) {
  console.log('Slack: ', text);
  fetch(webhookUrl, {
    method: 'post',
    body: JSON.stringify({
      username: "robo-coach",
      icon_emoji: ":robot_face:", // eslint-disable-line camelcase
      text: text
    })
  })
    .catch((err) => console.log('Error.', err))
    .then(() => console.log('Done.'));
}


// config
const config = {
  port: process.env.PORT || 4000,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
};

// middleware
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

// API endpoints
app.get('/api/hello', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({ message: 'Hello from the server!' });
});
app.post('/api/log', (req, res) => {
  const {slackWebhookUrl} = config;
  if (slackWebhookUrl) {
    console.log(req.body);
    const text = JSON.stringify(req.body);
    tellSlack(slackWebhookUrl, text);
  }
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
});

// Serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});