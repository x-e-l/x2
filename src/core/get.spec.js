/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import get from './get.core.js';
import {V} from '#src/etc/field.const.js';


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

        it('for a navigation key', () => {

            // the allowed fields for navigation are "hardcoded", so 'to.str' is, but '$c.d.e' isn't
            const k2 = 'to.str';
            const v2 = Object.freeze({v: 2});

            const k3 = '$c.d.e';
            const v3 = Object.freeze({v: 3});

            const o = Object.freeze({a: 1, [k2]: v2, [k3]: v3});

            const getter = get(Z);

            expect(typeof getter).toBe('function');
            expect(getter(o, k3)[V]).toBe(v3);

            expect(getter(o, 'to')).toBeInstanceOf(Z);
            expect(getter(o, 'to').str).toBe(v2);

        });

    });

});
