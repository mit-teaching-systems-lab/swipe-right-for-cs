import __shuffle from 'lodash/shuffle';
import __flatten from 'lodash/flatten';
import parseCsvSync from 'csv-parse/lib/sync';
import profileTemplatesFile from '../files/profileTemplates.csv';
import sortedVariantsFile from '../files/sortedVariants.csv';
import hashCode from '../util/hashCode.js';
import {createProfiles} from './createProfiles.js';


export async function loadDataForCohort(workshopCode, options = {}) {
  const {profileTemplates, variants} = await fetchBoth();
  return cohortAndStudents(workshopCode, profileTemplates, variants, options);
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

// Determine cohort, apply manipulations, shuffle order on each game
export function cohortAndStudents(workshopCode, profileTemplates, variants, options = {}) {
  // Tune number of arguments, cohorts, max profiles shown
  const argumentCount = options.argumentCount || 5;
  const cohortCount = options.cohortCount || 10;
  const maxProfileCount = options.maxProfileCount || 10;

  // Bucket into cohorts
  const cohortNumber = hashCode(workshopCode) % cohortCount;

  // Rotate the variants shown to each cohort
  const rotatedVariants = rotatedVariantsForProfiles(cohortNumber, profileTemplates, variants);

  // Within a game, randomly shuffle the order of variants shown
  const shuffledVariants = __shuffle(rotatedVariants);

  // Within a game, randomly shuffle the order of profiles shown
  const shuffledProfileTemplates = __shuffle(profileTemplates);

  // If there is a mismatch between the number of profiles and variants,
  // log that and show the top n profiles.
  const profileCount = Math.min(maxProfileCount, shuffledVariants.length, shuffledProfileTemplates.length);
  const slicedProfileTemplates = shuffledProfileTemplates.slice(0, profileCount);
  const slicedVariants = shuffledVariants.slice(0, profileCount);

  // Create actual concrete student profiles
  const students = createProfiles(slicedProfileTemplates, slicedVariants, argumentCount);
  return {cohortNumber, students};
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