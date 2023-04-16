/* eslint-disable new-cap,no-magic-numbers */
// noinspection SpellCheckingInspection


import {describe, expect, it} from '@jest/globals';
import X from './index.js';
import {P, V} from '#src/etc/field.const.js';


// eslint-disable-next-line max-lines-per-function
describe('function X', () => {

    describe.each([
        null,
        void 1,
        false,
        true,
        '',
        'string',
        0,
        3.14,
    ])('converts %p', primitive => {

        it.each([
            Boolean, Number, String,
        ])('wrapped by %p into primitive', Constructor => {

            const object = new Constructor(primitive);
            const value = object.valueOf();

            expect(X(object)[P].es.value).toBe(value);

        });

    });

    describe('does not allow subclassing', () => {

        const object = Object.freeze({});

        class Z extends X.constructor {
        }

        // noinspection JSPotentiallyInvalidConstructorUsage
        const x = new X.constructor(object);
        // noinspection JSCheckFunctionSignatures
        const y = new Z(object);

        expect(typeof X.constructor).toBe('function');
        expect(typeof x).toBe('function');
        expect(typeof Z).toBe('function');
        expect(typeof y).toBe('function');

        expect(x[P].es.type).toBe('object');
        expect(y[P].es.type).toBe('object');

        expect(x[P].es.value).toBe(object);
        expect(y[P].es.value).not.toBe(object);

        expect(y[P].es.value instanceof Error).toBe(true);
        expect(y[P].es.value.message).toBe('X is not sub-class-able');
    });

    describe('creates instance(s) that', () => {
        it('can be used as a key/index', () => {
            const a = [1, 2, 3];
            const o = {a: 1, b: 2};

            const k = X('b');
            const i = X(1);

            const xo = X(o);
            const xa = X(a);

            expect(xa[i][V]).toBe(a[1]);
            expect(xo[k][V]).toBe(o.b);
        });
    });

});
