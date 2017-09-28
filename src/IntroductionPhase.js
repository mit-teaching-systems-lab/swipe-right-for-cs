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
        <div>Introduction</div>
        <div onClick={this.onPlay}>Play!</div>
      </div>
    );
  }
}
IntroductionPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default IntroductionPhase;