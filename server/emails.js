const path = require('path');
const {sendEmail, renderEmail} = require('./email.js');
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

// Actually send email
function sendConsentEmail(mailgunEnv, email) {
  console.log('Sending consent email, email hash: ' + sha(email));

  const consentFilename = path.join(__dirname, '/emails/consent.html.mustache');
  const html = renderEmail(consentFilename, {consentText});
  const info = {
    toEmail: email,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: 'Swipe Right for CS: Research consent'
  };
  sendEmail(mailgunEnv, info, html, (err, res) => {
    if (err) {
      console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
    }
    console.log("Mailgun returned:\n  " + JSON.stringify(res, null, 2));
  });
}

// Send email to self with responses
function sendResponsesEmail(email, moves, mailgunEnv) {
  console.log('Sending responses email, email hash: ' + sha(email));

  const hereYouGoText = 'Here are your responses from the game.';
  const responsesFilename = path.join(__dirname, '/emails/responses.html.mustache');
  const html = renderEmail(responsesFilename, {hereYouGoText, moves});
  const info = {
    toEmail: email,
    fromEmail: 'swipe-right-bot@tsl.mit.edu',
    subject: 'Swipe Right for CS: Your responses'
  };
  sendEmail(mailgunEnv, info, html, (err, res) => {
    if (err) {
      console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
    }
    console.log("Mailgun returned:\n  " + JSON.stringify(res, null, 2));
  });
}



module.exports = {
  maybeSendConsentEmail,
  sendResponsesEmail
};