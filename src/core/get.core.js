import nav from '#src/core/nav.core.js';
import prototype$ from '#src/core/prototype$.core.js';
import ET from '#src/etc/et.const.js';
import {M, V} from '#src/etc/field.const.js';
import KNOWN from '#src/etc/known.const.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';
import estype from '#src/util/estype.util.js';
import isPrimitive from '#src/util/is/primitive.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const FIELDS = Object.keys(prototype$());


// eslint-disable-next-line max-lines-per-function
const getter = X => {

    // eslint-disable-next-line complexity
    const get = (t, k, r) => { // eslint-disable-line max-lines-per-function
        try {

            while (k instanceof X) {
                k = k[V];
            }

            while (!isPrimitive(k)) {
                k = toString(k);
            }

            if (M === k) {
                return nav({object: t, allowed: FIELDS});
            }

            if (k === V || ET.sym === estype(k) || KNOWN.includes(k) || FIELDS.includes(k)) {
                return Reflect.get(t, k, r);
            }

            const index = Number.parseFloat(k);
            if (Number.isSafeInteger(index) && 0 <= index) {
                const array = Reflect.get(t, V, r);
                if (Array.isArray(array)) {
                    return new X(array[index]);
                }
            }

            if (t instanceof X) {
                // @see https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
                const pd = Reflect.getOwnPropertyDescriptor(t, k);

                // 10a
                if (pd && false === pd.writable && false === pd.configurable) {
                    return Reflect.get(t, k, r);
                }

                // 10b
                if (pd && void 1 === pd.get && false === pd.configurable) {
                    return void 1;
                }

                return new X(Reflect.get(t, V, r)?.[k]);
            }

            return new X(
                ET.obj === estype(t) && Reflect.has(t, k)
                    ? Reflect.get(t, k, r)
                    : _NOT_FOUND_,
            );

        } catch (e) {
            return new X(e);
        }
    };

    return get;
};


export default getter;
