/* eslint-disable no-magic-numbers,max-lines-per-function */


import {describe, expect, it} from '@jest/globals';
import toString from './string.util.js'; // eslint-disable-line no-shadow


describe('function toString', () => {

    it.each([
        // result, value
        ['null', null],
        ['undefined', void 1],
        ['true', true],
        ['false', false],
        ['1', 1],
        ['222222222222222222222222222222', 222222222222222222222222222222n],
        ['3m', '3m'],
        ['asdf', 'asdf'],
        ['Symbol(4)', Symbol('4')],
        ['[object Object]', {e: 5}],
        ['6,7,8', [6, 7, 8]],
        ['', []],
        ['$ => $', $ => $],
    ])('returns %p for %p ', (result, value) => expect(toString(value)).toBe(result));

});
