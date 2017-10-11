import fs from 'fs';
import {createProfiles, imageFor} from './createProfiles.js';
import parseCsvSync from 'csv-parse/lib/sync';

it('returns no students when array lengths do not match', async () => {
  const students = createProfiles([], [2], 1);
  expect(students.length).toBe(0);
});

it('finds image files on disk matching sortedVariants.csv', () => {
  const sortedVariantsText = fs.readFileSync('./src/files/sortedVariants.csv').toString();
  const sortedVariants = parseCsvSync(sortedVariantsText, { columns: true });
  const imageKeys = sortedVariants.map(row => row.image_key);
  imageKeys.forEach((imageKey) => {
    expect([imageKey, imageFor(imageKey)]).not.toEqual([imageKey, undefined]);
  });
});