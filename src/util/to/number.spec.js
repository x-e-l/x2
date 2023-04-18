/* eslint-disable no-magic-numbers,max-lines-per-function */


import {describe, expect, it} from '@jest/globals';
import toNumber from './number.util.js';


describe('function toNumber', () => {

    it.each([
        // result, value
        [NaN, null],
        [NaN, void 1],
        [NaN, true],
        [NaN, false],
        [NaN, 'asdf'],
        [1, 1],
        // eslint-disable-next-line no-loss-of-precision
        [222222222222222222222222222222, 222222222222222222222222222222n],
        [3, '3m'],
        [NaN, Symbol('4')],
        [NaN, {e: 5}],
        [NaN, [6, 7, 8]],
        [9e9, '9e9'],
        [NaN, []],
        [NaN, $ => $],
        [NaN, Object.create(null)],
    ])('returns %p for %p', (result, value) => expect(toNumber(value)).toBe(result));

});
