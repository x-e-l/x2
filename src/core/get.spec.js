/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import get from './get.core.js';
import {V} from '#src/etc/field.const.js';


describe('function get', () => {

    it('returns an embedded error for incorrect call', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }


        const getter = get(Z, new Z());

        expect(typeof getter).toBe('function');

        // TypeError: Reflect.get called on non-object
        expect(getter()[V] instanceof Error).toBe(true);

    });

    it('returns the proper fields', () => {

        // eslint-disable-next-line func-style,no-restricted-syntax
        function Z($) {
            this[V] = $;
        }

        Z.instance = $ => $ instanceof Z;

        const o = ({});
        const z = new Z();

        const getter = get(Z, z);

        expect(typeof getter).toBe('function');

        // expect(getter({}, false)[V]).toBe();
        // expect(getter({})[V]).toBe(true);

    });


});
