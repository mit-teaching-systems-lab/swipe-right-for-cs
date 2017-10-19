// This file defines the different user interactions, and how they
// will be described on both the client and server.
// It's owned by the client, but the server reaches in and relies on it.

// This code is shared by CRA and node, so uses node-style requires and
// module.exports.
const __difference = require('lodash/difference');
const __sortBy = require('lodash/sortBy');
const crypto = require('crypto');
const {warn} = require('./log.js');

// Map of type => type:hash
// Ensures that all data access has to go through here.
const InteractionTypes = [
  'INTRO_PLAY',
  'READ_MORE_CONSENT', // deprecated
  'GAVE_CONSENT',
  'DECLINED_CONSENT',
  'SWIPE_LEFT',
  'SWIPE_RIGHT',
  'DONE_DISCUSS_PHASE',
  'DONE_REVIEW_PHASE',
  'STUDENT_RATING',
  'SHARE',
  'FORUMS'
].reduce((map, value) => {
  map[value] = [value, sha(value)].join(':');
  return map;
}, {});


// Readers
const Interaction = {
  type(interaction) {
    return interaction.type;
  },
  isConsentType(interaction) {
    return Interaction.type(interaction) === InteractionTypes.GAVE_CONSENT;
  }
};

// Creators
const Interactions = {
  play() {
    return { type: InteractionTypes.INTRO_PLAY };
  },
  // The user tapped "Read more" in the consent UI to
  // read the full consent guidelines.
  // Deprecated
  readMoreConsent() {
    warn('READ_MORE_CONSENT interaction deprecated');
    return { type: InteractionTypes.READ_MORE_CONSENT };
  },
  gaveConsent() {
    return { type: InteractionTypes.GAVE_CONSENT };
  },
  declinedConsent() {
    return { type: InteractionTypes.DECLINED_CONSENT };
  },
  swipeLeft(turn) {
    return { turn: turn, type: InteractionTypes.SWIPE_LEFT };
  },
  swipeRight(turn) {
    return { turn: turn, type: InteractionTypes.SWIPE_RIGHT };
  },
  doneDiscussPhase() {
    return { type: InteractionTypes.DONE_DISCUSS_PHASE };
  },
  doneReviewPhase() {
    return { type: InteractionTypes.DONE_REVIEW_PHASE };
  },
  studentRating(params) {
    const {choices, choiceIndex, choiceText, student} = params;
    return {
      choices,
      choiceIndex,
      choiceText,
      student,
      type: InteractionTypes.STUDENT_RATING
    };
  },
  share(params) {
    const {moves, email} = params;
    return {
      moves,
      email,
      type: InteractionTypes.SHARE
    };
  },
  forums() {
    return { type: InteractionTypes.FORUMS };
  }
};


// Describes a user session
const Session = {
  create(params) {
    // Warn if missing key, but allow it
    const keys = [
      'identifier',
      'isCodeOrg',
      'workshopCode',
      'cohortNumber',
      'sessionId',
      'clientTimestampMs',
      'location'
    ];
    keys.forEach((key) => {
      if (params[key] === undefined) warn(`Session: missing param ${key}`); // eslint-disable-line no-console
    });

    // Warn if extra keys
    const extraKeys = __difference(keys, Object.keys(params));
    if (extraKeys.length > 0) {
      warn(`Session: unexpected keys ${extraKeys.join(', ')}`); // eslint-disable-line no-console
    }

    return params;
  },
  isUnknownEmail(session) {
    return (session.email === Session.unknownEmail());
  },
  unknownEmail() {
    return 'unknown@mit.edu';
  },
  unknownIdentifier() {
    return 'UNKNOWN_IDENTIFIER';
  }
};



// Describes an event, using shared log format across client, server
// and analysis tools.
const Log = {
  create(session, interaction) {
    return {session, interaction};
  },
  session(log) {
    return log.session;
  },
  interaction(log) {
    return log.interaction;
  }
};

// For hashing a string to a unsigned 32-bit integer
function hashCode(str){
  const md5 = crypto.createHash('md5').update(str).digest('hex');
  return parseInt(md5.slice(-8), 16);
}

// For hashing a string to a string to obfuscate (insecurely)
function sha(value) { 
  return crypto.createHash('sha256').update(value).digest('base64');
}

// This consistently sorts `items` based on the content of each item
// mixed with the `key`.
function consistentShuffleForKey(items, key) {
  return __sortBy(items, item => {
    const shuffleValue = JSON.stringify({item, key});
    return hashCode(shuffleValue);
  });
}

module.exports = { // eslint-disable-line no-undef
  Interaction,
  InteractionTypes,
  Interactions,
  Session,
  Log,
  hashCode,
  sha,
  consistentShuffleForKey
};