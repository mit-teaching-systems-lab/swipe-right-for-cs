import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './IntroductionPhase.css';
import Interactions from './Interactions.js';
import Delay from 'react-delay';
import Swipeable from './components/Swipeable.js';


// Show the introduction, manage state transitions
// between different introduction screens.
class IntroductionPhase extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.play());
    onDone();
  }

  render() {
    return (
      <div className="IntroductionPhase">
        <p className="IntroductionPhase-header Global-header-font">
           Round 1: Meet some students! 
        </p>
        <div className="IntroductionPhase-body">
          <p className="IntroductionPhase-copy">
            {`The following high school students are not currently interested in enrolling in a CS course.
            Start by reading the short profile of the student, and thinking of what they really care about, or what they would get excited about.
            You'll then see some things that teachers might say to persuade them to take a computer science course.`}
          </p>
          <div><b>Swipe the argument right if you think the argument would deeply resonate with that student</b>.</div>
          <br />
          <div>If not, swipe the argument left.</div>
        </div>
        <Delay wait={2000}>
          <Swipeable
            height={120}
            onSwipeRight={this.onSwipeRight}>
            <div className="IntroductionPhase-swipe">Swipe to play!</div>
          </Swipeable>
        </Delay>
      </div>
    );
  }
}
IntroductionPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default IntroductionPhase;
