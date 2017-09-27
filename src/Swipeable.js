import React, { Component } from 'react';
import './Swipeable.css';
import PropTypes from 'prop-types';

// A card that can be swiped left or right, handling those animations and interactions
// and calling back to the props when either occurs.
// TODO: update with react-swipeable-views
class Swipeable extends Component {
  render() {
    const {children, onSwipeLeft, onSwipeRight} = this.props;

    return (
      <div className="Swipeable">
        <div onClick={onSwipeLeft}>left</div>
        <div>{children}</div>
        <div onClick={onSwipeRight}>right</div>
      </div>
    );
  }
}

Swipeable.propTypes = {
  children: PropTypes.node.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired
};

export default Swipeable;