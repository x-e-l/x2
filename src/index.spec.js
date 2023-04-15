/* eslint-disable new-cap,no-magic-numbers */
// noinspection SpellCheckingInspection


import {describe, expect, it} from '@jest/globals';
import X from './index.js';


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

            expect(X(object).es.value).toBe(value);

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

        expect(x.es.type).toBe('object');
        expect(y.es.type).toBe('object');

        expect(x.es.value).toBe(object);
        expect(y.es.value).not.toBe(object);

        expect(y.es.value instanceof Error).toBe(true);
        expect(y.es.value.message).toBe('X is not sub-class-able');
    });


});
