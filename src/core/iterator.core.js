import ET from '#src/etc/et.const.js';
import {IS_T_PRIMITIVE, V} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';


const {isArray} = Array;
const {entries} = Object;

const iterator = function* iterator(X, $) {
    const value = $?.[V];

    if (isArray(value)) {
        for (const item of value) {
            yield new X(item);
        }
    } else if (ET.fun === estype(value) || $[IS_T_PRIMITIVE]) {
        yield $;
    } else {
        let i = 0;
        for (const [k, v] of entries(value)) {
            yield new X({k, v, i});
            i += 1;
        }
    }
};

export default iterator;
