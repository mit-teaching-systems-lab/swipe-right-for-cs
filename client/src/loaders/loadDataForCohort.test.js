import fs from 'fs';
import uuid from 'uuid';
import __uniq from 'lodash/uniq';
import __uniqWith from 'lodash/uniqWith';
import __sortBy from 'lodash/sortBy';
import __range from 'lodash/range';
import __isEqual from 'lodash/isEqual';

import {
  loadDataForCohort,
  defaultOptions,
  rotatedVariantsForProfiles,
  shuffleInBuckets
} from './loadDataForCohort.js';

function mockCsvFetches() {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
}

describe('loadDataForCohort', () => {
  it('has valid data files checked in', async () => {
    mockCsvFetches();
    const {cohortNumber, students} = await loadDataForCohort('foor', defaultOptions);
    expect(cohortNumber).toEqual(3);
    expect(students.length).toEqual(10);
    expect(__uniq(students.map(s => s.argumentTexts.length))).toEqual([4]);
  });

  it('buckets samples into cohortCodes that all fall in the correct range', async () => {
    const runs = [];
    for (var i = 0; i < 100; i++) {
      mockCsvFetches();  
      runs.push((await loadDataForCohort(uuid.v4(), defaultOptions)).cohortNumber);
    }
    expect(__uniq(runs).sort()).toEqual(__range(0, 10));
  });
});

describe('createProfilesForCohort', () => {
  describe('with random samples of cohortCodes', async () => {
    async function sampleRuns(n, cohortNumberFn) {
      const runs = [];
      for (var i = 0; i < n; i++) {
        mockCsvFetches();
        runs.push(await loadDataForCohort(cohortNumberFn(), defaultOptions));
      }
      return runs;
    }

    it('uses consistent profileName and ordering', async () => {
      const runs = await sampleRuns(100, () => uuid.v4());

      // Ensure all runs have the same profileNames
      const uniqueRunsByName = __uniqWith(runs.map(run => {
        const profileNames = run.students.map(student => student.profileName);
        return __sortBy(profileNames);
      }), __isEqual);
      expect(uniqueRunsByName.length).toEqual(1);

      // Ensure all runs have the same profileKeys
      const uniqueRunsByKey = __uniqWith(runs.map(run => {
        const profileKeys = run.students.map(student => student.profileKey);
        return __sortBy(profileKeys);
      }), __isEqual);
      expect(uniqueRunsByKey.length).toEqual(1);
    });

    it('with a cohort, uses consistently shuffled argumentTexts', async () => {
      const runs = await sampleRuns(10, () => 'foo');

      // Ensure argument order for each student is consistent across
      // runs within the cohort.
      const uniqueOrders = __uniqWith(runs.map(run => {
        return run.students.map(student => student.argumentTexts);
      }), __isEqual);
      expect(uniqueOrders.length).toEqual(1);
    });
  });
});

describe('shuffleInBuckets', () => {
  const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  // This uses an input list, and runs through each midpoint, 
  // checking that the shuffling is done correctly.
  it('shuffles them correctly at various midpoints', () => {
    __range(0, 11).forEach(cohortNumber => {
      __range(0, input.length).forEach(midpoint => {
        const runs = __range(0, 20).map(i => {
          const shuffled = shuffleInBuckets(input, midpoint, cohortNumber);
          return {
            left: shuffled.slice(0, midpoint),
            right: shuffled.slice(midpoint)
          };
        });

        // Check that shuffling happened according to partitions
        // and that there are different combinations.
        const lefts = __uniqWith(runs.map(run => run.left), __isEqual);
        const rights = __uniqWith(runs.map(run => run.right), __isEqual);
        expect(rights.length).toBeGreaterThan(0);
        expect(lefts.length).toBeGreaterThan(0);

        // Ensure that they all have the same set
        const leftSets = __uniqWith(runs.map(run => __sortBy(run.left)), __isEqual);
        const rightSets = __uniqWith(runs.map(run => __sortBy(run.right)), __isEqual);
        expect(leftSets.length).toEqual(1);
        expect(rightSets.length).toEqual(1);
        expect(leftSets[0].concat(rightSets[0])).toEqual(input);
      });
    });
  });

  it('is deterministic for a cohortNumber', () => {
    __range(0, 11).forEach(cohortNumber => {
      const first = shuffleInBuckets(input, 5, cohortNumber);
      const second = shuffleInBuckets(input, 5, cohortNumber);
      expect(first).toEqual(second);
    });
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