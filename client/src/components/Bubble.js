import React from 'react';
import './Bubble.css';
import PropTypes from 'prop-types';

// A speech bubble
class Bubble extends React.Component {
  render() {
    const {children} = this.props;
    return <div className="Bubble">{children}</div>;
  }
}

Bubble.propTypes = {
  children: PropTypes.node.isRequired
};

export default Bubble;