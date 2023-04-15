/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSValidateTypes

import {describe, expect, it} from '@jest/globals';
import iterator from './iterator.core.js';
import {V} from '#src/etc/field.const.js';


describe('function iterator', () => {

    // eslint-disable-next-line func-style,no-restricted-syntax
    function Z($) {
        this[V] = $;
    }

    it.each([
        null,
        void 1,
        2, NaN, '',
        Object.freeze({}),
        Object.create(null),
        $ => $,
        {X: $ => $},
        [1, 2, 3],
    ])('returns the simplest iterator for %p', value => {
        expect([...iterator(Z, value)]).toStrictEqual([value]);
    });


    it('returns array iterator for embedded array', () => {

        const o1 = Object.freeze({});

        const array = [o1, 3, 'four'];
        const expectedEntries = [{i: 0, k: '0', v: o1}, {i: 1, k: '1', v: 3}, {i: 2, k: '2', v: 'four'}];

        const actual = iterator(Z, {[V]: array});
        const spread = [...actual];

        expect(spread.length).toBe(array.length);
        expect(spread.every($ => $ instanceof Z)).toBe(true);
        expect(spread.map($ => $[V])).toStrictEqual(expectedEntries);

    });

    it('returns a range iterator for an embedded positive integer', () => {

        const expectedEntries = [{i: 0, k: '0', v: 0}, {i: 1, k: '1', v: 1}, {i: 2, k: '2', v: 2}];

        const actual = iterator(Z, {[V]: 3});
        const spread = [...actual];

        expect(spread.length).toBe(expectedEntries.length);
        expect(spread.every($ => $ instanceof Z)).toBe(true);
        expect(spread.map($ => $[V])).toStrictEqual(expectedEntries);

    });

    it('returns an entries iterator for an embedded object', () => {

        const object = Object.freeze({a: 7, b: 8, c: 9});
        const expectedEntries = [{i: 0, k: 'a', v: 7}, {i: 1, k: 'b', v: 8}, {i: 2, k: 'c', v: 9}];

        const actual = iterator(Z, {[V]: object});
        const spread = [...actual];

        expect(spread.length).toBe(expectedEntries.length);
        expect(spread.every($ => $ instanceof Z)).toBe(true);
        expect(spread.map($ => $[V])).toStrictEqual(expectedEntries);

    });

    it('returns an iterator for an embedded function', () => {

        const fn = Object.freeze($ => $);

        // same iteration, but the first one gets re-packaged before returned
        const r1 = [...iterator(Z, {[V]: fn})];
        const r2 = [...iterator(Z, new Z(fn))];

        expect(r1.length).toBe(1);
        expect(r1[0] instanceof Z).toStrictEqual(true);
        expect(r1[0][V]).toStrictEqual(fn);

        expect(r2.length).toBe(1);
        expect(r2[0] instanceof Z).toStrictEqual(true);
        expect(r2[0][V]).toStrictEqual(fn);

    });

});
