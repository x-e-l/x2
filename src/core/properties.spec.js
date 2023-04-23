/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import properties from './properties.core.js';
import get from '#src/core/get.core.js';
import {M, V} from '#src/etc/field.const.js';


const KEYS = Object.freeze(
    [
        'es.type',
        'es.value',
        'is.t.array',
        'is.f.array',
        'is.t.error',
        'is.f.error',
        'is.t.primitive',
        'is.f.primitive',
        'is.t.promise',
        'is.f.promise',
        'to.ite',
        'to.len',
        'to.bul',
        'to.num',
        'to.str',
        'toString',
    ],
);


describe('function properties', () => {

    it('returns the properties even if the constructor is missing', () => {

        const actual = properties();

        expect(actual).toBeTruthy();
        expect(typeof actual).toBe('object');
        expect(Object.keys(actual)).toStrictEqual(KEYS);

    });

    describe('adds functioning properties for', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
            return new Proxy(this, {get: get(Z, this)});
        }

        Object.defineProperties(Z.prototype, properties(Z));

        it('array', () => {

            const a = [1, 2, 3];
            const z = new Z(a);
            const expected = [{i: 0, k: '0', v: 1}, {i: 1, k: '1', v: 2}, {i: 2, k: '2', v: 3}];

            expect(z[M].is.t.array).toBe(true);
            expect(z[M].is.f.array).toBe(false);

            expect(z[M].to.len[V]).toBe(3);
            expect(z.toString()).toBe(a.toString());

            expect([...z].every($ => $ instanceof Z)).toBe(true);
            expect([...z].map($ => $[V])).toStrictEqual(expected);
        });

        it('error', () => {

            const z = new Z(new Error());

            expect(z[M].is.t.error).toBe(true);
            expect(z[M].is.f.error).toBe(false);

            expect(z[M].to.len[V]).toBe(void 1);
        });

        it('primitive', () => {

            const s = new Z('1234');
            const z = new Z(0);

            expect(s[M].is.t.primitive).toBe(true);
            expect(s[M].is.f.primitive).toBe(false);

            expect(s[M].to.len[V]).toBe(4);

            expect(s[M].to.bul[V]).toBe(true);
            expect(z[M].to.bul[V]).toBe(false);

            expect(s[M].to.num[V]).toBe(1234);
            expect([...s].map($ => $[V])).toStrictEqual(['1234']);
            expect([...z].map($ => $[V])).toStrictEqual([]);
            expect([...s[M].to.num].length).toStrictEqual(1234);
        });

        it('object', () => {

            const o = Object.freeze({a: 1, b: 2});
            const z = new Z(o);

            expect(z[M].is.t.primitive).toBe(false);
            expect(z[M].is.f.primitive).toBe(true);

            expect(z[M].to.len[V]).toBe(void 2);
            expect(z[M].to.str[V]).toBe('[object Object]');
        });


    });

});
