import React from 'react';
// import PropTypes from 'props-types';
import { storiesOf } from '@storybook/react';
import {loadDataForCohort, defaultOptions} from './loadDataForCohort.js';

class AsyncWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: true,
      resolve: undefined,
      reject: undefined
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    const {async} = this.props;
    async()
      .then(resolve => this.setState({resolve, isPending: false}))
      .catch(reject => this.setState({reject, isPending: false}));
  }
  render() {
    console.log('render');
    const {children} = this.props;
    const {isPending, resolve, reject} = this.state;
    return children({isPending, resolve, reject});
  }
}
// AsyncWrapper.propTypes = {
//   async: PropTypes.func.isRequired,
//   children: PropTypes.func.isRequired
// };

storiesOf('loadDataForCohort', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return (
      <AsyncWrapper async={() => loadDataForCohort('foo', defaultOptions)}>
        {(params) => {
          console.log('inside');
          return <pre>{JSON.stringify(params, null, 2)}</pre>;
        }}
      </AsyncWrapper>
    );
  });