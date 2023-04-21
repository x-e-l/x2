/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import ET from '#src/etc/et.const.js';
import {ES_TYPE, ES_VALUE, M, V} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype', () => {

    describe('[ES_VALUE]', () => {

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
            expect(x[M].es.value).toBe(value);

        });

    });

    describe('[ES_TYPE]', () => {

        it.each([
            // result, value
            [ET.nul, null],
            [ET.und, void 1],
            [ET.bul, false],
            [ET.bul, true],
            [ET.str, ''],
            [ET.str, 'asdf'],
            [ET.sym, Symbol('s')],
            [ET.fun, $ => $],
            [ET.obj, Object.create(null)],
            [ET.obj, []],
            [ET.obj, [1, 2, 3]],
            [ET.num, 3],
            [ET.bnt, 9999999999999999999n],
            //
        ])('returns %p for %p', (result, value) => {

            const x = X(value);

            expect(x[V]).toBe(value);
            expect(x[ES_TYPE]).toBe(result);
            expect(x[M].es.type).toBe(result);

        });

    });

});
