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
    const height = 80;
    return (
      <div className="IntroductionPhase">
        <p className="IntroductionPhase-header Global-header-font">
           Round 1: Meet some students! 
        </p>
        <div className="IntroductionPhase-body">
          <p>
            {`The following high school students are not enrolled in a CS course.
            For each student, read a short profile of them and think of what they really care about.
            You'll then see some things that teachers might say to persuade them to take a CS course.`}
          </p>
          <p><b>If you think the argument would meaningfully resonate with that student, swipe it right.</b></p>
          <p>If not, swipe it left.</p>
        </div>
        <Delay wait={2000}>
          <Swipeable
            height={height}
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
