/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import nav from './nav.core.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';


describe('function nav', () => {

    it('returns itself if called', () => {

        const object = Object.freeze({});
        const allowed = Object.freeze([]);

        const n = nav({object, allowed});

        expect(n()).toEqual(n);

    });

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

        const val = Object.freeze({});

        const k1 = '$c.d.e';
        const o1 = Object.freeze({a: 1, $b: 2, [k1]: val});
        const a1 = Object.freeze([k1]);

        const nav1 = nav({object: o1, allowed: a1});

        expect(nav1[k1]).toEqual(val);
        expect(nav1.$c.d.e).toEqual(val);

        const k2 = Symbol('k2');
        const o2 = Object.freeze({[k2]: val});
        const nav2 = nav({object: o2});

        expect(nav2[k2]).toEqual(val);

    });


});
