import fs from 'fs';
import {
  loadDataForCohort,
  rotatedVariantsForProfiles
} from './loadDataForCohort.js';

describe('loadDataForCohort', () => {
  it('has valid data files checked in', async () => {
    fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
    fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
    const {cohortNumber, students} = await loadDataForCohort('foo');
    expect(cohortNumber).toEqual(4);
    expect(students.length).toEqual(5);
  });
});

describe('rotatedVariantsForProfiles', () => {
  const profiles = ['a', 'b'];
  const variants = ['x', 'y', 'z'];
  it('rotates properly', () => {
    expect(rotatedVariantsForProfiles(0, profiles, variants)).toEqual(['x','y']);
    expect(rotatedVariantsForProfiles(1, profiles, variants)).toEqual(['y','z']);
    expect(rotatedVariantsForProfiles(2, profiles, variants)).toEqual(['z','x']);
  });
});