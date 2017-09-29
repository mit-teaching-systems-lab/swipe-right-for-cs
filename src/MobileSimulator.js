import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import './MobileSimulator.css';
import topImage from './img/top.png';
import bottomImage from './img/bottom.png';

// CSS adapted from https://framework7.io/examples/
class MobileSimulator extends Component {
  constructor(props) {
    super(props);
    this.renderResponsiveFrame = this.renderResponsiveFrame.bind(this);
    this.onClickFake = this.onClickFake.bind(this);
  }

  onClickFake() {
    alert('Not really...');
  }
  render() {
    const {minWidth, minHeight} = this.props;
    const query = `(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`;
    return <Media query={query}>{this.renderResponsiveFrame}</Media>;
  }

  renderResponsiveFrame(isNotWide) {
    const {children} = this.props;
    if (!isNotWide) return children;
    
    return (
      <div className="MobileSimulator">
        <div className="MobileSimulator-phone">
          <div className="MobileSimulator-safari">
            <img
              className="MobileSimulator-top"
              alt="Menu"
              src={topImage}
              width="100%"
              height={64}
              onClick={this.onClickFake} />
            <div className="MobileSimulator-background">
              {children}
            </div>
            <img
              className="MobileSimulator-bottom"
              alt="Buttons"
              src={bottomImage}
              width="100%"
              height={42}
              onClick={this.onClickFake} />
          </div>
          <div
            className="MobileSimulator-button"
            onClick={this.onClickFake} />
        </div>
      </div>
    );
  }
}
MobileSimulator.propTypes = {
  minWidth: PropTypes.number.isRequired,
  minHeight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default MobileSimulator;