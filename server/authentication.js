const path = require('path');
const uuid = require('uuid');
const qs = require('querystring');
const {sendEmail, renderEmail} = require('./util/email.js');

// Redirect to HTTPS
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }
  return next();
}

function getDomain(request) {
  return (process.env.NODE_ENV === 'development')
    ? 'http://localhost:3000'
    : `https://${request.headers.host}`;
}

function notifyResearcherAccessGranted(mailgunEnv, email) {
  notify(mailgunEnv, 'Researcher access granted', `Researcher access granted for: ${email}`);
}
function notifyResearcherAccessDenied(mailgunEnv, email) {
  notify(mailgunEnv, 'Researcher access denied', `Researcher access denied for: ${email}`);
}
function notifyLoginAttempt(mailgunEnv, email) {
  notify(mailgunEnv, 'Researcher login attempt', `Researcher login attempt by: ${email}`);
}

// Fire and forget sending the email
function notify(mailgunEnv, title, notificationText) {
  const toEmail = process.env.NOTIFY_EMAIL;
  if (!toEmail || !toEmail.length || toEmail.length === 0) return;

  const filename = path.join(__dirname, 'research/notification.html.mustache');
  const html = renderEmail(filename, {notificationText});
  const info = {
    toEmail,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: `Swipe Right Notification: ${title}`
  };
  sendEmail(mailgunEnv, info, html, function() {});
}

// Middleman function to confirm authorization token is valid
// Reads token from request header and checks against tokens in db.
// Runs in both development and production
function onlyAllowResearchers(pool, mailgunEnv, request, response, next) {
  const token = request.headers['x-swiperight-token'];
  const email = request.headers['x-swiperight-email'];

  checkToken(pool, email, token)
    .then(istokenAuthorized => {
      // Don't leak whether this is a whitelisted email address in the response
      if (istokenAuthorized) {
        notifyResearcherAccessGranted(mailgunEnv, email);
        return next();
      } else {
        notifyResearcherAccessDenied(mailgunEnv, email);
        return response.status(405).end();
      }
    })
    .catch(err => {
      return response.status(500).end();
    });
}

function checkToken(pool, email, token) {
  const now = new Date();

  const sql = `
    SELECT * 
    FROM tokens 
    WHERE token=$1 
      AND email=$2
      AND $3 > timestampz
      And $3 < (timestampz + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  const values = [token, email, now];
  return pool.query(sql, values)
    .then(results => Promise.resolve(results.rowCount===1))
    .catch(err => {
      console.log('checkToken query returned err looking up login token: ', err);
    });
}

//Endpoint to handle login attempts
//Check recieved email against autherized set of researchers on whitelist
//Generates and records link for authorized email. 
//Emails link for next login step
//Returns 200 for success, 405 for unauthorized email and 500 for any errors
function loginEndpoint(pool, mailgunEnv, request, response){
  const {email} = request.body;

  notifyLoginAttempt(mailgunEnv, email);
  isOnWhitelist(pool, email)
    .then(isNotAuthorized => {
      if (isNotAuthorized) {
        // Don't leak whether this is a whitelisted email address in the response
        console.log('Unauthorized access attempted by email: ', email);
        return response.status(200).end();
      } else {
        const domain = getDomain(request);
        return createLinkAndEmail(pool, mailgunEnv, email, domain)
          .then(result => response.status(200).end());
      }
    })
    .catch(err => {
      console.log('query error in checking email against whitelist: ', err);
      return response.status(500).end();
    });
}

function isOnWhitelist(pool, email){
  const whitelistSQL = 'SELECT email FROM whitelist WHERE email=$1 ORDER BY id ASC LIMIT 1';
  const whitelistValues = [email];
  
  return pool.query(whitelistSQL, whitelistValues)
    .then(results => Promise.resolve(results.rowCount === 0));
}

function createLinkAndEmail(pool, mailgunEnv, email, domain) {
  return insertLink(pool,email, domain)
    .then(link => emailLink(mailgunEnv, email, link));
}

function insertLink(pool, email, domain) {
  const linkToken = uuid.v4();
  const link = `${domain}/login_from_email?${qs.stringify({linkToken})}`;

  // Insert link into database
  const linkSQL = `INSERT INTO links(email, link, timestampz) VALUES ($1, $2, $3)`;
  const now = new Date();
  const linkValues = [email, linkToken, now];
  return pool.query(linkSQL, linkValues)
    .then(results => link)
    .catch(err => {
      console.log('query error in inserting new link into database: ', err);
    });
}

function emailLink(mailgunEnv, email, linkHref) {
  const filename = path.join(__dirname, 'research/loginlink.html.mustache');
  const html = renderEmail(filename, {linkHref});

  const info = {
    toEmail: email,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: 'Swipe Right: Login Link'
  };

  if (process.env.NODE_ENV !== 'production') {
    if (process.env.NODE_ENV === 'development') {
      console.log('No email login except for in production mode. Go to the following link to move forward.');
      console.log(linkHref);
    }
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    sendEmail(mailgunEnv, info, html, (err, mailgunResponse) => {
      if (err) {
        console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
        return reject(err);
      }
      console.log("Mailgun returned:\n  " + JSON.stringify(mailgunResponse, null, 2));
      return resolve();   
    });
  });
}

// Endpoint to check link from researchers' email
// Confirm email link is valid and generates token 
// for user to access data. Adds token to 'tokens' database
// 
function emailLinkEndpoint(pool, request, response){
  const linkToken = request.body['link'];
  const email = request.body['email'];
  checkLink(pool, email, linkToken)
    .then(isLinkTokenAuthorized => {
      if (isLinkTokenAuthorized) {
        console.log('Accessed with linkToken: ', linkToken);
        generateToken(pool, email)
          .then(results => {
            const token = results;
            response.set('Content-Type', 'application/json');
            response.json({ 
              token: token
            });
            console.log('Granted access token...');
            return response.status(200).end();
          });
      }
      else {
        console.log(`Unauthorized access attempt, email: ${email}, linkToken: ${linkToken}`);
        return response.status(405).end();
      }
    })
    .catch(err => {
      console.log('emailLinkEndpoint returned error: ', err);
      return response.status(500).end();
    });
}

function checkLink(pool, email, link) {
  const now = new Date();

  const linkSQL = `
    SELECT * 
    FROM links 
    WHERE link=$1 
      AND email=$2
      AND $3 > timestampz
      And $3 < (timestampz + INTERVAL '5 minutes')
    ORDER BY id ASC LIMIT 1`;
  const linkValues = [link, email, now];
  return pool.query(linkSQL, linkValues)
    .then(results => {
      return Promise.resolve(results.rowCount===1);
    })
    .catch(err => {
      console.log('query error in confirming email with login link: ', err);
    });
}

function generateToken(pool, email) {
  const now = new Date();
  //Create actual token and insert into token DB
  const token = uuid.v4();

  const sql = `INSERT INTO tokens(email, token, timestampz) VALUES ($1, $2, $3)`;
  const values = [email, token, now];
  return pool.query(sql, values)
    .then(result => token)
    .catch(err => {
      console.log('query error in inserting new token into database: ', err);
    });
}

module.exports = {
  enforceHTTPS,
  onlyAllowResearchers,
  loginEndpoint,
  emailLinkEndpoint
};
