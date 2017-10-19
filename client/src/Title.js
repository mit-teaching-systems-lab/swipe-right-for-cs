import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';
import logoSrc from './img/swipe.gif';
import {Interactions} from './shared/data.js';
import Swipeable from './components/Swipeable.js';
import Delay from './components/Delay.js';
import SwipeCue from './components/SwipeCue.js';

class Title extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  // prefetch image before animation starts
  componentDidMount() {
    const image = new Image();
    image.src = logoSrc;
  }

  onSwipeRight() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.play());
    onDone();
  }

  render() {
    const swipeHeight = 128;
    return (
      <div className="Title">
        <p className="Title-intro">
          Swipe Right for CS!    
        </p>
        <Delay wait={250}>
          <Swipeable
            height={swipeHeight}
            onSwipeRight={this.onSwipeRight}>
            <div className="Title-swipe">
              <SwipeCue style={{position: 'absolute', top: (swipeHeight/2)}} />
              <img
                className="Title-logo"
                alt="Logo"
                src={logoSrc}
                height={128}
                width={128} />
              <div>Swipe right to play!</div>
            </div>
          </Swipeable>
        </Delay>
      </div>
    );
  }
} 

Title.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default Title;