import React, { Component } from 'react';
import PropTypes from 'prop-types';
import percentRightPerProfile from './calculations';

class BubbleChart extends Component{
  render(){
    const interactions = this.props.swipeInteractions.filter();

    return interactions.map(row => {percentRightPerProfile(interactions, 'profile');
    });
      
			
  }
}

BubbleChart.propTypes = {
  swipeInteractions: PropTypes.array.isRequired
};

export default BubbleChart;