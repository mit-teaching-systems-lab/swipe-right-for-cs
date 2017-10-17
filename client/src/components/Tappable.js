import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';


// A tappable opacity
class Tappable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animScale: new Animated.Value(1.0)
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
    this.doAnimateTo(0.2); // same as React Native TouchableOpacity
  }

  onMouseUp() {
    this.doAnimateTo(1.0);
  }

  onClick() {
    const {onClick} = this.props;
    const {animScale} = this.state;
    animScale.setValue(1.0);
    onClick();
  }

  render() {
    const {children, outerStyle, style, disabled} = this.props;
    const {animScale} = this.state;

    // Spring on touch
    return (
      <Animated.div
        className="Tappable"
        style={{...outerStyle, opacity: animScale}}>
        {disabled
          ? <div
            className="Tappable-inner Tappable-disabled"
            style={style}>{children}</div>
          : <div
            className="Tappable-inner"
            style={style}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseOut={this.onMouseUp}
            onClick={this.onClick}>{children}</div>}
      </Animated.div>
    );
  }
}

Tappable.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  outerStyle: PropTypes.object
};
Tappable.defaultProps = {
  style: {},
  outerStyle: {},
  disabled: false
};

export default Tappable;