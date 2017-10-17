import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';
import logoSrc from './img/swipe.png';
import {Interactions} from './shared/data.js';
import Swipeable from './components/Swipeable.js';
import Delay from './components/Delay.js';

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
    return (
      <div className="Title">
        <p className="Title-intro">
          Swipe Right for CS!    
        </p>
        <Delay wait={250}>
          <Swipeable
            height={128}
            onSwipeRight={this.onSwipeRight}>
            <div className="Title-swipe">
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