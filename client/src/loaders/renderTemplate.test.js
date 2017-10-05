import renderTemplate from './renderTemplate.js';

it('renders', () => {
  const template = '{{Name}} ran until {{he}} was tired.';
  expect(renderTemplate(template, { Name: 'Kevin', he: 'he' })).toBe('Kevin ran until he was tired.');
});

it('is does not eval naively', () => {
  const template = "global.foo = '{{Name}}';";
  expect(renderTemplate(template, { Name: 'Kevin' })).toBe("global.foo = 'Kevin';");
  expect(global.foo).toBe(undefined); // eslint-disable-line no-undef
});
