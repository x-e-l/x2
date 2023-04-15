import prototype$ from '#src/core/prototype$.core.js';
import {P, V} from '#src/etc/field.const.js';
import KNOWN from '#src/etc/known.const.js';


const FIELDS = Object.keys(prototype$());


const mightInclude = (fields, key) => fields.some(f => f.startsWith(key));

// eslint-disable-next-line max-lines-per-function
const getter = (X, object) => {

    const nav = prefix => {
        const none = new X();

        return new Proxy(none, {
            get: (_, k) => {
                if ('symbol' === typeof k) {
                    return none;
                }

                const key = `${prefix}.${k}`;
                if (FIELDS.includes(key)) {
                    return object[key];
                }

                if (mightInclude(FIELDS, key)) {
                    return nav(key);
                }

                return none;
            },
        });
    };

    const get = (t, k, r) => { // eslint-disable-line max-lines-per-function

        if (k instanceof X) {
            return get(t, k[V], r);
        }

        if (k === V) {
            return Reflect.get(t, k, r);
        }

        if (KNOWN.includes(k)) {
            return Reflect.get(t, k, r);
        }

        // if still a symbol, just skip to the end
        if ('symbol' !== typeof k) {

            const index = Number.parseFloat(k);
            if (Number.isSafeInteger(index) && 0 <= index) {
                const array = Reflect.get(t, V, r);
                if (Array.isArray(array)) {
                    return new X(array[index]);
                }
            }

            if (FIELDS.includes(k)) {
                return Reflect.get(t, k, r);
            }

            const key = P + k;
            if (FIELDS.includes(key)) {
                return Reflect.get(t, key, r);
            }

            if (mightInclude(FIELDS, key)) {
                return nav(key);
            }
        }

        return t instanceof X ? t : new X();
    };

    return get;
};


export default getter;
