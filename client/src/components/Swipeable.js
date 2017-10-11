import React, { Component } from 'react';
import __compact from 'lodash/compact';
import './Swipeable.css';
import PropTypes from 'prop-types';
import Bounceable from './Bounceable.js';
import SwipeableViews from 'react-swipeable-views';
import {bindKeyboard} from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
  fullSize: {
    width: '100%', // for text that doesn't take full width
    height: '100%' // for mobile Safari
  }
};

// A card that springs up and then can be swiped right (and optionall left),
// handling those animations and interactions and calling back to
// the props when either occurs.
class Swipeable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeIndex: 1
    };
    this.onChangeIndex = this.onChangeIndex.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  onChangeIndex(index) {
    this.setState({ swipeIndex: index });
  }

  onTransitionEnd() {
    const {swipeIndex} = this.state;
    const {onSwipeLeft, onSwipeRight} = this.props;
    if (onSwipeRight && swipeIndex === 0) return onSwipeRight();
    if (swipeIndex === 2) return onSwipeLeft();
  }

  render() {
    const {height} = this.props;

    return (
      <div className="Swipeable" style={{height: height}}>
        <Bounceable height={height}>
          {this.renderSwipeable()}
        </Bounceable>
      </div>
    );
  }

  renderSwipeable() {
    const {children, onSwipeLeft} = this.props;
    const {swipeIndex} = this.state;

    // shortening the duration from
    // https://github.com/oliviertassinari/react-swipeable-views/blob/81c584c7c8c52b472df950cfdfb7aab3a460173f/packages/react-swipeable-views/src/SwipeableViews.js#L389
    const springConfig = {
      duration: '0.20s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s'
    };
    
    const elements = __compact([
      <div key="left" className="Swipeable-left">&nbsp;</div>,
      <div key="children" className="Swipeable-children">{children}</div>,
      onSwipeLeft && <div key="right" className="Swipeable-right">&nbsp;</div>
    ]);
    return (
      <BindKeyboardSwipeableViews
        resistance={true}
        className="Swipeable-views"
        enableMouseEvents={true}
        springConfig={springConfig}
        slideStyle={styles.fullSize} 
        containerStyle={styles.fullSize}
        index={swipeIndex}
        onChangeIndex={this.onChangeIndex}
        onTransitionEnd={this.onTransitionEnd}>
        {elements}
      </BindKeyboardSwipeableViews>
    );
  }
}

Swipeable.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  onSwipeLeft: PropTypes.func
};

export default Swipeable;