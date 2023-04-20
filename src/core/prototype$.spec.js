/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import prototype$ from './prototype$.core.js';
import {P, S, V} from '#src/etc/field.const.js';


const PREFIX = P + S;

const K = Object.freeze(
    Object.fromEntries([
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
    ].map(key => [key, PREFIX + key])),
);


const KEYS = Object.freeze(
    [
        ...Object.values(K),
        'toString',
    ],
);


describe('function prototype$', () => {

    it('returns the properties even if the constructor is missing', () => {

        const actual = prototype$();

        expect(actual).toBeTruthy();
        expect(typeof actual).toBe('object');
        expect(Object.keys(actual)).toStrictEqual(KEYS);

    });

    it('correctly calls the embedded function', () => {

        const p = Object.create(null);
        const c = Object.create(null);
        c.prototype = p;

        prototype$(c);

        expect(Object.getOwnPropertyNames(p)).toStrictEqual(KEYS);

    });

    describe('adds functioning properties for', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        prototype$(Z);

        it('array', () => {

            const a = [1, 2, 3];
            const z = new Z(a);
            const expected = [{i: 0, k: '0', v: 1}, {i: 1, k: '1', v: 2}, {i: 2, k: '2', v: 3}];

            expect(z[K['is.t.array']]).toBe(true);
            expect(z[K['is.f.array']]).toBe(false);

            expect(z[K['to.len']][V]).toBe(3);
            expect(z.toString()).toBe(a.toString());

            expect([...z].every($ => $ instanceof Z)).toBe(true);
            expect([...z].map($ => $[V])).toStrictEqual(expected);
        });

        it('error', () => {

            const z = new Z(new Error());

            expect(z[K['is.t.error']]).toBe(true);
            expect(z[K['is.f.error']]).toBe(false);

            expect(z[K['to.len']][V]).toBe(void 1);
        });

        it('primitive', () => {

            const s = new Z('1234');
            const z = new Z(0);

            expect(s[K['is.t.primitive']]).toBe(true);
            expect(s[K['is.f.primitive']]).toBe(false);

            expect(s[K['to.len']][V]).toBe(4);

            expect(s[K['to.bul']][V]).toBe(true);
            expect(z[K['to.bul']][V]).toBe(false);

            expect(s[K['to.num']][V]).toBe(1234);
            expect([...s].map($ => $[V])).toStrictEqual(['1234']);
            expect([...z].map($ => $[V])).toStrictEqual([]);
            expect([...s[K['to.num']]].length).toStrictEqual(1234);
        });

        it('object', () => {

            const o = Object.freeze({a: 1, b: 2});
            const z = new Z(o);

            expect(z[K['is.t.primitive']]).toBe(false);
            expect(z[K['is.f.primitive']]).toBe(true);

            expect(z[K['to.len']][V]).toBe(void 2);
            expect(z[K['to.str']][V]).toBe('[object Object]');
        });


    });

});
