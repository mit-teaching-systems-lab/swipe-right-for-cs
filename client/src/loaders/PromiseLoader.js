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
    console.log('promiseloader');
    const {promiseFn} = this.props;
    promiseFn()
      .then(this.onResolved)
      .catch(this.onRejected);
  }

  onResolved(resolve) {
    console.log('resolved',resolve);
    const {dataP} = this.state;
    console.log('datap',dataP);
    this.setState({ dataP: {...dataP, resolve} });
    // this.setState({ dataP: promiseState(false, resolve, undefined) });
  }

  onRejected(reject) {
    console.log('rejected');
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