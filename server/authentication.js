// Redirect to HTTPS
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }
  return next();
}

// Only allow folks who are authorized.  Call `next` if they are authorized,
// and return a 404 with no body if not.
function onlyAllowResearchers(request, response, next) {
  // TODO
  // 1. Read the token from the request header
  // 2. Check to see if the token header is in `tokens` database table and it's less than 24 hours old
  // 3. This code should run in both development and production.
  if (process.env.NODE_ENV === 'development') return next();
  response.status(404);
  response.end();
}


function loginEndpoint(req, res){
  // TODO:
  // 1. Check that the email is in the whitelist in the `researchers` database table
  // 2. Insert a new record to the `links` database table
  // 3. Send an email to the researcher with that link in it (generate email with Mustache template, send it with Mailgun)
  // 4. Return a 200 response
  res.status(405);
  res.end();
}

function emailLinkEndpoint(req, res){
  // TODO
  // 1. Read in query string parameter to get email link id
  // 2. Read the `links` database table to see if there is such a link and it's less than an hour old
  // 3. Insert a new token into the `tokens` database table
  // 4. Return a 200 response with {token} in a JSON response body.
  res.status(405);
  res.end();
}

module.exports = {
  enforceHTTPS,
  onlyAllowResearchers,
  loginEndpoint,
  emailLinkEndpoint
};