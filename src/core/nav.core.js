const M = 'Not found due to missing property';
const S = 'Not found due to Symbol key';


const join = (prefix, key) => [prefix, key].filter($ => $).join('.');
const by = path => $ => $.startsWith(path);


const nav = options => {

    options ??= {};

    const {X, object, prefix} = options;
    const allowed = options.allowed ?? [];
    const conf = {...options, allowed};

    try {
        conf.placeholder = new X({...conf});
        conf.nav = nav;
    } catch (e) {
        return e;
    }

    return new Proxy(conf.placeholder, {
        get: (_, key) => {

            if ('symbol' === typeof key) {
                return new X({...conf, reason: S, key});
            }

            const path = join(prefix, key);

            if (allowed.includes(path)) {
                return object[path];
            }

            if (allowed.some(by(path))) {
                return nav({...conf, prefix: path});
            }

            return new X({...conf, reason: M, key});
        },
    });
};


export default nav;
