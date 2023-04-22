import {S} from '#src/etc/field.const.js';
import aeq from '#src/util/ar/aeq.util.js';
import split from '#src/util/st/split.util.js';


const segments = split.bind(null, S);


const includes = $ => {

    const full = !!$?.full;
    const allowed = Array.isArray($?.allowed) ? $.allowed : [];
    const path = Array.isArray($?.path) ? $.path : split(S, $?.path ?? '');

    for (const candidate of allowed.map(segments)) {

        if (full && path.length !== candidate.length) {
            continue;
        }

        if (!full && path.length > candidate.length) {
            continue;
        }

        if (0 === path.length) {
            return 0 === candidate.length;
        }

        if (aeq(path, full ? candidate : candidate.toSpliced(path.length))) {
            return true;
        }
    }

    return false;
};


// noinspection JSUnusedGlobalSymbols
export default includes;
