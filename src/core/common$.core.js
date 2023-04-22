import {NZ, PZ} from '#src/etc/field.const.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';


const common$ = (X, map) => {

    map.set(PZ, Object.freeze(new X(+0)));
    map.set(NZ, Object.freeze(new X(-0)));

    for (const value of [null, void 1, true, false, '', NaN, Infinity, -Infinity, _NOT_FOUND_]) {
        map.set(value, Object.freeze(new X(value)));
    }

    return map;
};


// noinspection JSUnusedGlobalSymbols
export default common$;
