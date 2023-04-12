import ET from '#src/etc/et.const.js';
import {ES_TYPE, V} from '#src/etc/field.const.js';
import X from '#src/index.js';


const apply = (target, that, args) => {

    if (!X.instance(target)) {
        // eslint-disable-next-line new-cap
        return X(Reflect.apply(target, that, args));
    }

    if (ET.fun === (target[ES_TYPE])) {
        // eslint-disable-next-line no-use-before-define,new-cap
        return X(target[V].apply(that, args));
    }

    return target;
};


export default apply;
