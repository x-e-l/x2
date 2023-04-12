import iterator from '#src/core/iterator.core.js';
import {
    ES_TYPE,
    ES_VALUE,
    IS_F_ARRAY,
    IS_F_ERROR,
    IS_F_PRIMITIVE,
    IS_T_ARRAY,
    IS_T_ERROR,
    IS_T_PRIMITIVE,
    TO_BUL,
    TO_NUM,
    TO_STR,
    V,
} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';
import isPrimitive from '#src/util/is/primitive.util.js';
import toBoolean from '#src/util/to/boolean.util.js';
import toNumber from '#src/util/to/number.util.js';
import toPrimitive from '#src/util/to/primitive.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const {isArray} = Array;


// eslint-disable-next-line max-lines-per-function
const prototype$ = X => Object.defineProperties(X.prototype, {
    // @formatter:off

    [ES_TYPE]:  {get() { return estype(this[V]); }},
    [ES_VALUE]: {get() { return this[V]; }},


    [IS_T_ARRAY]: {get() { return isArray(this[V]); }},
    [IS_F_ARRAY]: {get() { return !isArray(this[V]); }},

    [IS_T_ERROR]: {get() { return this[V] instanceof Error; }},
    [IS_F_ERROR]: {get() { return !(this[V] instanceof Error); }},

    [IS_T_PRIMITIVE]: {get() { return isPrimitive(this[V]); }},
    [IS_F_PRIMITIVE]: {get() { return !isPrimitive(this[V]); }},


    [TO_BUL]: {get() { return toBoolean(this[V]); }},
    [TO_NUM]: {get() { return toNumber(this[V]); }},
    [TO_STR]: {get() { return toString(this[V]); }},


    toString: {value() { return toString(this[V]); }},


    [Symbol.iterator]: {* value() { yield* iterator(X, this); }},
    [Symbol.toPrimitive]: {value(hint) { return toPrimitive(hint, this[V]); }},

    // @formatter:off
});

// noinspection JSUnusedGlobalSymbols
export default prototype$;
