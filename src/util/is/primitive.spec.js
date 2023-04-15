/* eslint-disable no-magic-numbers,max-lines-per-function,no-new-wrappers */
// noinspection JSPrimitiveTypeWrapperUsage


import {describe, expect, it} from '@jest/globals';
import primitive from './primitive.util.js';


describe('function primitive', () => {

    it.each([
        // result, value
        [true, null],
        [true, void 1],
        [true, true],
        [true, false],
        [true, 'asdf'],
        [true, 1],
        [true, NaN],
        [true, Infinity],
        [true, -Infinity],
        // eslint-disable-next-line no-loss-of-precision
        [true, 222222222222222222222222222222n],
        [true, '3m'],
        [true, Symbol('4')],
        //
        [true, Boolean()],
        [true, Number()],
        [true, String()],
        //
        [false, new Boolean()],
        [false, new Number()],
        [false, new String()],
        //
        [false, {e: 5}],
        [false, [6, 7, 8]],
        [false, []],
        [false, $ => $],
        [false, Object.create(null)],
    ])('returns %p for %p', (result, value) => expect(primitive(value)).toBe(result));

});
