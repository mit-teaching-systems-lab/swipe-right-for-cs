import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileSimulator from '../components/MobileSimulator.js';
import '../index.css';


export function LargePhone(props) {
  const {children} = props;
  return (
    <div style={{width: 375, height: 667, border: '1px solid black', overflow: 'hidden'}}>{children}</div>
  );
}
LargePhone.propTypes = {
  children: PropTypes.node.isRequired
};

export function SmallPhone(props) {
  const {children} = props;
  return (
    <div style={{width: 320, height: 444, border: '1px solid black', overflow: 'hidden'}}>{children}</div>
  );
}
SmallPhone.propTypes = {
  children: PropTypes.node.isRequired
};

export function Desktop(props) {
  const {children} = props;
  return (
    <MobileSimulator minWidth={10} minHeight={10} forceIsNotWide={true}>{children}</MobileSimulator>
  );
}
Desktop.propTypes = {
  children: PropTypes.node.isRequired
};


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


// Development only.  A frame for showing stories so they look like
// they are in the product.
export function withFrameSwitcher(children) {
  return (
    <div>
      <Select values={['desktop', 'small', 'large']} render={(key) => {
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