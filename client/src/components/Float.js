import React from 'react';
import './Float.css';
import PropTypes from 'prop-types';

// A floating button, Material-style
class Float extends React.Component {
  render() {
    const {children, style} = this.props;
    return <div className="Float" style={style}>{children}</div>;
  }
}

Float.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};
Float.defaultPropTypes = {
  style: {}
};

export default Float;