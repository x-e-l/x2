import {describe, expect, it} from '@jest/globals';
import estype from './estype.util.js';


describe('function estype', () => {


    it.each([
        // result, value
        ['null', null],
        ['undefined', void 1],
        ['boolean', true],
        ['boolean', false],
        ['number', 1],
        ['string', 'string'],
        ['symbol', Symbol('')],
        ['object', {}],
        ['object', []],
        ['function', $ => $],
        ['object', globalThis],
    ])('returns %p for %p', expect(estype).toMapExact);


});
