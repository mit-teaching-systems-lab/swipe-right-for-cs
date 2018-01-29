const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const {
  enforceHTTPS,
  onlyAllowResearchers,
  loginEndpoint,
  emailLinkEndpoint
} = require('./authentication.js');
const {
  logEndpoint,
  peerResponsesEndpoint,
  emailMyResponsesEndpoint
} = require('./game/endpoints.js');
const {interactionsEndpoint} = require('./research/endpoints.js');
const {createPool} = require('./util/database.js');


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
app.use(enforceHTTPS);
const pool = createPool(config.postgresUrl);

// As a precaution for emailing and authentication routes
const limiter = new RateLimit({
  windowMs: 60*60*1000, // 60 minutes
  max: 100, // limit each IP to n requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  onLimitReached: (req, res, options) => {
    console.log('RateLimit reached!');
  }
});


// Endpoints for the game
app.post('/api/log', logEndpoint.bind(null, pool));
app.get('/api/peers/:workshopCode', peerResponsesEndpoint.bind(null, pool));
app.post('/api/share', limiter, emailMyResponsesEndpoint.bind(null, config.mailgunEnv));

// Endpoints for researcher login
app.post('/api/research/login', limiter, loginEndpoint.bind(null, pool, config.mailgunEnv));
app.post('/api/research/email', limiter, emailLinkEndpoint.bind(null, pool));

// Endpoints for authenticated researchers to access data
app.get('/api/research/interactions', [limiter, onlyAllowResearchers.bind(null, pool)], interactionsEndpoint.bind(null, pool));


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