// This object defines the different user interactions, and how they
// will be described on the server
const Interactions = {
  play() {
    return { type: 'INTRO_PLAY' };
  },
  // The user tapped "Read more" in the consent UI to
  // read the full consent guidelines.
  readMoreConsent() {
    return { type: 'READ_MORE_CONSENT' };
  },
  gaveConsent() {
    return { type: 'GAVE_CONSENT' };
  },
  declinedConsent() {
    return { type: 'DECLINED_CONSENT' };
  },
  swipeLeft(turn) {
    return { turn: turn, type: 'SWIPE_LEFT' };
  },
  swipeRight(turn) {
    return { turn: turn, type: 'SWIPE_RIGHT' };
  },
  doneDiscussPhase() {
    return { type: 'DONE_DISCUSS_PHASE' };
  }
};
export default Interactions;