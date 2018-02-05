import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


// Render a set of links that will download a CSV
// This splits across multiple links, since large CSV cause problems
// in browsers.
class DownloadCsvLinks extends Component {
  render() {  
    const {headers, rows, chunkSize} = this.props;
    const chunks = _.chunk(rows, chunkSize);
    return (
      <div className="DownloadCsvLinks">
        <div>Download CSV files:</div>
        {chunks.map((chunkRows, index) => this.renderChunkLink(headers, chunkRows, index))}
      </div>
    );
  }

  renderChunkLink(headers, rows, index) {
    const {filename, toLine, delimiter} = this.props;
    const lines = rows.map(row => toLine(row).join(delimiter));
    const csvText = [headers.join(delimiter)].concat(lines).join("\n");
    const chunkFilename = `${index}-${filename}`;

    return (
      <div key={index}>
        <a
          href= {`data:attachment/csv,${window.encodeURIComponent(csvText)}`}
          target="_blank"
          download={chunkFilename}
          style={{paddingLeft: 20}}
        >{chunkFilename}</a>
      </div>
    );
  }
}

DownloadCsvLinks.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
  toLine: PropTypes.func.isRequired,
  chunkSize: PropTypes.number,
  delimiter: PropTypes.string
};
DownloadCsvLinks.defaultProps = {
  chunkSize: 1000,
  delimiter: "\t"
};

export default DownloadCsvLinks;