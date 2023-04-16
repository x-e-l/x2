import {V} from '#src/etc/field.const.js';


const M = 'Not found due to missing property';
const S = 'Not found due to Symbol key';


// eslint-disable-next-line func-style,no-restricted-syntax
function N($) {
    this[V] = $;
}

const join = (prefix, key) => [prefix, key].filter($ => $).join('.');
const byStartsWith = path => $ => $.startsWith(path);

const configure = options => {
    const conf = {
        object:      options?.object,
        prefix:      options?.prefix,
        allowed:     options?.allowed ?? [],
        X:           options?.X ?? N,
        placeholder: options?.placeholder,
    };

    if (conf.placeholder) {
        return conf;
    }

    try {
        conf.placeholder = new conf.X({...conf});
    } catch (e) {
        conf.X = N;
        conf.error = e;
        conf.placeholder = new conf.X({...conf});
    }

    return conf;
};

const nav = options => {

    const conf = configure(options);
    conf.nav = nav;
    const {X, object, prefix, allowed, placeholder} = conf;

    return new Proxy(placeholder, {
        get: (_, key) => {

            if ('symbol' === typeof key) {
                return new X({...conf, reason: S, key});
            }

            const path = join(prefix, key);

            if (allowed.includes(path)) {
                return object[path];
            }

            if (allowed.some(byStartsWith(path))) {
                return nav({...conf, prefix: path});
            }

            return new X({...conf, reason: M, key});
        },
    });
};


export default nav;
