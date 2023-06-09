/* eslint-disable new-cap,no-magic-numbers,no-shadow */
// noinspection SpellCheckingInspection,JSValidateTypes


import {describe, expect, it} from '@jest/globals';
import X from './index.js';
import {M, V} from '#src/etc/field.const.js';


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

            expect(X(object)[M].es.value).toBe(value);

        });

    });

    it('allows subclassing', () => {

        const object = Object.freeze({});

        class Z extends X.class {
        }

        // noinspection JSPotentiallyInvalidConstructorUsage
        const x = X(object);
        // noinspection JSCheckFunctionSignatures
        const z = new Z(object);

        expect(x instanceof X).toBe(true);
        expect(z instanceof Z).toBe(true);
        expect(z instanceof X).toBe(true);

        expect(typeof X.constructor).toBe('function');
        expect(typeof x).toBe('function');
        expect(typeof Z).toBe('function');
        expect(typeof z).toBe('function');

        const metaX = x[M];
        const metaZ = z[M];

        expect(metaX.es.type).toBe('object');
        expect(metaZ.es.type).toBe('object');

        expect(metaX.es.value).toBe(object);
        expect(metaZ.es.value).toBe(object);
    });

    it('allows for passing of options', () => {
        const Z = function Z($) {
            Object.assign(this, {...$});
        };

        const a = Object.freeze({a: 1});
        const Y = X({new: true}, Z);
        const z = Y({a});

        expect(`"${Z.name}"`).toBe(Y.name[V]);
        expect(z[V] instanceof Z).toBe(true);
        expect(z[V].a).toBe(a);

    });

    describe('create instance(s) that', () => {

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

    it('can be invoked', () => {

        const undef = X();
        expect(undef()).toBeInstanceOf(X);
        expect(undef()[V]).toBe(void 1);

        const noop = X(() => void 1);
        expect(noop()).toBeInstanceOf(X);
        expect(noop()[V]).toBe(void 1);

        const ident = X($ => $);
        expect(ident(3)).toBeInstanceOf(X);
        expect(ident(3)[V]).toBe(3);

        const four = X(4);
        expect(four()).toBeInstanceOf(X);
        expect(four()[V]).toBe(4);

        const plus = X((a, b) => a + b);
        expect(plus(5, 6)).toBeInstanceOf(X);
        expect(plus(5, 6)[V]).toBe(11);

        const multiply = (a, b) => a * b;
        const mul = X(multiply);
        expect(mul.name[V]).toBe(multiply.name);

        expect(mul(7, 8)).toBeInstanceOf(X);
        expect(mul(7, 8)[V]).toBe(56);
    });


});
