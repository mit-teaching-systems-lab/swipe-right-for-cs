import __flatten from 'lodash/flatten';
import __defaults from 'lodash/defaults';
import __sortBy from 'lodash/sortBy';
import parseCsvSync from 'csv-parse/lib/sync';
import profileTemplatesFile from '../files/profileTemplates.csv';
import sortedVariantsFile from '../files/sortedVariants.csv';
import {hashCode} from '../shared/data.js';
import {createProfiles} from './createProfiles.js';


// Define config for experiment
export const defaultOptions = {
  argumentCount: 4,
  cohortCount: 10,
  maxProfileCount: 10,
  forcedProfileCount: 6
};

export async function loadDataForCohort(workshopCode, options = {}) {
  const {profileTemplates, variants} = await fetchBoth();
  return cohortCreateAndShuffle(workshopCode, profileTemplates, variants, options);
}

export async function fetchBoth() {
  const texts = await fetchTexts();
  const [profileTemplatesText, variantsText] = texts;
  const profileTemplates = parseCsvSync(profileTemplatesText, { columns: true });
  const variants = parseCsvSync(variantsText, { columns: true });
  return {profileTemplates, variants}; 
}

async function fetchTexts() {
  return [
    await fetch(profileTemplatesFile).then(r => r.text()),
    await fetch(sortedVariantsFile).then(r => r.text())
  ];
}

// Determine cohort, apply manipulations, shuffle ordering
export function cohortCreateAndShuffle(workshopCode, profileTemplates, variants, options = {}) {
  // Tune number of arguments, cohorts, max profiles shown
  const {
    cohortCount,
    forcedProfileCount,
    maxProfileCount,
    argumentCount
  } = __defaults({}, options, defaultOptions);

  // Bucket into cohort, and create profiles for cohort
  const cohortNumber = Math.abs(hashCode(workshopCode)) % cohortCount;
  const studentProfiles = createProfilesForCohort(cohortNumber, profileTemplates, variants, {
    maxProfileCount,
    argumentCount
  });

  // Bucket profiles list into left and right based on `forcedProfileCount`,
  // and shuffle within each bucket to ensure that left profiles are seen first.
  const shuffledStudents = shuffleInBuckets(studentProfiles, forcedProfileCount, cohortNumber);
  return {cohortNumber, students: shuffledStudents};
}


export function createProfilesForCohort(cohortNumber, profileTemplates, variants, options = {}) {
  const {maxProfileCount, argumentCount} = options;

  // Get the variants for the cohort (they're just rotated).
  const variantsForCohort = rotatedVariantsForProfiles(cohortNumber, profileTemplates, variants);

  // Truncate the number of profiles.
  const profileCount = Math.min(maxProfileCount, variantsForCohort.length, profileTemplates.length);
  const truncatedProfileTemplates = profileTemplates.slice(0, profileCount);
  
  // Zip together into concrete student profiles
  const truncatedVariants = variantsForCohort.slice(0, profileCount);
  return createProfiles(truncatedProfileTemplates, truncatedVariants, argumentCount);
}

// Rotate the variants shown to each cohort.
// For example, for cohort 1 show variants starting at 0, for cohort 2 show variants starting
// at 1.  Then truncate based on how many profiles are shown.  This will ensure that 
// cohorts see a consistent set of students, and the balancing depends on the number of cohorts,
// number of profiles, and the order of the variants.
export function rotatedVariantsForProfiles(cohortNumber, profileTemplates, variants) {
  const cohortVariants = __flatten([
    variants.slice(cohortNumber, variants.length),
    variants.slice(0, cohortNumber)
  ]);
  return cohortVariants.slice(0, profileTemplates.length);
}

// Partition the list at midpoint, and shuffle on both sides.
export function shuffleInBuckets(items, midpoint, cohortNumber) {
  return __flatten([
    consistentShuffleForCohort(items.slice(0, midpoint), cohortNumber),
    consistentShuffleForCohort(items.slice(midpoint, items.length), cohortNumber)
  ]);
}

// This consistently sorts `items` using the cohortNumber as a seed.
export function consistentShuffleForCohort(items, cohortNumber) {
  return __sortBy(items, item => {
    const key = JSON.stringify({item, cohortNumber});
    return hashCode(key);
  });
}