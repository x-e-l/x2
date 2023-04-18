/* eslint-disable no-magic-numbers,max-lines-per-function,no-new-wrappers */
// noinspection JSPrimitiveTypeWrapperUsage


import {describe, expect, it} from '@jest/globals';
import isPromise from './promise.util.js';
import Eventual from '#src/core/eventual.core.js';


describe('function isPromise', () => {

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, true],
        [false, false],
        [false, 'asdf'],
        [false, 1],
        [false, NaN],
        [false, Infinity],
        [false, -Infinity],
        // eslint-disable-next-line no-loss-of-precision
        [false, 222222222222222222222222222222n],
        [false, '3m'],
        [false, Symbol('4')],
        //
        [false, Boolean()],
        [false, Number()],
        [false, String()],
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
        //
        [true, Promise.resolve()],
        [true, new Promise($ => $)],

        [true, Eventual.resolve()],
        [true, new Eventual($ => $)],
    ])('returns %p for %p', (result, value) => expect(isPromise(value)).toBe(result));

});
