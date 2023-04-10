/* eslint-disable new-cap */


import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';


const is = (a, b) => {
    const aa = X(a)[V];
    const bb = X(b)[V];
    return X(Object.is(aa, bb));
};


// noinspection JSUnusedGlobalSymbols
export default is;
