import React, { Component } from 'react';
import './Swipeable.css';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';
import SwipeableViews from 'react-swipeable-views';
import {bindKeyboard} from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);


// A card that springs up and then can be swiped left or right,
// handling those animations and interactions and calling back to
// the props when either occurs.
class Swipeable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeIndex: 1,
      animTop: new Animated.Value(props.height),
    };
    this.onChangeIndex = this.onChangeIndex.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    const {animTop} = this.state;
    Animated.spring(animTop, {
      toValue: 0.0,
      speed: 20
    }).start();
  }

  onChangeIndex(index) {
    this.setState({ swipeIndex: index });
  }

  onTransitionEnd() {
    const {swipeIndex} = this.state;
    const {onSwipeLeft, onSwipeRight} = this.props;
    if (swipeIndex === 0) return onSwipeLeft();
    if (swipeIndex === 2) return onSwipeRight();
  }

  render() {
    const {height} = this.props;
    const {animTop} = this.state;

    // Spring up
    return (
      <div className="Swipeable" style={{height: height}}>
        <Animated.div
          className="Swipeable-spring"
          style={{top: animTop}}>
          {this.renderSwipeable()}
        </Animated.div>
      </div>
    );
  }

  renderSwipeable() {
    const {children} = this.props;
    const {swipeIndex} = this.state;

    // shortening the duration from
    // https://github.com/oliviertassinari/react-swipeable-views/blob/81c584c7c8c52b472df950cfdfb7aab3a460173f/packages/react-swipeable-views/src/SwipeableViews.js#L389
    const springConfig = {
      duration: '0.20s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s'
    };
    
    return (
      <BindKeyboardSwipeableViews
        className="Swipeable-views"
        enableMouseEvents={true}
        springConfig={springConfig}
        index={swipeIndex}
        onChangeIndex={this.onChangeIndex}
        onTransitionEnd={this.onTransitionEnd}>
        <div className="Swipeable-left" />
        <div className="Swipeable-children">{children}</div>
        <div className="Swipeable-right" />
      </BindKeyboardSwipeableViews>
    );
  }
}

Swipeable.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired
};

export default Swipeable;