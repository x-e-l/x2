/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */

import {describe, expect, it} from '@jest/globals';
import rename$ from './rename$.core.js';
import {V} from '#src/etc/field.const.js';


describe('function rename$', () => {

    it.each([
        // result, arg
        [null, null],
        [void 1, void 1],
        [2, 2],
        [NaN, NaN],
        ['', ''],
        //
    ])('returns %p for arg: %p', (result, arg) => {
        expect(rename$(arg)).toEqual(result);
    });

    it.each([
        // result, value
        ['(nul)', null],
        ['(und)', void 1],
        ['(bul)', true],
        ['(bul)', false],
        ['(num)', NaN],
        ['(num)', 1],
        ['(bnt)', 2n],
        ['(str)', ''],
        ['(sym)', Symbol('')],
        ['(obj)', {}],
        ['(arr)', []],
        ['(fun)', $ => $],
        //
        ['"abs"', Math.abs],
        ['"String"', String],
        //
    ])('returns object with name: %p for value: %p', (result, value) => {

        const object = {[V]: value};
        const actual = rename$(object);

        expect(actual).toBe(object);
        expect(actual.name).toBe(result);

    });


});
