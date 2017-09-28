// This object defines the different user interactions, and how they
// will be described on the server
const Interactions = {
  swipeLeft({question, argument}) {
    return {question, argument, type: 'SWIPE_LEFT' };
  },
  swipeRight({question, argument}) {
    return {question, argument, type: 'SWIPE_RIGHT' };
  },
};
export default Interactions;