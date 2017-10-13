import React, { Component } from 'react';
import './TappableButton.css';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';


// A tappable button
class TappableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animScale: new Animated.Value(1)
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  doAnimateTo(toValue, options = {}) {
    const {animScale} = this.state;
    const {onEnd} = options;
    Animated.spring(animScale, {
      toValue,
      speed: 20
    }).start(onEnd);
  }

  onMouseDown() {
    this.doAnimateTo(0.2);
  }

  onMouseUp() {
    this.doAnimateTo(1.0);
  }

  onClick() {
    const {onClick} = this.props;
    const {animScale} = this.state;
    animScale.setValue(1.0);
    onClick();
    // animScale.stopAnimation(value => {
    //   this.doAnimateTo(1.0, { onEnd: onClick });
    // });
  }

  render() {
    const {children, outerStyle, style} = this.props;
    const {animScale} = this.state;

    // Spring on touch
    return (
      <Animated.div
        className="TappableButton"
        style={{...outerStyle, opacity: animScale}}>
        <div
          className="TappableButton-inner"
          style={style}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseUp}
          onClick={this.onClick}>{children}</div>
      </Animated.div>
    );
  }
}

TappableButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  outerStyle: PropTypes.object
};
TappableButton.defaultProps = {
  style: {}
};

export default TappableButton;