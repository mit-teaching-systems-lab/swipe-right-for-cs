import uuid from 'uuid';
import __range from 'lodash/range';
import __isEqual from 'lodash/isEqual';
import __uniqWith from 'lodash/uniqWith';

import {
  hashCode,
  consistentShuffleForKey
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

describe('consistentShuffleForKey', () => {
  it('is consistent on subsequent calls', () => {
    const first = consistentShuffleForKey([4,32,5,9], 0);
    const second = consistentShuffleForKey([4,32,5,9], 0);
    expect(first).toEqual(second);
  });
});