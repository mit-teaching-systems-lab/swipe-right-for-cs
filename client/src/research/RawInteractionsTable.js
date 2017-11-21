import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import {Table, Column, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';

// Show a virtualized table of all interactions as JSON
class RawInteractionsTable extends React.Component {
  render() {
    const {interactions} = this.props;
    const marginRight = 10;
    return (
      <div style={{
        marginRight,
        marginBottom: 100,
        border: '1px solid #eee',
        fontSize: 10
      }}>
        <AutoSizer disableHeight>
          {({width}) => (
            <Table
              headerHeight={30}
              height={400}
              rowCount={interactions.length}
              rowGetter={({index}) => interactions[index]}
              rowHeight={200}
              width={width - marginRight}
            >
              <Column
                dataKey="id"
                label="id"
                width={50} />
              <Column
                dataKey="session"
                label="session"
                width={200}
                flexGrow={1}
                cellRenderer={this.renderJSON} />
              <Column
                dataKey="interaction"
                label="interaction"
                width={200}
                flexGrow={1}
                cellRenderer={this.renderJSON} />
              <Column
                dataKey="timestampz"
                label="timestampz"
                width={150}
                cellRenderer={this.renderDate} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }

  renderJSON({cellData}) {
    return <pre>{JSON.stringify(cellData, null, 2)}</pre>;
  }

  renderDate({cellData}) {
    const date = new Date(cellData);
    return (
      <div>
        <div>{dateFormat(date, 'mm/dd/yy')}</div>
        <div>{dateFormat(date, 'hh:mm:ss')}</div>
      </div>
    );
  }
}
RawInteractionsTable.propTypes = {
  interactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RawInteractionsTable;