// This file defines the different user interactions, and how they
// will be described on both the client and server.


// Map of type => type:hash
// Ensures that all data access has to go through here.
// This should not be exported; use functions below to read.
const InteractionTypes = [
  'GAVE_CONSENT',
  'INTRO_PLAY',
  'READ_MORE_CONSENT',
  'GAVE_CONSENT',
  'DECLINED_CONSENT',
  'SWIPE_LEFT',
  'SWIPE_RIGHT',
  'DONE_DISCUSS_PHASE',
  'STUDENT_RATING'
].reduce((map, value) => {
  map[value] = [value, hashCode(value)].join(':');
  return map;
}, {});


// Readers
export const Interaction = {
  type(interaction) {
    return interaction.type;
  },
  isConsentType(interaction) {
    return Interaction.type(interaction) === Types.GAVE_CONSENT;
  }
};

// Creators
export const Interactions = {
  play() {
    return { type: InteractionTypes.INTRO_PLAY };
  },
  // The user tapped "Read more" in the consent UI to
  // read the full consent guidelines.
  readMoreConsent() {
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
  studentRating(params) {
    const {choices, choiceIndex, choiceText, student} = params;
    return {
      choices,
      choiceIndex,
      choiceText,
      student,
      type: InteractionTypes.STUDENT_RATING
    };
  }
};


// Describes a user session
export const Session = {
  create(params) {
    // Warn if missing key, but allow it
    const keys = [
      email,
      workshopCode,
      cohortNumber,
      sessionId,
      clientTimestampMs,
      location
    ];
    keys.forEach((key) => {
      if (!params[key]) console.warn(`Session: missing param ${key}`);
    });

    return {
      email,
      workshopCode,
      cohortNumber,
      sessionId,
      clientTimestampMs,
      location
    };
  }
}



// Describes an event, using shared log format across client, server
// and analysis tools.
export const Log = {
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

// For hashing a string to an integer
// from https://docs.oracle.com/javase/7/docs/api/java/lang/String.html
export function hashCode(str){
  var value = 0;
  var power = 1;
  var length = str.length;
  for (var i = 0; i < length; i++) {
    power = Math.pow(31, length - 1 - i);
    value = value + (str.charCodeAt(i)) * power;
    value = value & value; // Convert to 32bit integer
  }
  return value;
}

// For hashing a string to a string to obfuscate (insecurely)
export function sha(value) { 
  return crypto.createHash('sha256').update(value).digest('base64');
}