import _ from 'lodash';
import parseCsvSync from 'csv-parse/lib/sync';
import profileTemplatesFile from '../files/profileTemplates.csv';
import manipulationsFile from '../files/manipulations.csv';
import hashCode from '../util/hashCode.js';
import createProfiles from './createProfiles.js';


export async function loadDataForCohort(workshopCode) {
  const {profileTemplates, allManipulations} = await fetchBoth();
  return cohortAndStudents(workshopCode, profileTemplates, allManipulations);
}

export async function fetchBoth() {
  const texts = await fetchTexts();
  const [profileTemplatesText, manipulationsText] = texts;
  const profileTemplates = parseCsvSync(profileTemplatesText, { columns: true });
  const allManipulations = parseCsvSync(manipulationsText, { columns: true, 'auto_parse': true });
  return {profileTemplates, allManipulations}; 
}

async function fetchTexts() {
  return [
    await fetch(profileTemplatesFile).then(r => r.text()),
    await fetch(manipulationsFile).then(r => r.text())
  ];
}

// Determine cohort, apply manipulations
export function cohortAndStudents(workshopCode, profileTemplates, allManipulations) {
  const cohortCount = 1 + _.maxBy(allManipulations, 'cohort_number').cohort_number - _.minBy(allManipulations, 'cohort_number').cohort_number;
  const cohortNumber = hashCode(workshopCode) % cohortCount;
  const manipulations = _.filter(allManipulations, { 'cohort_number': cohortNumber });
  const students = createProfiles(profileTemplates, manipulations);
  return {cohortNumber, students};
}
