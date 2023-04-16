import nav from '#src/core/nav.core.js';
import prototype$ from '#src/core/prototype$.core.js';
import {P, V} from '#src/etc/field.const.js';
import KNOWN from '#src/etc/known.const.js';


const FIELDS = Object.keys(prototype$());


// eslint-disable-next-line max-lines-per-function
const getter = X => {

    // noinspection UnnecessaryLocalVariableJS
    const get = (t, k, r) => { // eslint-disable-line max-lines-per-function
        try {

            while (k instanceof X) {
                k = k[V];
            }

            if (k === V || 'symbol' === typeof k || KNOWN.includes(k)) {
                return Reflect.get(t, k, r);
            }

            if (FIELDS.includes(k)) {
                return Reflect.get(t, k, r);
            }

            const prefix = P + k;
            if (FIELDS.includes(prefix)) {
                return Reflect.get(t, prefix, r);
            }

            if (FIELDS.some($ => $.startsWith(prefix))) {
                return nav({X, object: t, prefix, allowed: FIELDS});
            }

            const index = Number.parseFloat(k);
            if (Number.isSafeInteger(index) && 0 <= index) {
                const array = Reflect.get(t, V, r);
                if (Array.isArray(array)) {
                    return new X(array[index]);
                }
            }

            return new X(
                t instanceof X
                    ? Reflect.get(t, V, r)?.[k]
                    : Reflect.get(t, k, r),
            );

        } catch (e) {
            return new X(e);
        }
    };

    return get;
};


export default getter;
