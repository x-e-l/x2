import iterator from '#src/core/iterator.core.js';
import {
    ES_TYPE,
    ES_VALUE,
    IS_F_ARRAY,
    IS_F_ERROR,
    IS_F_PRIMITIVE,
    IS_F_PROMISE,
    IS_T_ARRAY,
    IS_T_ERROR,
    IS_T_PRIMITIVE,
    IS_T_PROMISE,
    TO_BUL,
    TO_LEN,
    TO_NUM,
    TO_STR,
    V,
} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';
import isPrimitive from '#src/util/is/primitive.util.js';
import isPromise from '#src/util/is/promise.util.js';
import toBoolean from '#src/util/to/boolean.util.js';
import toNumber from '#src/util/to/number.util.js';
import toPrimitive from '#src/util/to/primitive.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const {isArray} = Array;


// eslint-disable-next-line max-lines-per-function
const prototype$ = X => {
    const properties = {
        // @formatter:off

        [ES_TYPE]:  {get() { return estype(this[V]); }},
        [ES_VALUE]: {get() { return this[V]; }},


        [IS_T_ARRAY]: {get() { return isArray(this[V]); }},
        [IS_F_ARRAY]: {get() { return !isArray(this[V]); }},

        [IS_T_ERROR]: {get() { return this[V] instanceof Error; }},
        [IS_F_ERROR]: {get() { return !(this[V] instanceof Error); }},

        [IS_T_PRIMITIVE]: {get() { return isPrimitive(this[V]); }},
        [IS_F_PRIMITIVE]: {get() { return !isPrimitive(this[V]); }},

        [IS_T_PROMISE]: {get() { return isPromise(this[V]); }},
        [IS_F_PROMISE]: {get() { return !isPromise(this[V]); }},

        [TO_LEN]: {get() { return new X(this[V]?.length); }},

        [TO_BUL]: {get() { return new X(toBoolean(this[V])); }},
        [TO_NUM]: {get() { return new X(toNumber(this[V])); }},
        [TO_STR]: {get() { return new X(toString(this[V])); }},


        toString: {value() { return toString(this[V]); }},

        [Symbol.iterator]: {* value() { yield* iterator(X, this); }},
        [Symbol.toPrimitive]: {value(hint) { return toPrimitive(hint, this[V]); }},

        // @formatter:off
    };

    Object.defineProperties(X?.prototype??{}, properties);
    return properties;
};

// noinspection JSUnusedGlobalSymbols
export default prototype$;
