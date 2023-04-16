/* eslint-disable no-magic-numbers,new-cap,max-lines-per-function */
// noinspection JSCheckFunctionSignatures

import {describe, expect, it} from '@jest/globals';
import nav from './nav.core.js';
import {V} from '#src/etc/field.const.js';


// eslint-disable-next-line func-style,no-restricted-syntax
function Z($) {
    if (new.target !== Z) {
        return new Z($);
    }
    this[V] = $;
}

const E = Object.freeze({});
const D = Object.freeze({y: 9});
const C = Object.freeze({d: D});
const A = Object.freeze({a: 1, $b: 2, _c: C});

// console.log(JSON.stringify(A));
// {"":{"a":1,"$b":2,"_c":{"":{"d":{"":{"y":9}}}}}}

describe('function nav', () => {

    it.skip('returns an embedded error for incorrect call', () => {


        const p = nav();

        expect(p).toBe(true);

    });


});
