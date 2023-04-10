import apply from '#src/core/apply.core.js';
import COMMON from '#src/core/common.core.js';
import rename$ from '#src/core/rename.core.js';
import reuse from '#src/core/reuse.core.js';
import ET from '#src/etc/et.const.js';
import {IS_F_ARRAY, IS_F_PRIMITIVE, IS_T_ARRAY, IS_T_PRIMITIVE, NZ, PZ, V} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';
import primitive from '#src/util/to/primitive.util.js';


class X extends Function {

    constructor($) {

        if (new.target !== X) {
            throw new TypeError('X is not sub-class-able');
        }

        if (X.instancePass($)) {
            return $; // eslint-disable-line no-constructor-return
        }

        const found = reuse($);
        if (found) {
            return found; // eslint-disable-line no-constructor-return
        }

        super();
        this[V] = $;
        rename$(this, $);

        return new Proxy(this, {apply}); // eslint-disable-line no-constructor-return
    }

    get estype() {
        return estype(this[V]);
    }

    get [IS_T_ARRAY]() {
        return Array.isArray(this[V]);
    }

    get [IS_F_ARRAY]() {
        return !Array.isArray(this[V]);
    }

    get [IS_T_PRIMITIVE]() {
        const et = estype(this[V]);
        return et !== ET.obj && et !== ET.fun;
    }

    get [IS_F_PRIMITIVE]() {
        const et = estype(this[V]);
        return et === ET.obj || et === ET.fun;
    }

    static X($) {
        return new X($);
    }

    static instancePass($) {
        return $ instanceof X;
    }

    static instanceFail($) {
        return !($ instanceof X);
    }

    toString() {
        return String(this[V]);
    }

    * [Symbol.iterator]() {
        const $ = this[V];

        if (Array.isArray($)) {
            for (const item of $) {
                yield new X(item);
            }
        } else if (ET.fun === estype($) || this[IS_T_PRIMITIVE]) {
            yield this;
        } else {
            let i = 0;
            for (const [k, v] of Object.entries($)) {
                yield new X({k, v, i});
                i += 1;
            }
        }
    }

    [Symbol.toPrimitive](hint) {
        return primitive(hint, this[V]);
    }

}

COMMON.set(PZ, new X(+0));
COMMON.set(NZ, new X(-0));

for (const value of [null, void 1, true, false, '', NaN, Infinity, -Infinity]) {
    COMMON.set(value, Object.freeze(new X(value)));
}


export default X;
