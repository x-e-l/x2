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
        return;
    }

    const et = estype(value);

    if (ET.num === et && Number.isSafeInteger(value) && 0 < value) {
        for (let index = 0; index < value; index += 1) {
            yield new X(index);
        }
        return;
    }

    if (ET.fun !== et && !$[IS_T_PRIMITIVE]) {
        let i = 0;
        for (const [k, v] of entries(value)) {
            yield new X({k, v, i});
            i += 1;
        }
        return;
    }

    yield $;
};

export default iterator;
