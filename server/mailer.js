const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const fetch = require('node-fetch');
const FormData = require('form-data');
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
function sendEmail(env, info, html) {
  const {subject, fromEmail, toEmail} = info;
  const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = env;
  const url = `https://api:${MAILGUN_API_KEY}@api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: formData({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: html
    })
  });
}

function formData(params = {}) {
  const form = new FormData();
  Object.keys(params).forEach(key =>
    form.append(key, params[key])
  );
  return form;
}

function sendConsentEmail(mailgunEnv, email) {
  console.log('Sending consent email, email hash: ' + sha(email));
  const html = renderEmail();
  const info = {
    toEmail: email,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: 'Research consent'
  };
  return sendEmail(mailgunEnv, info, html)
    .then(res => {
      if (res.status !== 200) {
        console.log("Mailgun returned status:\n  " + JSON.stringify(res, null, 2));
      }
    })
    .catch(err => {
      console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
    });
}

module.exports = {
  maybeSendConsentEmail
};