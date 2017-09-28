import React, { Component } from 'react';
import './Swipeable.css';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';

// A card that springs up and then can be swiped left or right,
// handling those animations and interactions and calling back to
// the props when either occurs.
class Swipeable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animTop: new Animated.Value(props.height),
    };
  }

  componentDidMount() {
    const {animTop} = this.state;
    Animated.spring(animTop, { toValue: 0.0 }).start();
  }

  render() {
    const {height} = this.props;
    const {animTop} = this.state;

    // Spring up
    return (
      <div className="Swipeable" style={{height: height}}>
        <Animated.div
          style={{position: 'relative', top: animTop}}>
          {this.renderSwipeable()}
        </Animated.div>
      </div>
    );
  }

  // TODO: update with react-swipeable-views
  renderSwipeable() {
    const {children, onSwipeLeft, onSwipeRight} = this.props;
    return (
      <div className="Swipeable-items">
        <div onClick={onSwipeLeft}>left</div>
        {children}
        <div onClick={onSwipeRight}>right</div>
      </div>
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