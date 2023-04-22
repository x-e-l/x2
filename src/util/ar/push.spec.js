/* eslint-disable no-magic-numbers */
import {describe, expect, it} from '@jest/globals';
import push from './push.util.js';


describe('function push', () => {

    it.each([
        // result, separator, value
        [[null], null, null],
        [[null], [], null],
        [[0, 1, null, 2, void 1], [0, 1, null, 2], void 1],
        [[[]], [], []],
        [[1, 2, 3, 4], [1, 2, 3], 4, 5, 6],
    ])('returns %p for %p, %p', expect(push).toMapEqual);


});
