import {describe, expect, it} from '@jest/globals';
import noop from './noop.util.js';


describe('function noop', () => {


    it.each([
        // result, value
        [void 1, null],
        [void 1, void 1],
        [void 1, true],
        [void 1, false],
        [void 1, 1],
        [void 1, 'string'],
        [void 1, Symbol('')],
        [void 1, {}],
        [void 1, []],
        [void 1, $ => $],
        [void 1, globalThis],
    ])('returns %p for %p', expect(noop).toMapExact);


});
