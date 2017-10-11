import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileSimulator from '../components/MobileSimulator.js';
import '../index.css';


// Development only.  A frame for showing stories so they look like
// they are in the product.
export function LargePhone(props) {
  const {children} = props;
  return (
    <div style={{width: 374, height: 667, border: '1px solid black', overflow: 'hidden'}}>{children}</div>
  );
}

export function SmallPhone(props) {
  const {children} = props;
  return (
    <div style={{width: 374, height: 444, border: '1px solid black', overflow: 'hidden'}}>{children}</div>
  );
}

export function Desktop(props) {
  const {children} = props;
  return (
    <MobileSimulator minWidth={10} minHeight={10} forceIsNotWide={true}>{children}</MobileSimulator>
  );
}

// Select between string values
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


export function withFrameSwitcher(children) {
  return (
    <div>
      <Select values={['large', 'small', 'desktop']} render={(key) => {
        const frameMap = {
          large: LargePhone,
          small: SmallPhone,
          desktop: Desktop
        };
        const Frame = frameMap[key];
        return <Frame>{children}</Frame>;
      }} />
    </div>
  );
}