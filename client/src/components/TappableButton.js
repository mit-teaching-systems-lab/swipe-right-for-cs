import React, { Component } from 'react';
import './TappableButton.css';
import PropTypes from 'prop-types';
import Tappable from './Tappable.js';


// A tappable button
class TappableButton extends Component {
  render() {
    const {onClick} = this.props;
    const {children, outerStyle, style, disabled} = this.props;

    // Spring on touch
    return (
      <Tappable
        onClick={onClick}
        outerStyle={outerStyle}
        disabled={disabled}>
        {disabled
          ? <div className="TappableButton-inner TappableButton-disabled" style={style}>{children}</div>
          : <div className="TappableButton-inner" style={style}>{children}</div>}
      </Tappable>
    );
  }
}

TappableButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  outerStyle: PropTypes.object
};
TappableButton.defaultProps = {
  style: {},
  outerStyle: {},
  disabled: false
};

export default TappableButton;