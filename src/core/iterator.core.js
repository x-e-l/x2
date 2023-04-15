import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';
import isPrimitive from '#src/util/is/primitive.util.js';


const {isArray} = Array;
const {entries} = Object;

/** @type {function(*,*):Generator<*, void, *>} */
const iterator = function* iterator(X, $) { // eslint-disable-line max-lines-per-function

    const value = $?.[V];
    const et = estype(value);

    if (ET.num === et && Number.isSafeInteger(value) && 0 < value) {
        for (let i = 0; i < value; i += 1) {
            yield new X({k: `${i}`, v: i, i});
        }
        return;
    }

    if (isPrimitive(value)) {
        yield $;
        return;
    }


    if (ET.fun === et) {
        yield ($ instanceof X ? $ : new X(value));
        return;
    }

    if (isArray(value)) {
        let i = 0;
        for (const v of value) {
            yield new X({k: `${i}`, v, i});
            i += 1;
        }
        return;
    }

    let i = 0;
    for (const [k, v] of entries(value)) {
        yield new X({k, v, i});
        i += 1;
    }
};

export default iterator;
