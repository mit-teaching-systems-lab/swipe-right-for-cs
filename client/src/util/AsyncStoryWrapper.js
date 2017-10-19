import React from 'react';
import PropTypes from 'prop-types';

// For loading stories that need some data fed to them as part of
// the story (stories need to return React components synchronously).
class AsyncStoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: true,
      resolve: undefined,
      reject: undefined
    };
  }

  componentDidMount() {
    const {async} = this.props;
    async()
      .then(resolve => this.setState({resolve, isPending: false}))
      .catch(reject => this.setState({reject, isPending: false}));
  }
  render() {
    const {children} = this.props;
    const {isPending, resolve, reject} = this.state;
    return children({isPending, resolve, reject});
  }
}
AsyncStoryWrapper.propTypes = {
  async: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export default AsyncStoryWrapper;