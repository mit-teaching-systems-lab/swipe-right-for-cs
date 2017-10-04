import createProfiles from './createProfiles.js';

it('returns no students when array lengths do not match', async () => {
  const students = createProfiles([], [2]);
  expect(students.length).toBe(0);
});
