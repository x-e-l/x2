import {NZ, PZ} from '#src/etc/field.const.js';


const common$ = (X, map) => {

    map.set(PZ, Object.freeze(new X(+0)));
    map.set(NZ, Object.freeze(new X(-0)));

    for (const value of [null, void 1, true, false, '', NaN, Infinity, -Infinity]) {
        map.set(value, Object.freeze(new X(value)));
    }

    return map;
};


// noinspection JSUnusedGlobalSymbols
export default common$;
