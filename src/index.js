import apply from '#src/core/apply.core.js';
import get from '#src/core/get.core.js';
import rename$ from '#src/core/rename$.core.js';
import reuse from '#src/core/reuse.core.js';
import {
    IS_F_ARRAY,
    IS_F_PRIMITIVE,
    IS_T_ARRAY,
    IS_T_PRIMITIVE,
    NZ,
    PZ,
    TO_NUM,
    TO_STR,
    V,
} from '#src/etc/field.const.js';
import iterator from '#src/iterator.core.js';
import estype from '#src/util/estype.util.js';
import isPrimitive from '#src/util/is/primitive.util.js';
import toNumber from '#src/util/to/number.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const {isArray} = Array;

// must be defined before X, so it can be used inside X
const COMMON = new Map();


class X extends Function {

    constructor($) {

        if (new.target !== X) {
            return new X(new TypeError('X is not sub-class-able')); // eslint-disable-line no-constructor-return
        }

        if ($ instanceof X) {
            return $; // eslint-disable-line no-constructor-return
        }

        const found = reuse(COMMON, $);
        if (found) {
            return found; // eslint-disable-line no-constructor-return
        }

        super();
        this[V] = $;

        return new Proxy(rename$(this), {get: get(X, this), apply}); // eslint-disable-line no-constructor-return
    }

    get estype() {
        return estype(this[V]);
    }

    get [IS_T_ARRAY]() {
        return isArray(this[V]);
    }

    get [IS_F_ARRAY]() {
        return !isArray(this[V]);
    }

    get [IS_T_PRIMITIVE]() {
        return isPrimitive(this[V]);
    }

    get [IS_F_PRIMITIVE]() {
        return !isPrimitive(this[V]);
    }

    get [TO_NUM]() {
        return toNumber(this[V]);
    }

    get [TO_STR]() {
        return toString(this[V]);
    }

    static X($) {
        return new X($);
    }

    toString() {
        return String(this[V]);
    }

    * [Symbol.iterator]() {
        yield* iterator(X, this);
    }

    [Symbol.toPrimitive](hint) {
        return 'number' === hint ? toNumber(this[V]) : toString(this[V]);
    }

}

// must be filled after X is defined so new X() can be called
COMMON.set(PZ, Object.freeze(new X(+0)));
COMMON.set(NZ, Object.freeze(new X(-0)));

for (const value of [null, void 1, true, false, '', NaN, Infinity, -Infinity]) {
    COMMON.set(value, Object.freeze(new X(value)));
}


const instance = $ => $ instanceof X;

X.X.instance = instance;
X.X.constructor = X;
X.X.prototype = X.prototype;

Object.freeze(X.X);


export default X.X;
