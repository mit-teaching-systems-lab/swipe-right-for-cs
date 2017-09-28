// This object defines the different user interactions, and how they
// will be described on the server
const Interactions = {
  swipeLeft(turn) {
    return { turn: turn, type: 'SWIPE_LEFT' };
  },
  swipeRight(turn) {
    return { turn: turn, type: 'SWIPE_RIGHT' };
  },
};
export default Interactions;