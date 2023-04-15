/* eslint-disable new-cap */


import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';
import toNumber from '#src/util/to/number.util.js';


const add = (a, b) => {
    const xa = X(a);
    const xb = X(b);
    
    const va = xa[V];
    const vb = xb[V];

    return X(toNumber(va) + toNumber(vb));
};


// noinspection JSUnusedGlobalSymbols
export default add;
