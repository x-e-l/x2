/* eslint-disable no-magic-numbers,new-cap */

import {describe, expect, it} from '@jest/globals';
import splus from './splus.op.js';
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
    Object.create(null),
]);

const MATRIX = Object.freeze(VALUES.map(a => VALUES.flatMap(b => [a, b])));

const s = $ => {
    try {
        return String($);
    } catch {
        return Object.prototype.toString.call($);
    }
};

describe('function splus', () => {


    it.each(MATRIX)('returns the addition for %p, %p ', (a, b) => {

        const expected = s(a) + s(b);

        expect(splus(a, b) instanceof X.constructor).toBe(true);
        expect(splus(a, b)[V]).toBe(expected);

        expect(splus(X(a), b) instanceof X.constructor).toBe(true);
        expect(splus(X(a), b)[V]).toBe(expected);

        expect(splus(a, X(b)) instanceof X.constructor).toBe(true);
        expect(splus(a, X(b))[V]).toBe(expected);

        expect(splus(X(a), X(b)) instanceof X.constructor).toBe(true);
        expect(splus(X(a), X(b))[V]).toBe(expected);

    });


});
