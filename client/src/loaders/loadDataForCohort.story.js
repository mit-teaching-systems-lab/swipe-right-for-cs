import React from 'react';
import __sortBy from 'lodash/sortBy';
import __findIndex from 'lodash/findIndex';
import { storiesOf } from '@storybook/react';
import {loadDataForCohort, defaultOptions} from './loadDataForCohort.js';
import AsyncStoryWrapper from '../util/AsyncStoryWrapper.js';
import Select from '../util/Select.js';
import StudentProfile from '../StudentProfile.js';


storiesOf('Research/loadDataForCohort', module) //eslint-disable-line no-undef
  .add('normal', () => {
    // render across multiple workshop codes in columns
    const workshopCodes = [
      'foo',
      'demo',
      'xxx'
    ];

    // allow different sorting, to see display order
    // or to compare conditions.
    // load data using AsyncStoryWrapper
    return (
      <Select
        values={['none', 'profileKey', 'profileName']}
        render={sortKey =>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {workshopCodes.map(workshopCode =>
              <AsyncStoryWrapper
                key={workshopCode}
                async={() => loadDataForCohort(workshopCode, defaultOptions)}>
                {(params) => {
                  const {isPending, resolve, reject} = params;
                  if (isPending) return <pre>Loading...</pre>;
                  if (reject) return <pre>{JSON.stringify(reject, null, 2)}</pre>;

                  const {cohortNumber, students} = resolve;
                  return renderColumn(workshopCode, cohortNumber, students, sortKey);
                }}
              </AsyncStoryWrapper>
            )}
          </div>
        }
      />
    );
  });


function renderColumn(workshopCode, cohortNumber, students, sortKey) {
  const height = '6em'; // fixed so it looks like a grid
  const sorter = {
    profileKey: 'profileKey',
    profileName: 'profileName'
  }[sortKey];
  const sortedStudents = (sorter) ? __sortBy(students, sorter) : students;

  return (
    <div style={{background: 'white'}}>
      <div>workshopCode: {workshopCode}</div>
      <div>cohortNumber: {cohortNumber}</div>
      <div>
        {sortedStudents.map(student => {
          const studentNumber = __findIndex(students, student) + 1;
          return (
            <div key={student.profileName}>
              <div style={{
                fontWeight: 'bold',
                background: '#333',
                color: 'white',
                padding: 5
              }}>
                #{studentNumber}: {student.profileName} / {student.profileKey}
              </div>
              <StudentProfile {...student} style={{height: 200, marginBottom: 50}} />
              <div>{student.argumentTexts.map((text, argumentIndex) =>
                <div key={text} style={{
                  height,
                  padding: 10,
                  border: '1px solid #eee',
                  overflow: 'hidden',
                  fontSize: 12
                }}>
                  {String.fromCharCode('a'.charCodeAt() + argumentIndex)}. {text}
                </div>
              )}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
