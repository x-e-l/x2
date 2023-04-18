/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype[Symbol.toPrimitive]', () => {

    it.each([
        // result, value
        [NaN, null],
        [NaN, void 1],
        [NaN, false],
        [NaN, true],
        [NaN, 'asdf'],
        [NaN, Symbol('s')],
        [NaN, $ => $],
        [NaN, Object.create(null)],
        [NaN, []],
        [NaN, [1, 2, 3]],
        //
        [3, 3],
        [4, '4m'],
        [5, '5n'],
        [6e7, '6e7'],
        // eslint-disable-next-line no-loss-of-precision
        [9999999999999999999, 9999999999999999999n],
        //
    ])('returns %p for %p after subtracting 0 from it', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x - 0).toBe(result);

    });

    it.each([
        // result, value
        ['null', null],
        ['undefined', void 1],
        ['false', false],
        ['true', true],
        ['asdf', 'asdf'],
        ['Symbol(s)', Symbol('s')],
        ['$ => $', $ => $],
        ['[object Object]', Object.create(null)],
        ['', []],
        ['1,2,3', [1, 2, 3]],
        //
        ['3', 3],
        ['4m', '4m'],
        ['5n', '5n'],
        ['6e7', '6e7'],
        // eslint-disable-next-line no-loss-of-precision
        ['9999999999999999999', 9999999999999999999n],
        //
    ])('returns %p for %p after adding "" to it', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        // eslint-disable-next-line prefer-template
        expect(x + '').toBe(result);

    });

});
