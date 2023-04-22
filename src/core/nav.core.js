import ET from '#src/etc/et.const.js';
import {S} from '#src/etc/field.const.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';
import includes from '#src/util/ar/includes.util.js';
import estype from '#src/util/estype.util.js';


const nav = $ => {

    const {object, prefix = ''} = $ ?? {};
    const allowed = $?.allowed ?? [];

    // eslint-disable-next-line prefer-const
    let proxy;
    const navigate = () => proxy;

    proxy = new Proxy(navigate, {
        get: (_, key) => {

            if (ET.sym === estype(key)) {
                return (
                    ET.obj === estype(object) && Reflect.has(object, key)
                        ? object[key]
                        : _NOT_FOUND_
                );
            }

            const path = prefix ? [prefix, key].join(S) : key;
            if (includes({allowed, path, full: true})) {
                return object?.[path];
            }

            if (includes({allowed, path})) {
                return nav({object, allowed, prefix: path});
            }

            return _NOT_FOUND_;
        },
    });

    return proxy;
};


export default nav;
