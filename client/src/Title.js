import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';
import Swipeable from './Swipeable.js';

class Title extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const {onDone} = this.props;
    onDone();
  }

  render() {
    return (
      <div className="Title">
        <p className="Title-intro">
          Swipe Right for CS!    
        </p>
        <Swipeable
          height={120}
          onSwipeRight={this.onSwipeRight}>
          <div className="Title-swipe">Swipe right to play!</div>
        </Swipeable>
      </div>
    );
  }
} 

Title.propTypes = {
  onDone: PropTypes.func.isRequired
};

export default Title;