import fs from 'fs';
import {loadDataForCohort} from './loadDataForCohort.js';

it('has valid data files checked in', async () => {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/manipulations.csv').toString());
  const {cohortNumber, students} = await loadDataForCohort('foo');
  expect(cohortNumber).toBe(4);
  expect(students.length).toBe(5);
});
