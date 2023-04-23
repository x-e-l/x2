import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import TAG from '#src/etc/tag.const.js';
import estype from '#src/util/estype.util.js';


const SUFFIX = ' is not a constructor';
const FULL = 'T[V] is not a constructor';

const construct = X => (T, a, C) => {
    try {
        if (!(T instanceof X)) {
            return new X(Reflect.construct(T, a, C));
        }
    } catch (e) {
        return new X(e);
    }

    try {
        if (ET.fun !== estype(T[V])) {
            return new X(...a);
        }
    } catch (e) {
        return new X(e);
    }

    try {
        return new X(new T[V](...a));
    } catch (e) {
        // eslint-disable-next-line no-shadow
        e.message = (
            e.message === FULL
                ? (T?.name || T?.[V]?.name || TAG.function) + SUFFIX
                : e.message
        );
        return new X(e);
    }
};


export default construct;
