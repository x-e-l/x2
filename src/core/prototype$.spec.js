/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import prototype$ from './prototype$.core.js';
import {V} from '#src/etc/field.const.js';


const PREFIX = '';
const KEYS = Object.freeze(
    [
        ...[
            'es.type',
            'es.value',
            'is.t.array',
            'is.f.array',
            'is.t.error',
            'is.f.error',
            'is.t.primitive',
            'is.f.primitive',
            'to.len',
            'to.bul',
            'to.num',
            'to.str',
        ].map(key => PREFIX + key),
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

        Z.instance = $ => $ instanceof Z;
        prototype$(Z);

        it('array', () => {

            const a = [1, 2, 3];
            const z = new Z(a);
            const expected = [{i: 0, k: '0', v: 1}, {i: 1, k: '1', v: 2}, {i: 2, k: '2', v: 3}];

            expect(z['is.t.array']).toBe(true);
            expect(z['is.f.array']).toBe(false);

            expect(z['to.len'][V]).toBe(3);
            expect(z.toString()).toBe(a.toString());

            expect([...z].every($ => $ instanceof Z)).toBe(true);
            expect([...z].map($ => $[V])).toStrictEqual(expected);
        });

        it('error', () => {

            const z = new Z(new Error());

            expect(z['is.t.error']).toBe(true);
            expect(z['is.f.error']).toBe(false);

            expect(z['to.len'][V]).toBe(void 1);
        });

        it('primitive', () => {

            const s = new Z('1234');
            const z = new Z(0);

            expect(s['is.t.primitive']).toBe(true);
            expect(s['is.f.primitive']).toBe(false);

            expect(s['to.len'][V]).toBe(4);

            expect(s['to.bul'][V]).toBe(true);
            expect(z['to.bul'][V]).toBe(false);

            expect(s['to.num'][V]).toBe(1234);
            expect([...s].map($ => $[V])).toStrictEqual(['1234']);
            expect([...z].map($ => $[V])).toStrictEqual([]);
            expect([...s['to.num']].length).toStrictEqual(1234);
        });

        it('object', () => {

            const o = Object.freeze({a: 1, b: 2});
            const z = new Z(o);

            expect(z['is.t.primitive']).toBe(false);
            expect(z['is.f.primitive']).toBe(true);

            expect(z['to.len'][V]).toBe(void 2);
            expect(z['to.str'][V]).toBe('[object Object]');
        });


    });

});
