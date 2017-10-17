const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const request = require('superagent');
const {consentText} = require('../client/src/shared/consent.js');
const {
  sha,
  Log,
  Interaction,
  Session
} = require('../client/src/shared/data.js');


// Check log message to see if it's giving consent, and if it is,
// send an email.  Fire and forget.
function maybeSendConsentEmail(log, mailgunEnv) {
  const interaction = Log.interaction(log);
  if (Interaction.isConsentType(interaction)) {
    const session = Log.session(log);
    const email = session.email;
    if (!Session.isUnknownEmail(email)) {
      sendConsentEmail(mailgunEnv, email);
    }
  }

  return;
}


// Render email into an HTML string.
// Template is originally from litmus.
function renderEmail() {
  const templateFilename = path.join(__dirname, '/emails/consent.html.mustache');
  const template = fs.readFileSync(templateFilename).toString();
  return Mustache.render(template, {consentText});
}

// Send an email through Mailgun, taking env config, info on email and
// html string.
// Calls back with {status: 'ok'}
function sendEmail(env, info, html, cb) {
  const {subject, fromEmail, toEmail} = info;
  const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = env;
  console.log('Sending `' + subject + '` to ' + toEmail + ' from ' + fromEmail);

  request
    .post('https://api:' + MAILGUN_API_KEY + '@api.mailgun.net/v3/' + MAILGUN_DOMAIN + '/messages')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: html
    })
    .end((err, result) => {
      console.log('Mailgun request (err, result):', "\n  " + JSON.stringify(err), "\n  " + JSON.stringify({ status: result.status, text: result.text }));
      if (err) return cb(err);
      return cb(null, { status: 'ok' });
    });
}
function sendConsentEmail(mailgunEnv, email) {
  console.log('Sending consent email, email hash: ' + sha(email));
  const html = renderEmail();
  const info = {
    toEmail: email,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: 'Research consent'
  };
  sendEmail(mailgunEnv, info, html, (err, res) => {
    if (err) {
      console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
    }
    console.log("Mailgun returned:\n  " + JSON.stringify(res, null, 2));
  });
}

module.exports = {
  maybeSendConsentEmail
};