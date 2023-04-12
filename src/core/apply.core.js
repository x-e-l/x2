import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import X from '#src/index.js';
import estype from '#src/util/estype.util.js';


const apply = (target, that, args) => {

    // eslint-disable-next-line no-use-before-define
    if (!X.instance(target)) {
        return Reflect.apply(target, that, args);
    }

    if (ET.fun !== estype(target[V])) {
        return target;
    }

    // eslint-disable-next-line no-use-before-define,new-cap
    return X(target[V].apply(that, args));
};


export default apply;
