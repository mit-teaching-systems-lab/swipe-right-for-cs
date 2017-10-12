const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4000;
const app = express();


// API endpoints
app.get('/api/hello', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({ message: 'Hello from the server!' });
});

// Serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Enforce HTTPS
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }

  return next();
}
app.use(enforceHTTPS);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});