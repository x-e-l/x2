/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype.toString', () => {

    it.each([
        // result, value
        ['null', null],
        ['undefined', void 1],
        ['false', false],
        ['true', true],
        ['3', 3],
        ['9999999999999999999', 9999999999999999999n],
        ['asdf', 'asdf'],
        ['Symbol(s)', Symbol('s')],
        ['', []],
        ['1,2,3', [1, 2, 3]],
        ['$ => $', $ => $],
        ['[object Object]', Object.create(null)],
        //
    ])('returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x.toString()).toBe(result);

    });

});
