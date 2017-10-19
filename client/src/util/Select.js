import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Select between string values, for use in Storybook
class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.values[0]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const {values, render} = this.props;
    const {value} = this.state;
    return (
      <div>
        <select value={value} onChange={this.onChange}>
          {values.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        {render(value)}
      </div>
    );
  }
}
Select.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  render: PropTypes.func.isRequired
};

export default Select;