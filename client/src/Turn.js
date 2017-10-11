import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Turn.css';
import Delay from 'react-delay';
import Swipeable from './components/Swipeable.js';
import Interactions from './Interactions.js';


// Shows the user a turn of the game, and let's them interact with it.
// Calls back to `onDone` with an `Interaction` when the user is done the
// turn.
class Turn extends Component {
  constructor(props) {
    super(props);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  turn() {
    const {
      profileKey,
      profileName,
      profileText,
      profileImageSrc,
      argumentText
    } = this.props;
    return {
      profileKey,
      profileName,
      profileText,
      profileImageSrc,
      argumentText
    };
  }

  onSwipe(interaction) {
    const {onDone, onInteraction} = this.props;
    onInteraction(interaction);
    onDone(interaction);
  }
  onSwipeLeft() {
    this.onSwipe(Interactions.swipeLeft(this.turn()));
  }

  onSwipeRight() {
    this.onSwipe(Interactions.swipeRight(this.turn()));
  }

  render() {
    const {profileName, profileText, profileImageSrc, argumentText} = this.props;
    const imageHeight = 180;
    return (
      <div className="Turn">
        <div className="Turn-student">
          <img
            height={imageHeight}
            src={profileImageSrc}
            alt={profileName} />
          <div className="Turn-profile">{profileText}</div>
        </div>
        <Delay wait={500}>
          <Swipeable
            key={argumentText}
            height={140}
            onSwipeLeft={this.onSwipeLeft}
            onSwipeRight={this.onSwipeRight}>
            <div className="Turn-argument">{argumentText}</div>
          </Swipeable>
        </Delay>
      </div>
    );
  }
}
Turn.propTypes = {
  profileKey: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired,
  argumentText: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};
export default Turn;