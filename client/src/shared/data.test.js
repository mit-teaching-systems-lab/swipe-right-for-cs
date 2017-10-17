import {
  hashCode,
} from './data.js';

describe('hashCode', () => {
  it('works', async () => {
    expect(hashCode('a')).toEqual(1769416289);
    expect(hashCode('abcde')).toEqual(2245310342);
    expect(hashCode('abcdef')).toEqual(2350159758);
    expect(hashCode('{"item":5,"cohortNumber":1}')).toEqual(1186745993);
    expect(hashCode('{"item":9,"cohortNumber":1}')).toEqual(3095721868);
  });
});