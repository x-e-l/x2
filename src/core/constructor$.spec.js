/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSValidateTypes

import {describe, expect, it} from '@jest/globals';
import constructor$ from './constructor$.core.js';


describe('function constructor$', () => {

    it.each([
        null,
        void 1,
        2, NaN, '',
        Object.freeze({}),
        Object.create(null),
        $ => $,
        {X: $ => $},
    ])('does not fail for %p, but returns dummy result', value => {
        const X = constructor$(value);

        expect(typeof X).toBe('function');
        expect(typeof X.instance).toBe('function');

        expect(typeof X.constructor).toBe('function');
        expect(typeof X.prototype).toBe('object');
        expect(X.prototype).not.toBe(null);

        const x = X();

        expect(x).toBeTruthy();
        expect(X()).toBe(x);

        expect(x instanceof X.constructor).toBe(true);
        expect(X.instance(x)).toBe(true);
        expect(X.prototype).toBeTruthy();
    });

    it('upgrades the proper constructor', () => {
        class Y {
            static X() {// eslint-disable-line no-empty-function
            }
        }

        const y = constructor$(Y);

        expect(y).toBe(Y.X);
        expect(y.constructor).toBe(Y);
        expect(y.prototype).toBe(Y.prototype);

        expect(typeof y.instance).toBe('function');
        expect(y.instance(new Y())).toBe(true);

        try {
            y.frozen = 'this should not be set';
        } catch {
            // if it throws, it works
        } finally {
            expect(y.frozen).toBe(void 1);
        }

    });


});
