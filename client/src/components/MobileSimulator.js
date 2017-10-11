import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Animated from 'animated/lib/targets/react-dom';
import './MobileSimulator.css';
import dragscroll from '../util/dragscroll.js';
import topImage from '../img/top.png';
import bottomImage from '../img/bottom.png';


// CSS adapted from https://framework7.io/examples/
class MobileSimulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animScale: new Animated.Value(1)
    };
    this.renderResponsiveFrame = this.renderResponsiveFrame.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    dragscroll(document.getElementsByClassName('MobileSimulator-dragscroll'));
  }
  
  onMouseDown() {
    const {animScale} = this.state;
    Animated.spring(animScale, { toValue: 1.1 }).start();
  }

  onMouseUp() {
    const {animScale} = this.state;
    animScale.stopAnimation(value =>
      Animated.spring(animScale, { toValue: 1 }).start()
    );
  }

  render() {
    const {minWidth, minHeight} = this.props;
    const query = `(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`;
    return <Media query={query}>{this.renderResponsiveFrame}</Media>;
  }

  renderResponsiveFrame(isNotWide) {
    const {children} = this.props;
    if (!isNotWide) return <div className="MobileSimulator-not-wide Global-background-color">{children}</div>;
    
    const {animScale} = this.state;
    return (
      <div className="MobileSimulator">
        <Animated.div style={{transform: [{scale: animScale}]}}>
          <div className="MobileSimulator-phone">
            <div className="MobileSimulator-safari">
              <img
                className="MobileSimulator-top"
                alt="Menu"
                src={topImage}
                width="100%"
                height={64}
                onMouseDown={this.onMouseDown}
                onMouseOut={this.onMouseUp}
                onMouseUp={this.onMouseUp} />
              <div className="MobileSimulator-background MobileSimulator-dragscroll Global-background-color">
                {children}
              </div>
              <img
                className="MobileSimulator-bottom"
                alt="Buttons"
                src={bottomImage}
                width="100%"
                height={42}
                onMouseDown={this.onMouseDown}
                onMouseOut={this.onMouseUp}
                onMouseUp={this.onMouseUp} />
            </div>
            <div
              className="MobileSimulator-button"
              onMouseDown={this.onMouseDown}
              onMouseOut={this.onMouseUp}
              onMouseUp={this.onMouseUp} />
          </div>
        </Animated.div>
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