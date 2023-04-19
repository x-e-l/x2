/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import get from './get.core.js';
import {P, TO_STR, V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function get', () => {

    // eslint-disable-next-line func-style,no-restricted-syntax
    function Z($) {
        this[V] = $;
    }

    it('returns an embedded error for incorrect call', () => {

        const getter = get(Z);

        expect(typeof getter).toBe('function');

        const e = getter()[V];

        expect(e instanceof Error).toBe(true);
        expect(e.message).toBe('Reflect.get called on non-object');
    });


    describe('returns the proper value', () => {

        it('for variations of regular/wrapped keys', () => {

            const val = Object.freeze({value: true});

            const regularKey = 'key';
            const regularObj = Object.freeze({[regularKey]: val});

            const wrappedKey = new Z(regularKey);
            const wrappedObj = new Z(regularObj);

            const g = get(Z);
            expect(typeof g).toBe('function');

            const rr = g(regularObj, regularKey);
            const rw = g(regularObj, wrappedKey);
            const wr = g(wrappedObj, regularKey);
            const ww = g(wrappedObj, wrappedKey);

            expect(rr).toBeInstanceOf(Z);
            expect(rw).toBeInstanceOf(Z);
            expect(wr).toBeInstanceOf(Z);
            expect(ww).toBeInstanceOf(Z);

            expect(ww[V]).toBe(val);
            expect(rr[V]).toBe(val);
            expect(wr[V]).toBe(val);
            expect(rw[V]).toBe(val);

        });

        it('for a Symbol key', () => {

            const key = Symbol('key');
            const val = Object.freeze({value: true});
            const o = Object.freeze({[key]: val});

            const getter = get(Z);

            expect(typeof getter).toBe('function');
            expect(getter(o, key)).toBe(val);

        });

        it('for an index key', () => {

            const val = Object.freeze({value: true});
            const o = Object.freeze({1: val});
            const a = Object.freeze([0, 1, val, 3]);

            const g = get(Z);

            expect(typeof g).toBe('function');
            expect(g(o, 1)[V]).toBe(val);
            expect(g(a, 2)[V]).toBe(val);

        });

        it('for a navigation key', () => {

            // the allowed fields for navigation are "hardcoded",
            // so TO_STR will pass, but '$c.d.e' wont

            const k2 = TO_STR;
            const v2 = Object.freeze({v: 2});

            const k3 = '$c.d.e';
            const v3 = Object.freeze({v: 3});

            const o = Object.freeze({a: 1, [k2]: v2, [k3]: v3});

            const getter = get(Z);

            expect(typeof getter).toBe('function');
            expect(getter(o, k3)[V]).toBe(v3);

            expect(getter(o, P)).toBeInstanceOf(Z);
            expect(getter(o, P).to.str).toBe(v2);

        });

        it('for the usual Function relics', () => {

            const x = X();
            const keys = Object.getOwnPropertyNames($ => $);

            for (const key of keys) {
                expect(x[key]).toBe(x[X(key)]);
            }

        });

        it('for extra descriptors', () => {

            const a = 'a';
            const b = 'b';

            const x = new Z();
            const getter = get(Z);

            const g = void 1;
            const s = $ => $;
            const value = Object.freeze({});

            Object.defineProperty(x, a, {configurable: false, set: s, get: g});
            Object.defineProperty(x, b, {configurable: false, value});

            expect(getter(x, a)).toBe(void 1);
            expect(getter(x, b)).toBe(x[X(b)]);

        });

    });

});
