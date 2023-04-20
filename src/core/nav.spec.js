/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import nav from './nav.core.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';


describe('function nav', () => {

    describe('returns an information for incorrect call', () => {

        it('that only has the constructor', () => {

            const p = nav();

            expect(p.test).toBe(_NOT_FOUND_);
        });

        it('that has no allowed props', () => {

            const object = Object.freeze({a: 1, $b: 2, '$c.d.e': 3});
            const p = nav({object});

            expect(p.test).toBe(_NOT_FOUND_);
        });

        it('that has no value for the key', () => {

            const k1 = Symbol('key');
            const k2 = 'key';
            const p = nav();

            expect(p[k1]).toEqual(_NOT_FOUND_);
            expect(p[k2]).toEqual(_NOT_FOUND_);
        });

    });

    it('returns the proper field of a correct call', () => {

        const key = '$c.d.e';
        const val = Object.freeze({});
        const object = Object.freeze({a: 1, $b: 2, [key]: val});
        const allowed = Object.freeze([key]);

        const p = nav({object, allowed});

        expect(p[key]).toEqual(val);
        expect(p.$c.d.e).toEqual(val);

    });
});
