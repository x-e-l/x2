/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import Eventual from '#src/core/eventual.core.js';
import {
    IS_F_ARRAY,
    IS_F_ERROR,
    IS_F_PRIMITIVE,
    IS_F_PROMISE,
    IS_T_ARRAY,
    IS_T_ERROR,
    IS_T_PRIMITIVE,
    IS_T_PROMISE,
    M,
    V,
} from '#src/etc/field.const.js';
import X from '#src/index.js';


describe('function X.prototype', () => {

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, true],
        [false, ''],
        [false, 'asdf'],
        [false, Symbol('s')],
        [false, $ => $],
        [false, Object.create(null)],
        [false, 3],
        [false, 9999999999999999999n],
        [true, []],
        [true, [1, 2, 3]],
        //
    ])('[IS_T_ARRAY] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_T_ARRAY]).toBe(result);
        expect(x[M].is.t.array).toBe(result);

    });

    it.each([
        // result, value
        [true, null],
        [true, void 1],
        [true, false],
        [true, true],
        [true, ''],
        [true, 'asdf'],
        [true, Symbol('s')],
        [true, $ => $],
        [true, Object.create(null)],
        [true, 3],
        [true, 9999999999999999999n],
        [false, []],
        [false, [1, 2, 3]],
        //
    ])('[IS_F_ARRAY] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_F_ARRAY]).toBe(result);
        expect(x[M].is.f.array).toBe(result);

    });

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, true],
        [false, ''],
        [false, 'asdf'],
        [false, Symbol('s')],
        [false, $ => $],
        [false, Object.create(null)],
        [false, 3],
        [false, 9999999999999999999n],
        [false, []],
        [false, [1, 2, 3]],
        [true, new Error()],
        //
    ])('[IS_T_ERROR] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_T_ERROR]).toBe(result);
        expect(x[M].is.t.error).toBe(result);

    });

    it.each([
        // result, value
        [true, null],
        [true, void 1],
        [true, false],
        [true, true],
        [true, ''],
        [true, 'asdf'],
        [true, Symbol('s')],
        [true, $ => $],
        [true, Object.create(null)],
        [true, 3],
        [true, 9999999999999999999n],
        [true, []],
        [true, [1, 2, 3]],
        [false, new Error()],
        //
    ])('[IS_F_ERROR] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_F_ERROR]).toBe(result);
        expect(x[M].is.f.error).toBe(result);

    });

    it.each([
        // result, value
        [true, null],
        [true, void 1],
        [true, false],
        [true, true],
        [true, ''],
        [true, 'asdf'],
        [true, 3],
        [true, 9999999999999999999n],
        [true, Symbol('s')],
        [false, $ => $],
        [false, Object.create(null)],
        [false, []],
        [false, [1, 2, 3]],
        [false, new Error()],
        //
    ])('[IS_T_PRIMITIVE] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_T_PRIMITIVE]).toBe(result);
        expect(x[M].is.t.primitive).toBe(result);

    });

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, true],
        [false, ''],
        [false, 'asdf'],
        [false, 3],
        [false, 9999999999999999999n],
        [false, Symbol('s')],
        [true, $ => $],
        [true, Object.create(null)],
        [true, []],
        [true, [1, 2, 3]],
        [true, new Error()],
        //
    ])('[IS_F_PRIMITIVE] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_F_PRIMITIVE]).toBe(result);
        expect(x[M].is.f.primitive).toBe(result);

    });

    it.each([
        // result, value
        [false, null],
        [false, void 1],
        [false, false],
        [false, true],
        [false, ''],
        [false, 'asdf'],
        [false, 3],
        [false, 9999999999999999999n],
        [false, Symbol('s')],
        [false, $ => $],
        [false, Object.create(null)],
        [false, []],
        [false, [1, 2, 3]],
        [false, new Error()],
        [true, Eventual.resolve()],
        //
    ])('[IS_T_PROMISE] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_T_PROMISE]).toBe(result);
        expect(x[M].is.t.promise).toBe(result);

    });

    it.each([
        // result, value
        [true, null],
        [true, void 1],
        [true, false],
        [true, true],
        [true, ''],
        [true, 'asdf'],
        [true, 3],
        [true, 9999999999999999999n],
        [true, Symbol('s')],
        [true, $ => $],
        [true, Object.create(null)],
        [true, []],
        [true, [1, 2, 3]],
        [true, new Error()],
        [false, Eventual.resolve()],
        //
    ])('[IS_F_PROMISE] returns %p for %p', (result, value) => {

        const x = X(value);

        expect(x[V]).toBe(value);
        expect(x[IS_F_PROMISE]).toBe(result);
        expect(x[M].is.f.promise).toBe(result);

    });

});
