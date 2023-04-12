/* eslint-disable no-magic-numbers,max-lines-per-function */


import {describe, expect, it} from '@jest/globals';
import primitive from './primitive.util.js';


describe('function primitive', () => {

    describe.each([
        'string', 'default',
    ])('with hint %p', hint => {

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
        ])('returns %p for %p ', (result, value) => expect(primitive(hint, value)).toBe(result));
    });

    describe('with hint number', () => {
        const hint = 'number';

        it.each([
            // result, value
            [NaN, null],
            [NaN, void 1],
            [NaN, true],
            [NaN, false],
            [NaN, 'asdf'],
            [1, 1],
            // eslint-disable-next-line no-loss-of-precision
            [222222222222222222222222222222, 222222222222222222222222222222n],
            [3, '3m'],
            [NaN, Symbol('4')],
            [NaN, {e: 5}],
            [6, [6, 7, 8]],
            [NaN, []],
            [NaN, $ => $],
        ])('returns %p for %p', (result, value) => expect(primitive(hint, value)).toBe(result));


    });

});
