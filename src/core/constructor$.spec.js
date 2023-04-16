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
    ])('does throw for %p', value => {
        expect(() => constructor$(value)).toThrow(TypeError);
    });

    it('upgrades the proper constructor', () => {
        class Z {
            static X() {// eslint-disable-line no-empty-function
            }
        }

        const y = constructor$(Z);

        expect(y).toBe(Z.X);
        expect(y.constructor).toBe(Z);
        expect(y.prototype).toBe(Z.prototype);

        try {
            y.frozen = 'this should not be set';
        } catch {
            // if it throws, it works
        } finally {
            expect(y.frozen).toBe(void 1);
        }

    });
});
