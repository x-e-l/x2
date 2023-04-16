/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import nav from './nav.core.js';
import {V} from '#src/etc/field.const.js';

// eslint-disable-next-line func-style,no-restricted-syntax
function Z($) {
    if (new.target !== Z) {
        return new Z($);
    }
    this[V] = $;
}


describe('function nav', () => {

    it('returns an error for not providing proper constructor', () => {
        expect(nav()).toBeInstanceOf(Error);
    });

    describe('returns an embedded information for incorrect call', () => {

        it('that only has the constructor', () => {

            const p = nav({X: Z});

            expect(p instanceof Z).toBe(true);
            expect(p.test instanceof Z).toBe(true);
            expect(p.test[V].reason).toEqual('Not found due to missing property');
        });

        it('that has no allowed props', () => {

            const object = Object.freeze({a: 1, $b: 2, '$c.d.e': 3});
            const p = nav({X: Z, object});

            expect(p instanceof Z).toBe(true);
            expect(p.$c[V].reason).toEqual('Not found due to missing property');
        });

        it('that has a symbol key', () => {

            const key = Symbol('key');
            const p = nav({X: Z});

            expect(p instanceof Z).toBe(true);
            expect(p[key][V].reason).toEqual('Not found due to Symbol key');
        });

    });


    it('returns the proper field of a correct call', () => {

        const key = '$c.d.e';
        const val = Object.freeze({});
        const object = Object.freeze({a: 1, $b: 2, [key]: val});
        const allowed = Object.freeze([key]);

        const p = nav({X: Z, object, allowed});

        expect(p instanceof Z).toBe(true);
        expect(p[key]).toEqual(val);
        expect(p.$c.d.e).toEqual(val);

    });
});
