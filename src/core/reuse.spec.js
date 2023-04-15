/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */

import {describe, expect, it} from '@jest/globals';
import reuse from './reuse.core.js';
import {NZ, PZ} from '#src/etc/field.const.js';


describe('function reuse', () => {

    it.each([
        null, void 1,
        true, false,
        NaN, 1, 2n,
        '', Symbol(''),
        {}, [],
        $ => $,
        0, -0,
    ])('returns %p for %p', value => {

        const common = new Map();
        const result = Object.freeze({});

        common.set(value, result);

        expect(result).toBe(common.get(value));
        expect(reuse(common, value)).toBe(common.get(value));
        expect(reuse(common, value)).toBe(result);

    });

    it('returns correct value for both zeroes', () => {

        const negative = Object.freeze({});
        const positive = Object.freeze({});

        const common = new Map();

        common.set(NZ, negative);
        common.set(PZ, positive);

        expect(reuse(common, -0)).toBe(negative);
        expect(reuse(common, +0)).toBe(positive);

    });


});
