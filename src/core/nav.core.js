import ET from '#src/etc/et.const.js';
import estype from '#src/util/estype.util.js';


const M = 'Not found';


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
                return (
                    ET.obj === estype(object) && Reflect.has(object, key)
                        ? object[key]
                        : new X({...conf, reason: M, key})
                );
            }

            const path = join(prefix, key);
            if (allowed.includes(path)) {
                return object?.[path];
            }

            if (path !== prefix && allowed.some(by(path))) {
                return nav({...conf, prefix: path});
            }

            return new X({...conf, reason: M, key});
        },
    });
};


export default nav;
