import React from 'react';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';

// A colored in bubble for a chart like Milkman et al. 2015
class DataBubble extends React.Component {
  render() {
    const {percentage, n} = this.props;
    const colors = chroma.scale(['white','#006837']);
    const color =  colors(n/50).brighten(1).hex();
    const title = `${Math.round(percentage)}%\nn=${n}`;
    const styles = {
      backgroundColor: color,
      height: percentage,
      width: percentage,
      borderRadius: 100, 
    };
    return <div
      className="DataBubble"
      style={styles}
      title={title} />;
  }
}

DataBubble.propTypes = {
  percentage: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired
};

export default DataBubble;