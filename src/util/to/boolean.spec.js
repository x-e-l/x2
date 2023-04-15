/* eslint-disable no-magic-numbers,max-lines-per-function */


import {describe, expect, it} from '@jest/globals';
import toBoolean from './boolean.util.js';


describe('function toBoolean', () => {

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, NaN],
        [false, 0],
        [false, -0],
        [false, 0n],
        [false, ''],
        //
        [true, true],
        [true, 'asdf'],
        [true, 1],
        [true, 222222222222222222222222222222n],
        [true, '3m'],
        [true, Symbol('4')],
        [true, {e: 5}],
        [true, [6, 7, 8]],
        [true, '9e9'],
        [true, []],
        [true, $ => $],
        [true, Object.create(null)],
        //
    ])('returns %p for %p', (result, value) => expect(toBoolean(value)).toBe(result));

});
