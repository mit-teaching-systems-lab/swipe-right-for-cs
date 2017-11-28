const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const qs = require('querystring');
const crypto = require('crypto');
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

function sendUnauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
}

function getDomain(request) {
    return (process.env.NODE_ENV === 'development')
      ? 'http://localhost:5000'
      : `https://${request.headers.host}`;
  }

// Only allow folks who are authorized.  Call `next` if they are authorized,
// and return a 404 with no body if not.
function onlyAllowResearchers(request, response, next) {
  // TODO
  // 1. Read the token from the request header
  // 2. Check to see if the token header is in `tokens` database table and it's less than 24 hours old
  // 3. This code should run in both development and production.

  if (process.env.NODE_ENV === 'development') return next();

  const token = req.body['token'];
  const email = req.body['email'];
  const now = new Date();

  // Check if link is in links DB
  const sql = `
    SELECT * 
    FROM tokens 
    WHERE token=$1 
      AND email=$2
      AND TO_TIMESTAMP($3) > timestampz
      And TO_TIMESTAMP($3) < (timestampz + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  const values = [token, email, now];
  pool.query(sql, values).catch(err => {
    console.log('loginEndpoint returned error');
    console.log({ error: err });
  });

  const resultFound = true;
  if (resultFound) {
    return  next();
  }
  return sendUnauthorized(res);
}

function sha(value) { 
  return crypto.createHash('sha256').update(value).digest('base64');
}

function insertLink(pool, email, domain) {
  console.log('insertLink');
  const linkToken = uuid.v4();
  //TODO: what should link look like???
  const link = `${domain}/review_link?${qs.stringify({linkToken})}`;

  // Insert link into database
  const linkSQL = `INSERT INTO links(email, link, timestampz) VALUES ($1, $2, $3)`;
  const now = new Date();
  const linkValues = [email, link, now];
  return pool.query(linkSQL, linkValues)
    .then(results => link)
    .catch(err => {
      console.log('query returned err: ', err);
      console.log({ error:err });
    });
  }

  function emailLink(mailgunEnv, email, link) {
    console.log('emailLink');
    const linkText = link;
    const loginlinkFilename = path.join(__dirname,'game/emails/loginlink.html.mustache');
    const html = renderEmail(loginlinkFilename,{linkText});
    fs.writeFileSync('/Users/keving17/Documents/Github/TSL/swipe-right-for-cs/server/test.html',html);
    const info = {
      toEmail: email,
      fromEmail: 'swipe-right-bot@tsl.mit.edu',
      subject: 'Swipe Right for CS: Login Link'
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('No emailing in development mode. Go to the following link to move forward.');
      console.log(link);
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


function loginEndpoint(pool, mailgunEnv, request, response){

  // TODO:
  // 1. Check that the email is in the whitelist in the `researchers` database table
  // 2. Insert a new record to the `links` database table
  // 3. Send an email to the researcher with that link in it (generate email with Mustache template, send it with Mailgun)
  // 4. Return a 200 response
  const {email} = request.body;

  isOnWhitelist(pool, email)
    .then(isNotAuthorized => {
      if (isNotAuthorized) {
        return response.status(405).end();
      } else {
        const domain = getDomain(request);
        return createLinkAndEmail(pool, mailgunEnv, email, domain)
          .then(result => response.status(200).end());
      }
    })
    .catch(err => {
      console.log('loginEndpoint error: ', err);
      return response.status(500).end();
    });
}

function isOnWhitelist(pool, email){
  const whitelistSQL = 'SELECT * FROM whitelist WHERE email=$1 ORDER BY id ASC LIMIT 1';
  const whitelistValues = [email];
  
  return pool.query(whitelistSQL, whitelistValues)
    .then(results => Promise.resolve(results.rowCount === 0));
}

function createLinkAndEmail(pool, mailgunEnv, email, domain) {
  return insertLink(pool,email, domain)
    .then(link => emailLink(mailgunEnv, email, link));
}

function emailLinkEndpoint(mailgunEnv, req, res){
  //This doesn't actually send emails it seems. More like tokenGeneratorEndpoint

  // TODO
  // 1. Read in query string parameter to get email link id
  // 2. Read the `links` database table to see if there is such a link and it's less than an hour old
  // 3. Insert a new token into the `tokens` database table
  // 4. Return a 200 response with {token} in a JSON response body.

  const link = req.header['link'];
  const email = req.header['email'];
  const now = new Date();

  // Check if link is in links DB
  const linkSQL = `
    SELECT * 
    FROM links 
    WHERE link=$1 
      AND email=$2
      AND TO_TIMESTAMP($3) > timestampz
      And TO_TIMESTAMP($3) < (timestampz + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  const linkValues = [link, email, now];
  pool.query(linkSQL, linkValues).catch(err => {
    console.log('loginEndpoint returned error');
    console.log({ error: err });
  });

  //TODO: How to keep track of result??

  //Create actual token and insert into token DB
  const token = uuid.v4();

  const sql = `INSERT INTO tokens(email, token, timestampz) VALUES ($1, $2, $3)`;
  const values = [email, token, now];
  pool.query(sql, values).catch(err => {
    console.log('query returned err: ', err);
    console.log({ error:err });
  });

  //TODO: How to return 200 response with token in JSON response body?
  // think I figured it out?
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.json({ 
    status: 'ok',
    token: token
  });
}

module.exports = {
  enforceHTTPS,
  onlyAllowResearchers,
  loginEndpoint,
  emailLinkEndpoint
};

//token and link generation 
//https://github.com/mit-teaching-systems-lab/threeflows/blob/ed1a1434c332316c27d9f8d25b0748d312d53b1a/server/endpoints/review_login.js
