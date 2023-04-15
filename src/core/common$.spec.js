/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */

import {describe, expect, it} from '@jest/globals';
import common$ from './common$.core.js';
import {V} from '#src/etc/field.const.js';


describe('function common$', () => {

    // eslint-disable-next-line func-style,no-restricted-syntax
    function Z($) {
        this[V] = $;
    }

    it('returns correctly filled map', () => {

        const expected = Object.freeze([
            +0,
            -0,
            null,
            void 1,
            true,
            false,
            '',
            NaN,
            +Infinity,
            -Infinity,
        ]);

        const map = new Map();
        const actual = common$(Z, map);

        expect(actual).toBe(map);
        expect(actual.size).toBe(expected.length);

        const collected = [...actual.values()];
        expect(collected.every($ => $ instanceof Z)).toBe(true);
        expect(collected.map($ => $[V])).toStrictEqual(expected);

    });


});
