/* eslint-disable no-magic-numbers,new-cap */

import {describe, expect, it} from '@jest/globals';
import add from './add.op.js';
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

describe('function add', () => {


    it.each(MATRIX)('returns the addition for %p, %p ', (a, b) => {

        // noinspection JSIncompatibleTypesComparison
        const expected = Number.isFinite(a) && Number.isFinite(b) ? a + b : NaN;

        expect(add(a, b) instanceof X.constructor).toBe(true);
        expect(add(a, b)[V]).toBe(expected);

        expect(add(X(a), b) instanceof X.constructor).toBe(true);
        expect(add(X(a), b)[V]).toBe(expected);

        expect(add(X(a), X(b)) instanceof X.constructor).toBe(true);
        expect(add(X(a), X(b))[V]).toBe(expected);

    });


});
