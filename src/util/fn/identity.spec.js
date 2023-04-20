import {describe, expect, it} from '@jest/globals';
import identity from './identity.util.js';


describe('function identity', () => {


    it.each(
        [Symbol(''), {}, [], $ => $, globalThis],
    )(
        'returns %p for %p',
        value => expect(identity(value)).toBe(value)
    );


});
