import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './IntroductionPhase.css';
import Interactions from './Interactions.js';


// Show the introduction, manage state transitions
// between different introduction screens.
class IntroductionPhase extends Component {
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
  }

  onPlay() {
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
        <p className="IntroductionPhase-body">
          <div>For each high school student, read their profile and empathize with what they might care about and get excited about.</div>
          <div>You will see some ways that teachers might use to persuade them to take a computer science course.</div>
          <br />
          <div>Swipe right if you think the argument would <b>deeply resonate with that student</b>.</div>
          <br />
          <div>If not, swipe left.</div>
        </p>
        <button
          className="button"
          onClick={this.props.onDone}>READY?</button>
      </div>
    );
  }
}
IntroductionPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default IntroductionPhase;
