import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';


const apply = X => (target, that, args) => {
    try {

        if (!(target instanceof X)) {
            // eslint-disable-next-line new-cap
            return new X(Reflect.apply(target, that, args));
        }

        const value = target[V];
        if (ET.fun === estype(value)) {
            // eslint-disable-next-line no-use-before-define,new-cap
            return new X(value.apply(that, args));
        }

        return target;

    } catch (e) {
        return new X(e);
    }

};


export default apply;
