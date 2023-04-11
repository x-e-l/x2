import {P} from '#src/etc/field.const.js';


const starts = (fields, key) => fields.some(f => f.startsWith(key));

// eslint-disable-next-line max-lines-per-function
const getter = (X, object) => {

    const fields = Object.getOwnPropertyNames(X.prototype).filter(s => s.startsWith(P));

    const nav = prefix => {
        const none = new X();

        return new Proxy(none, {
            get: (_, k) => {
                if ('symbol' === typeof k) {
                    return none;
                }

                const key = `${prefix}.${k}`;
                if (fields.includes(key)) {
                    return object[key];
                }

                if (starts(fields, key)) {
                    return nav(key);
                }

                return none;
            },
        });
    };

    // noinspection UnnecessaryLocalVariableJS
    const get = (t, k, r) => {

        if ('symbol' === typeof k) {
            return Reflect.get(t, k, r);
        }

        const key = P + k;

        return (
            starts(fields, key)
                ? nav(key)
                : Reflect.get(t, k, r)
        );
    };

    return get;
};


export default getter;
