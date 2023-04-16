/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it, jest} from '@jest/globals';
import apply from './apply.core.js';
import {V} from '#src/etc/field.const.js';


describe('function apply', () => {

    it('returns an embedded error for incorrect calls', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        Z.instance = () => false;

        const bound = apply(Z);
        expect(typeof bound).toBe('function');

        // Function.prototype.apply was called on undefined, which is a undefined and not a function
        expect(bound()[V] instanceof Error).toBe(true);

        // Function.prototype.apply was called on undefined, which is a undefined and not a function
        expect(bound({}, null, null)[V] instanceof Error).toBe(true);

        // CreateListFromArrayLike called on non-object
        expect(bound($ => $, null, null)[V] instanceof Error).toBe(true);

        // CreateListFromArrayLike called on non-object
        expect(bound($ => $, {}, null)[V] instanceof Error).toBe(true);

    });

    it('correctly calls the embedded function', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        Z.instance = $ => $ instanceof Z;

        const bound = apply(Z);
        expect(typeof bound).toBe('function');

        const o1 = Object.freeze({});
        const id = jest.fn($ => $);

        expect(bound(id, null, [o1])[V]).toBe(o1);

        expect(id).toHaveBeenCalledTimes(1);
        expect(id).toHaveBeenCalledWith(o1);

        const o2 = Object.freeze({});
        const fn = jest.fn(function that() {
            return this; // eslint-disable-line no-invalid-this
        });

        expect(bound(new Z(fn), o2, [o1])[V]).toBe(o2);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(o1);

    });


    it('correctly returns the target if no embedded function', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        Z.instance = $ => $ instanceof Z;

        const bound = apply(Z);
        expect(typeof bound).toBe('function');

        const o = Object.freeze({a: 1});
        const z = new Z(o);

        expect(bound(z, null, [])).toBe(z);
        expect(bound(z, null, [])[V]).toBe(o);

    });


});
