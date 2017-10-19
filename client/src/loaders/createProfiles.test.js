import fs from 'fs';
import {createProfiles, imageFor} from './createProfiles.js';
import parseCsvSync from 'csv-parse/lib/sync';

it('warns when profiles and variants array lengths do not match', async () => {
  expect(() => createProfiles([], [2], 1)).toThrow(new Error('createProfiles called with 0 profiles and 1 variants'));
  expect(console.warn).toHaveBeenCalled(); // eslint-disable-line no-console
});


it('finds image files on disk matching sortedVariants.csv', () => {
  const sortedVariantsText = fs.readFileSync('./src/files/sortedVariants.csv').toString();
  const sortedVariants = parseCsvSync(sortedVariantsText, { columns: true });
  const imageKeys = sortedVariants.map(row => row.image_key);
  imageKeys.forEach((imageKey) => {
    expect([imageKey, imageFor(imageKey)]).not.toEqual([imageKey, undefined]);
  });
});


describe('with profileTemplates and variants', () => {
  const profileTemplates = [{
    "profile_key": 'journalist',
    "profile_template": '{{Name}} hopes to apply for a journalism internship next summer and has been working hard at improving {{his}} writing all semester.',
    "argument_1": 'It looks really good on your resume to take a computer science class, because it tells employers that you’re knowledgeable about a topic that’s really important. ',
    "argument_2": 'Computer science creates so many new ways to express your creativity, whether it\'s generating images or videos,  creating interactive stories, or making new kinds of media altogether.',
    "argument_3": 'Computing is ubiquitous. Learning about computer science will help you understand the world around you.',
    "argument_4": 'The world needs active and informed citizens of the world, and computer science is now necessary knowledge in order to actively participate in a democracy. '
  }, {
    "profile_key": 'jokester',
    "profile_template": '{{Name}} can always get the class cackling with {{his}} running commentary, but especially when {{he}} starts doing impersonations. Somehow {{he}}\'s able to do it in a way that everyone can laugh at it.',
    "argument_1": 'You\'ll have so many career opportunities - high income, job flexibility, lots of options.',
    "argument_2": 'There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.',
    "argument_3": 'Computing is part of designing new products, not just technical ones.  This isn\'t just gadgets and apps either, there are even wearable computers now.',
    "argument_4": 'Learning CS can help you connect or build global communities that share your interests and passions.'
  }, {
    "profile_key": 'hardworker',
    "profile_template": '{{Name}} is always studying and working diligently to be successful in {{his}} classes because {{he}} wants to be the first in {{his}} family to go to college.',
    "argument_1": 'Understanding how to use computing is an important skill for leaders in most every field.',
    "argument_2": 'There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.',
    "argument_3": 'Computing is part of designing new products, not just technical ones.  This isn\'t just gadgets and apps either, there are even wearable computers now.',
    "argument_4": 'Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. '
  }];

  const variants = [
    { "image_key": 'IM2', name: 'Raj', he: 'he', his: 'his', him: 'him' },
    { "image_key": 'IF2', name: 'Sonali', he: 'she', his: 'her', him: 'her' },
    { "image_key": 'WF2', name: 'Meredith', he: 'she', his: 'her', him: 'her' }
  ];
    

  it('works', () => {
    const profiles = createProfiles(profileTemplates, variants, 4);
    expect(profiles.map(profile => profile.profileName)).toEqual([
      'Raj',
      'Sonali',
      'Meredith'
    ]);
    expect(profiles.map(profile => profile.profileKey)).toEqual([
      'journalist',
      'jokester',
      'hardworker'
    ]);
    expect(profiles.map(profile => profile.profileImageKey)).toEqual([
      'IM2',
      'IF2',
      'WF2'
    ]);
  });
});
