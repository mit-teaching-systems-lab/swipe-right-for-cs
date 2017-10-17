import {
  hashCode,
} from './data.js';

describe('hashCode', () => {
  it('works', async () => {
    expect(hashCode('a')).toEqual(97);
    expect(hashCode('abcde')).toEqual(92599395);
    expect(hashCode('abcdef')).toEqual(-1424385949);
  });
});