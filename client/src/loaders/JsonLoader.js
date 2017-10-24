import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PromiseLoader from './PromiseLoader';
import qs from 'query-string';
import _ from 'lodash';


// Fetch JSON, showing default loading and error states, and
// then rendering the child fn when there's data.
class JsonLoader extends Component {
  constructor(props) {
    super(props);
    this.fetchJson = this.fetchJson.bind(this);
  }

  fetchJson() {
    const {path, query, options} = this.props;
    const url = (_.isEmpty(query))
      ? path
      : `${path}?${qs.stringify(query)}`;
    return fetch(url, options).then(r => r.json());
  }

  render() {
    return (
      <PromiseLoader promiseFn={this.fetchJson}>
        {promiseState => this.renderPromiseStates(promiseState)}
      </PromiseLoader>
    );
  }

  renderPromiseStates(promiseState) {
    if (promiseState.isPending) return <div>Loading...</div>;
    if (promiseState.reject) return <div>There was an error.</div>;
    return this.renderJson(promiseState.resolve);
  }

  renderJson(json) {
    const {children} = this.props;
    return children(json);
  }
}
JsonLoader.propTypes = {
  path: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  options: PropTypes.object,
  children: PropTypes.func.isRequired
};
JsonLoader.defaultProps = {
  query: {},
  options: {}
};

export default JsonLoader;