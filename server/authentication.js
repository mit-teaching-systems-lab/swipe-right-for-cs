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

  // if (request.headers['token'] == '????'){
  //   return next();
  // }
  const token = req.header['token'];
  const email = req.header['email'];
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

  //TODO: store result somehow
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
  console.log('4. insertLink called');
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
    // Email link to user
    console.log('7. sending link to ' + sha(email));
    //Not sure how to use existing email architecture.
    //Looking at endpoints.js: emailMyresponsesEndpoint->sendEmails.js: sendResponsesEmail->email.js: sendEmail
    //This is based on old threeflows code and current swipe right code
    // const html = renderEmail({link});
    const html = '<html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>';
    const info = {
      toEmail: email,
      fromEmail: 'swipe-right-bot@tsl.mit.edu',
      subject: 'Swipe Right for CS: Login Link'
    };
    // TODO: figure out emails later
    // sendEmail(mailgunEnv, info, html, (err, res) => {
    //   if (err) {
    //     console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
    //   }
    //   console.log("Mailgun returned:\n  " + JSON.stringify(res, null, 2));
    // });
  }

function loginEndpoint(pool, mailgunEnv, req, res){
  //This generates link AND sends email???

  // TODO:
  // 1. Check that the email is in the whitelist in the `researchers` database table
  // 2. Insert a new record to the `links` database table
  // 3. Send an email to the researcher with that link in it (generate email with Mustache template, send it with Mailgun)
  // 4. Return a 200 response

  console.log('1. loginEndpoint function called');
  // const email = req.body['email'];
    const email = 'keving17@mit.edu';


  // Check if email is on whitelist
  const whitelistSQL = 'SELECT * FROM whitelist WHERE email=$1 ORDER BY id ASC LIMIT 1';
  const whitelistValues = [email];
  pool.query(whitelistSQL, whitelistValues)
  // const link = null;
  .then(results => {
    // console.log('results:' + results);
      console.log('2. matches found: ' + results.rowCount);
      if (results.rowCount == "0") {
        console.log('not authorized');
      } else {
        console.log('3. authorized');
        return insertLink(pool,email, getDomain(req));
      }
  })
  .then(link => {
    console.log('5. returned link: '+link);
    return new Promise(function(resolve, reject) {
      //This seems to be called before previous operation is complete....
      // variable link is always undefined
      console.log('6. final promise');
      emailLink(mailgunEnv, email, link);
    });
  })
  .catch(err => {
    console.log('loginEndpoint returned error');
    console.log({ error: err });
  });

  //Should probably do something about returning status?
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
