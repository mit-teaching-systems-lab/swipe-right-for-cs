import React from 'react';
import PropTypes from 'prop-types';


function promiseState(isPending, resolve, reject) {
  return {
    isPending: isPending,
    resolve: resolve,
    reject: reject
  };
}

// Executes a promise, passes state changes to children.
class PromiseLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataP: promiseState(true, undefined, undefined)
    };
    this.onResolved = this.onResolved.bind(this);
    this.onRejected = this.onRejected.bind(this);
  }

  componentDidMount() {
    const {promiseFn} = this.props;
    promiseFn()
      .then(result => {
        if (result.length > 0) {
          this.onResolved(result);
        } else{
          this.onRejected(result);
        }
      })
      .catch();
  }

  onResolved(resolve) {
    this.setState({ dataP: promiseState(false, resolve, undefined) });
  }

  onRejected(reject) {
    this.setState({ dataP: promiseState(false, false, true) });
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