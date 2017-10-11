import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './IntroductionPhase.css';
import Interactions from './Interactions.js';
import Delay from 'react-delay';
import Swipeable from './Swipeable.js';


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
        <p className="IntroductionPhase-header">
           Round 1: Meet some students! 
        </p>
        <div className="IntroductionPhase-body">
          <p>
            For each high school student, read their profile and empathize with what
            they really care about, or what they would really get excited about.  You will see some ways
            that teachers might use to persuade them to take a computer science
            course.
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
