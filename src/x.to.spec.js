/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import Eventual from '#src/core/eventual.core.js';
import iterator from '#src/core/iterator.core.js';
import {M, TO_BUL, TO_ITE, TO_LEN, TO_NUM, TO_STR, V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype', () => {

    it.each([
        null,
        void 1,
        false,
        true,
        NaN,
        3,
        Symbol('s'),
        Object.create(null),
        new Error('message'),
        Eventual.resolve(),
        '',
        'asdf',
        $ => $,
        [],
        ['a', 'b', 'c'],
        [1, 2, 3],
        //
    ])('[TO_ITE] returns %p for %p', value => {

        const x = X(value);

        expect(x).toBeInstanceOf(X);

        const actual = [...x[TO_ITE]];
        const expected = [...iterator(X.class, x)];

        expect(actual.length).toBe(expected.length);
        for (let i = 0; i < expected.length; i += 1) {
            expect(actual[i] instanceof X).toBe(true);
            expect(expected[i] instanceof X).toBe(true);
        }

        const embedded = $ => $[V];
        expect(actual.map(embedded)).toStrictEqual(expected.map(embedded));

    });

    it.each([
        // result, value
        [void 1, null],
        [void 1, void 1],
        [void 1, false],
        [void 1, NaN],
        [void 1, true],
        [void 1, 3],
        // eslint-disable-next-line no-loss-of-precision
        [void 1, 9999999999999999999n],
        [void 1, Symbol('s')],
        [void 1, Object.create(null)],
        [void 1, new Error('message')],
        [void 1, Eventual.resolve()],
        [0, ''],
        [4, 'asdf'],
        [1, $ => $],
        [0, []],
        [3, [1, 2, 3]],
        //
    ])('[TO_LEN] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x).toBeInstanceOf(X);
        expect(x[TO_LEN]).toBeInstanceOf(X);
        expect(x[M].to.len).toBeInstanceOf(X);

        expect(x[V]).toBe(value);
        expect(x[TO_LEN][V]).toBe(result);
        expect(x[M].to.len[V]).toBe(result);

    });

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, ''],
        [false, NaN],
        [true, 'asdf'],
        [true, true],
        [true, 3],
        // eslint-disable-next-line no-loss-of-precision
        [true, 9999999999999999999n],
        [true, Symbol('s')],
        [true, $ => $],
        [true, Object.create(null)],
        [true, []],
        [true, [1, 2, 3]],
        [true, new Error('message')],
        [true, Eventual.resolve()],
        //
    ])('[TO_BUL] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x).toBeInstanceOf(X);
        expect(x[TO_BUL]).toBeInstanceOf(X);
        expect(x[M].to.bul).toBeInstanceOf(X);

        expect(x[V]).toBe(value);
        expect(x[TO_BUL][V]).toBe(result);
        expect(x[M].to.bul[V]).toBe(result);

    });

    it.each([
        // result, value
        [NaN, null],
        [NaN, void 1],
        [NaN, false],
        [NaN, true],
        [NaN, ''],
        [NaN, 'asdf'],
        [3, 3],
        // eslint-disable-next-line no-loss-of-precision
        [9999999999999999999, 9999999999999999999n],
        [NaN, Symbol('s')],
        [NaN, $ => $],
        [NaN, Object.create(null)],
        [NaN, []],
        [NaN, [1, 2, 3]],
        [NaN, new Error('message')],
        [NaN, Eventual.resolve()],
        //
    ])('[TO_NUM] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x).toBeInstanceOf(X);
        expect(x[TO_NUM]).toBeInstanceOf(X);
        expect(x[M].to.num).toBeInstanceOf(X);

        expect(x[V]).toBe(value);
        expect(x[TO_NUM][V]).toBe(result);
        expect(x[M].to.num[V]).toBe(result);

    });

    it.each([
        // result, value
        ['null', null],
        ['undefined', void 1],
        ['false', false],
        ['true', true],
        ['', ''],
        ['asdf', 'asdf'],
        ['3', 3],
        ['9999999999999999999', 9999999999999999999n],
        ['Symbol(s)', Symbol('s')],
        ['$ => $', $ => $],
        ['[object Object]', Object.create(null)],
        ['', []],
        ['1,2,3', [1, 2, 3]],
        ['Error: message', new Error('message')],
        ['[object Promise]', Eventual.resolve()],
        //
    ])('[TO_STR] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x).toBeInstanceOf(X);
        expect(x[TO_STR]).toBeInstanceOf(X);
        expect(x[M].to.str).toBeInstanceOf(X);

        expect(x[V]).toBe(value);
        expect(x[TO_STR][V]).toBe(result);
        expect(x[M].to.str[V]).toBe(result);

    });


});
