import React from 'react';
import PropTypes from 'prop-types';


// Delay rendering of child components with a timer
// Adapted from https://github.com/chrisshiplet/react-delay
class Delay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true
    };
    this.onDelayDone = this.onDelayDone.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(this.onDelayDone, this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onDelayDone() {
    const {onDone} = this.props;
    this.setState({ waiting: false }, () => {
      if (onDone) onDone();
    });
  }

  render() {
    if (!this.state.waiting) {
      return this.props.children;
    }

    return null;
  }
}

Delay.propTypes = {
  children: PropTypes.node.isRequired,
  wait: PropTypes.number.isRequired,
  onDone: PropTypes.func
};

Delay.defaultProps = {
  wait: 250
};

export default Delay;