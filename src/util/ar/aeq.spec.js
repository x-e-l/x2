/* eslint-disable no-magic-numbers */
import {describe, expect, it} from '@jest/globals';
import aeq from './aeq.util.js';


const o1 = Object.freeze({a: 1});
const o2 = Object.freeze({b: 2});

describe('function aeq', () => {

    it.each([
        // result, separator, value
        [true, null, null],
        [false, [], null],
        [false, void 1, [0, 1, null, 2]],
        [false, [1, 2, 3], [4, 5, 6]],
        [false, [o2, o1], [o1, o2]],
        [false, [o1, o2, 0], [o1, o2]],
        [false, [o1, o2], [o1, o2, 0]],
        [true, [], []],
        [true, [o1, o2], [o1, o2]],
    ])('returns %p for %p, %p', expect(aeq).toMapExact);


});
