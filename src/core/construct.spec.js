/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function,prefer-arrow-callback */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it, jest} from '@jest/globals';
import construct from './construct.core.js';
import {V} from '#src/etc/field.const.js';


describe('function construct', () => {

    it('returns an embedded error for incorrect calls', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        const c = construct(Z);
        expect(typeof c).toBe('function');

        expect(c()[V] instanceof Error).toBe(true);
        expect(c({}, null, null)[V] instanceof Error).toBe(true);
        expect(c($ => $, null, null)[V] instanceof Error).toBe(true);
        expect(c($ => $, {}, null)[V] instanceof Error).toBe(true);
        expect(c(new Z(), null, new Z())[V] instanceof Error).toBe(true);

        const actual1 = c($ => $, [], $ => $);
        expect(actual1[V] instanceof Error).toBe(true);
        expect(actual1[V].message).toBe('$ => $ is not a constructor');

        const i2 = $ => $;
        const actual2 = c(new Z(i2), [], new Z($ => $));
        expect(actual2[V] instanceof Error).toBe(true);
        expect(actual2[V].message).toBe('i2 is not a constructor');

        const actual3 = c(new Z($ => $), [], new Z($ => $));
        expect(actual3[V] instanceof Error).toBe(true);
        expect(actual3[V].message).toBe('(fun) is not a constructor');

        const message = `message: ${Math.random()}`;
        const actual4 = c(new Z((function C1() {
            throw new Error(message);
        })), [], $ => $);

        expect(actual4[V] instanceof Error).toBe(true);
        expect(actual4[V].message).toBe(message);

    });

    it('correctly calls own constructor', () => {

        const o1 = Object.freeze({v: 1});
        const fn = jest.fn($ => $);

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            fn($);
            this[V] = $;
        }

        const c = construct(Z);
        expect(typeof c).toBe('function');

        const actual = c(new Z(1), [o1], new Z(2));
        expect(actual instanceof Z).toBe(true);
        expect(actual[V]).toBe(o1);

        expect(fn).toHaveBeenCalledTimes(3);
        expect(fn.mock.calls).toEqual([[1], [2], [o1]]);

    });


    it('correctly calls the embedded constructor', () => {

        const o1 = Object.freeze({v: 1});
        const fn = jest.fn($ => $);

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Y($) {
            fn($);
        }

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z() {
            this[V] = Y;
        }

        const c = construct(Z);
        expect(typeof c).toBe('function');

        const actual = c(new Z(), [o1], new Z());
        expect(actual instanceof Z).toBe(true);
        expect(actual[V]).toBe(Y);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn.mock.calls).toEqual([[o1]]);
    });

});
