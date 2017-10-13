const {
  sha,
  Log,
  Interaction,
  Session
} = require('../client/src/shared/data.js');


// Check log message to see if it's giving consent, and if it is,
// send an email.
function maybeSendConsentEmail(log, mailgunEnv) {
  const interaction = Log.interaction(log);
  if (Interaction.isConsentType(interaction)) {
    const session = Log.session(log);
    const email = session.email;
    if (!Session.isUnknownEmail(email)) {
      sendConsentEmail(email);
    }
  }
}

function sendConsentEmail(email) {
  console.log('Sending consent email, email hash: ' + sha(email));
}

module.exports = {
  maybeSendConsentEmail
};