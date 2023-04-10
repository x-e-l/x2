import ET from '#src/etc/et.const.js';
import estype from '#src/util/estype.util.js';


const rename$ = (object, value) => {
    if (ET.fun === estype(value) && value.name) {
        return;
    }

    if ('' === value) {
        Object.defineProperty(object, 'name', {value: '""'});
        return;
    }

    if (Object.is(value, -0)) {
        Object.defineProperty(object, 'name', {value: '-0'});
        return;
    }

    if (Array.isArray(value)) {
        Object.defineProperty(object, 'name', {value: 'array'});
        return;
    }

    const s = String(value);
    
    if ('[object Object]' === s) {
        Object.defineProperty(object, 'name', {value: 'object'});
        return;
    }

    Object.defineProperty(object, 'name', {value: s});
};


export default rename$;
