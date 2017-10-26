import React from 'react';
import PropTypes from 'prop-types';


function promiseState() {
  return {
    isPending: true,
    resolve: undefined,
    reject: undefined
  };
}

// Executes a promise, passes state changes to children.
class PromiseLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataP: promiseState()
    };
    this.onResolved = this.onResolved.bind(this);
    this.onRejected = this.onRejected.bind(this);
  }

  componentDidMount() {
    const {promiseFn} = this.props;
    promiseFn()
      .then(this.onResolved)
      .then(this.onRejected);
  }

  onResolved(resolve) {
    const {dataP} = this.state;
    this.setState({ dataP: {...dataP, resolve} });
  }

  onRejected(reject) {
    const {dataP} = this.state;
    this.setState({ dataP: {...dataP, reject} });
  }

  render() {
    const {dataP} = this.state;
    const {children} = this.props;

    return children(dataP);
  }
}
PromiseLoader.propTypes = {
  promiseFn: PropTypes.func.isRequired,
  children: PropTypes.PropTypes.func.isRequired
};

export default PromiseLoader;