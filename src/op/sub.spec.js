/* eslint-disable no-magic-numbers,new-cap */


import {describe, expect, it} from '@jest/globals';
import sub from './sub.op.js';
import X from '#src/core/x.core.js';
import {V} from '#src/etc/field.const.js';


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

describe('function sub', () => {


    it.each(MATRIX)('returns the subtraction for %p, %p ', (a, b) => {

        // noinspection JSIncompatibleTypesComparison
        const expected = Number.isFinite(a) && Number.isFinite(b) ? a - b : NaN;

        expect(sub(a, b) instanceof X).toBe(true);
        expect(sub(a, b)[V]).toBe(expected);

        expect(sub(X.X(a), b) instanceof X).toBe(true);
        expect(sub(X.X(a), b)[V]).toBe(expected);

        expect(sub(X.X(a), X.X(b)) instanceof X).toBe(true);
        expect(sub(X.X(a), X.X(b))[V]).toBe(expected);

    });


});
