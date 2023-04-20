import ET from '#src/etc/et.const.js';
import {_NOT_FOUND_} from '#src/etc/value.const.js';
import estype from '#src/util/estype.util.js';
import identity from '#src/util/fn/identity.util.js';


const join = (prefix, key) => [prefix, key].filter($ => $).join('.');
const by = path => $ => $.startsWith(path);

const nav = $ => {

    const {object, prefix} = $ ?? {};
    const allowed = $?.allowed ?? [];

    return new Proxy(identity, {
        get: (_, key) => {

            if (ET.sym === estype(key)) {
                return (
                    ET.obj === estype(object) && Reflect.has(object, key)
                        ? object[key]
                        : _NOT_FOUND_
                );
            }

            const path = join(prefix, key);
            if (allowed.includes(path)) {
                return object?.[path];
            }

            if (path !== prefix && allowed.some(by(path))) {
                return nav({object, allowed, prefix: path});
            }

            return _NOT_FOUND_;
        },
    });
};


export default nav;
