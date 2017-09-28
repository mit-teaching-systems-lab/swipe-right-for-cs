import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Turn.css';
import Swipeable from './Swipeable.js';
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
    const {profileName, profileText, profileImageSrc, argumentText} = this.props;
    return {profileName, profileText, profileImageSrc, argumentText};
  }

  onSwipeLeft() {
    this.props.onDone(Interactions.swipeLeft(this.turn()));
  }

  onSwipeRight() {
    this.props.onDone(Interactions.swipeRight(this.turn()));
  }

  render() {
    const {profileName, profileText, profileImageSrc, argumentText} = this.props;
    return (
      <div className="Turn">
        <div>{profileName}</div>
        <img
          width="100%"
          src={profileImageSrc}
          alt={profileName} />
        <div>{profileText}</div>
        <Swipeable
          height={200}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}>
          <div>{argumentText}</div>
        </Swipeable>
      </div>
    );
  }
}
Turn.propTypes = {
  profileName: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired,
  argumentText: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired
};
export default Turn;
