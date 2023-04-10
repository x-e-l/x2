import COMMON from '#src/core/common.core.js';
import {NZ, PZ} from '#src/etc/field.const.js';


const reuse = $ => {


    if (Object.is($, -0) && COMMON.has(NZ)) {
        return COMMON.get(NZ);
    }

    if (Object.is($, +0) && COMMON.has(PZ)) {
        return COMMON.get(PZ);
    }

    if (COMMON.has($)) {
        return COMMON.get($);
    }

    return void 1;
};


export default reuse;
