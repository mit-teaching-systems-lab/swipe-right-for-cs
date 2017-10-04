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
        <p className="IntroductionPhase-body"> For each student, read their profile and take on their perspective. Once you‘ve read some reasons teachers might use to convince them to take a computer science course. 
        </p>
        <button onClick={this.props.onDone}>READY?</button>
      </div>
    );
  }
}
IntroductionPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default IntroductionPhase;
