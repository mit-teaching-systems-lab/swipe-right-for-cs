import React, { Component } from 'react';
import './Bounceable.css';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';

// Bounce up
class Bounceable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animTop: new Animated.Value(props.height),
    };
  }

  componentDidMount() {
    const {animTop} = this.state;
    Animated.spring(animTop, {
      toValue: 0.0,
      speed: 20
    }).start();
  }

  render() {
    const {height, children} = this.props;
    const {animTop} = this.state;

    // Spring up
    return (
      <div className="Bounceable" style={{height: height}}>
        <Animated.div
          className="Bounceable-spring"
          style={{top: animTop}}>
          {children}
        </Animated.div>
      </div>
    );
  }
}

Bounceable.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired
};

export default Bounceable;