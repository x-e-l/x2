/* eslint-disable no-magic-numbers,new-cap */


import {describe, expect, it} from '@jest/globals';
import is from './is.op.js';
import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';


const VALUES = Object.freeze([
    '', NaN, null, void 1,
    Infinity, -Infinity,
    true, false,
    0, -0, 1, 2n,
    '3m', 'asdf', Symbol('4'),
    {e: 5}, [6, 7, 8], [], {},
    $ => $,
]);

const MATRIX = Object.freeze(VALUES.map(a => VALUES.flatMap(b => [a, b])));

describe('function is', () => {


    it.each(MATRIX)('returns similar as the raw comparison for %p, %p ', (a, b) => {

        // noinspection JSIncompatibleTypesComparison
        const expected = Object.is(a, b);

        expect(is(a, b) instanceof X.constructor).toBe(true);
        expect(is(a, b)[V]).toBe(expected);

        expect(is(X(a), b) instanceof X.constructor).toBe(true);
        expect(is(X(a), b)[V]).toBe(expected);

        expect(is(X(a), X(b)) instanceof X.constructor).toBe(true);
        expect(is(X(a), X(b))[V]).toBe(expected);

    });


});
