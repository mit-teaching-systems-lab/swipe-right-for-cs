import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton.js';
import './ThanksPhase.css';
import {Interactions, InteractionTypes} from './shared/data.js';


// Thanks, come again!
class ThanksPhase extends Component {
  constructor(props) {
    super(props);
    this.onClickedEmail = this.onClickedEmail.bind(this);
    this.onClickedForums = this.onClickedForums.bind(this);
  }

  computeMoves() {
    const {logs} = this.props;
    const swipeLogs = logs.filter(log => {
      const isSwipe = ([
        InteractionTypes.SWIPE_RIGHT,
        InteractionTypes.SWIPE_LEFT
      ].indexOf(log.interaction.type) !== -1);
      return isSwipe;
    });
    return swipeLogs.map(log => {
      const {turn, type} = log.interaction;
      const {profileName, profileText, argumentText} = turn;
      const isRight = (InteractionTypes.SWIPE_RIGHT === type);
      return {profileName, profileText, argumentText, isRight};
    });
  }

  onClickedEmail() {
    const {email, onInteraction} = this.props;
    const moves = this.computeMoves();
    onInteraction(Interactions.share({moves, email}));
    fetch('/api/share', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: {moves, email}
    });
  }

  onClickedForums() {
    const {onInteraction} = this.props;
    onInteraction(Interactions.forums());
    window.open('https://forum.code.org/c/recruitment/recruiting');
  }

  render() {
    return (
      <div className="ThanksPhase">
        <div className="ThanksPhase-content">
          <p className="Global-header-font">Thanks!</p>
          <div>We can email you your responses if you like.</div>
          <TappableButton outerStyle={{margin: 20}} onClick={this.onClickedEmail}>
            Send me an email
          </TappableButton>
          <div>And you can talk more on the Code.org forums too!</div>
          <TappableButton  outerStyle={{margin: 20}} onClick={this.onClickedForums}>
            forums.code.org
          </TappableButton>
        </div>
      </div>
    );
  }
}

ThanksPhase.propTypes = {
  email: PropTypes.string.isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired
};

export default ThanksPhase;