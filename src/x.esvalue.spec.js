/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import {ES_VALUE, P, V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype[ES_VALUE]', () => {

    it.each([
        null, void 1,
        false, true,
        3, 9999999999999999999n,
        'asdf', Symbol('s'),
        '',
        [1, 2, 3],
        $ => $,
        Object.create(null),
    ])('returns the same %p', value => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[ES_VALUE]).toBe(value);
        expect(x[P].es.value).toBe(value);

    });

});
