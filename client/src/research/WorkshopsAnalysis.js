import React from 'react';
import PropTypes from 'prop-types';
import __uniq from 'lodash/uniq';
import __groupBy from 'lodash/groupBy';
import __toPairs from 'lodash/toPairs';
import __minBy from 'lodash/minBy';
import __maxBy from 'lodash/maxBy';
import dateFormat from 'dateformat';
import {Table, Column, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';

// function computeChartData(interactions, key) {
//   // Filter to rating interactions only
//   const ratings = interactions.filter(row => {
//     return (row.interaction.type === InteractionTypes.STUDENT_RATING);
//   });

//   // Flatten into [{groupingKey, ratingValue, percentage}]
//   const grouped = __groupBy(ratings, row => row.interaction.student[key]);
//   const countByGroupKey = __mapValues(grouped, values => values.length);
//   const data = __mapValues(grouped, values => __countBy(values, row => row.interaction.choiceIndex));
//   const chartDataPoints = __flatten(Object.keys(data).map(groupingKey => {
//     const ratingValues = Object.keys(data[groupingKey]);
//     return ratingValues.map(ratingValue => {
//       const percentage = data[groupingKey][ratingValue] / countByGroupKey[groupingKey];
//       return { x: groupingKey, ratingValue, y: percentage };
//     });
//   }));

//   // Figure out sort order for data points and labels
//   const SORT_BY_CHOICE_INDEX = '0';
//   const unsortedLabels = __uniq(chartDataPoints.map(d => d.x));
//   const labels = __sortBy(unsortedLabels, label => {
//     const d = chartDataPoints.find(d => d.ratingValue === SORT_BY_CHOICE_INDEX && d.x === label);
//     return -1 * d.y;
//   });
//   const sortedDataPoints = __sortBy(chartDataPoints, d => labels.indexOf(d.x));

//   // Group into series the way Victory expects and strip out extra fields.
//   // Victory passes through this data to underlying SVG elements for the
//   // chart, which causes React warnings ir they're not SVG attributes.
//   const chartData = __mapValues(__groupBy(sortedDataPoints, 'ratingValue'), ds => {
//     return ds.map(d => __pick(d, ['x', 'y']));
//   });

//   return {chartData, labels};
// // }

// --- show me workshops and how many people:
// SELECT
//   session->'workshopCode' as workshop_code,
//   count(distinct session->>'identifier') as identifier_count,
//   count(*) as interactions_count,
//   EXTRACT(epoch from (MAX(timestampz) - MIN(timestampz))) /60 as minutes,
//   CONCAT(MIN(timestampz),' - ', MAX(timestampz)) as time_range
// FROM interactions
// GROUP BY workshop_code
// ORDER BY identifier_count DESC, workshop_code ASC;

function summarizeWorkshops(allInteractions) {
  return __toPairs(__groupBy(allInteractions, row => row.session.workshopCode)).map(pair => {
    const [workshopCode, interactions] = pair;
    const identifierCount = __uniq(interactions.map(row => row.session.identifier)).length;
    const timeStart = __minBy(interactions, 'timestampz').timestampz;
    const timeEnd = __maxBy(interactions, 'timestampz').timestampz;
    return {
      workshopCode,
      identifierCount,
      timeStart: dateFormat(new Date(timeStart), 'mm/dd/yy   hh:mm:ss'),
      timeEnd: dateFormat(new Date(timeEnd), 'mm/dd/yy   hh:mm:ss')
    };
  });
}

class WorkshopsAnalysis extends React.Component {
  render() {
    const {interactions} = this.props;
    const identifierCount = __uniq(interactions.map(row => row.session.identifier)).length;
    const workshops = summarizeWorkshops(interactions);

    return (
      <div>
        <div>code.org identifiers: {identifierCount}</div>
        {this.renderWorkshops(workshops)}
      </div>
    );
  }

  renderWorkshops(collection) {
    const marginRight = 10;
    return (
      <div style={{marginRight, border: '1px solid #eee'}}>
        <AutoSizer disableHeight>
          {({width}) => (
            <Table
              headerHeight={30}
              height={400}
              rowCount={collection.length}
              rowGetter={({index}) => collection[index]}
              rowHeight={50}
              width={width - marginRight}
            >
              <Column dataKey="workshopCode" label="workshopCode" width={150} />
              <Column dataKey="identifierCount" label="identifierCount" width={150} />
              <Column dataKey="timeStart" label="min(time)" width={200} />
              <Column dataKey="timeEnd" label="max(time)"  width={200} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
WorkshopsAnalysis.propTypes = {
  interactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WorkshopsAnalysis;