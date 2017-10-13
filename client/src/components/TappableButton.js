import React, { Component } from 'react';
import './TappableButton.css';
import PropTypes from 'prop-types';

// A tappable button
class TappableButton extends Component {
  // componentDidMount() {
  //   const {animTop} = this.state;
  //   Animated.spring(animTop, {
  //     toValue: 0.0,
  //     speed: 20
  //   }).start();
  // }

  render() {
    const {children, onClick, style} = this.props;
    // const {animTop} = this.state;

    return (
      <div
        className="TappableButton"
        style={style}
        onClick={(...params) => onClick(...params)}>{children}</div>
    );
    // // Spring up
    // return (
    //   <div className="Bounceable" style={{height: height}}>
    //     <Animated.div
    //       className="Bounceable-spring"
    //       style={{top: animTop, height: height}}>
    //       {children}
    //     </Animated.div>
    //   </div>
    // );
  }
}

TappableButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};
TappableButton.defaultProps = {
  style: {}
};

export default TappableButton;