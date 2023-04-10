import X from '#src/core/x.core.js';
import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';


const apply = (target, that, args) => {

    // eslint-disable-next-line no-use-before-define
    if (X.instanceFail(target)) {
        return Reflect.apply(target, that, args);
    }

    if (ET.fun !== target.estype) {
        return target;
    }

    // eslint-disable-next-line no-use-before-define
    return new X(target[V].apply(that, args));
};


export default apply;
