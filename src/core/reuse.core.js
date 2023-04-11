import {NZ, PZ} from '#src/etc/field.const.js';


const reuse = (common, value) => {


    if (Object.is(value, -0) && common.has(NZ)) {
        return common.get(NZ);
    }

    if (Object.is(value, +0) && common.has(PZ)) {
        return common.get(PZ);
    }

    if (common.has(value)) {
        return common.get(value);
    }

    return void 1;
};


export default reuse;
