/* eslint-disable no-magic-numbers */
import {describe, expect, it} from '@jest/globals';
import includes from './includes.util.js';


describe('function includes', () => {

    it.each([
        // result, options
        [false, null],
        [false, void 1],
        [false, {}],
        //
        [false, {allowed: []}],
        [false, {allowed: ['x.y.z']}],
        [false, {allowed: [], path: ''}],
        //
        [true, {allowed: [''], path: ''}],
        [true, {allowed: ['']}],
        //
        [false, {allowed: ['x.y.z'], path: 'x', full: true}],
        [true, {allowed: ['x.y.z'], path: 'x', full: false}],
        //
        [true, {allowed: ['x.y.z'], path: ['x'], full: false}],
        [false, {allowed: ['x.y.z'], path: ['x'], full: true}],
        [true, {allowed: ['x.y.z'], path: ['x', 'y', 'z'], full: true}],
    ])('returns %p for %p, %p', expect(includes).toMapExact);


});
