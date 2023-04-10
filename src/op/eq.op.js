/* eslint-disable new-cap */


import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';


const F = X(false);
const T = X(true);


const is = (a, b) => {
    const aa = X(a)[V];
    const bb = X(b)[V];

    return (
        Number.isNaN(aa) || Number.isNaN(bb)
            ? F
            : (aa === bb ? T : F)
    );
};


// noinspection JSUnusedGlobalSymbols
export default is;
