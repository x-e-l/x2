/* eslint-disable no-magic-numbers */
import {describe, expect, it} from '@jest/globals';
import split from './split.util.js';


describe('function split', () => {

    it.each([
        // result, separator, value
        [['null'], '.', null],
        [['undefined'], '.', void 1],
        [['n', 'u', 'l', 'l'], '', null],
        [['unde', 'ined'], 'f', void 1],
        [['rue'], 't', true],
        [['false'], '/', false],
        [['1'], '', 1],
        [[], 'string', 'string'],
        [['Symbol'], /[\d)(]/u, Symbol('1234')],
        [['[', ']'], 'object Object', {}],
        [['1', '2', '3'], ',', [1, 2, 3]],
        [[' => '], '$', $ => $],
        [[], /./u, globalThis],
    ])('returns %p for %p, %p', expect(split).toMapEqual);


});
