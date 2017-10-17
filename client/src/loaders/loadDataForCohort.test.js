import fs from 'fs';
import __uniq from 'lodash/uniq';
import {
  loadDataForCohort,
  defaultConfig,
  rotatedVariantsForProfiles
} from './loadDataForCohort.js';

function mockCsvFetches() {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
}

describe('loadDataForCohort', () => {
  it('has valid data files checked in', async () => {
    mockCsvFetches();
    const {cohortNumber, students} = await loadDataForCohort('foo', defaultConfig);
    expect(cohortNumber).toEqual(4);
    expect(students.length).toEqual(10);
    expect(__uniq(students.map(s => s.argumentTexts.length))).toEqual([4]);
  });

  it('rotates by cohortCode, in correct range', async () => {
    mockCsvFetches();
    expect((await loadDataForCohort('c', defaultConfig)).cohortNumber).toEqual(9);
    expect((await loadDataForCohort('d', defaultConfig)).cohortNumber).toEqual(0);
    expect((await loadDataForCohort('e', defaultConfig)).cohortNumber).toEqual(1);
  });
  
  it('rotates by cohortCode, no negatives', async () => {
    mockCsvFetches();
    expect((await loadDataForCohort('abcdef', defaultConfig)).cohortNumber).toEqual(9);
    expect((await loadDataForCohort('abcdee', defaultConfig)).cohortNumber).toEqual(0);
    expect((await loadDataForCohort('abcded', defaultConfig)).cohortNumber).toEqual(1);
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