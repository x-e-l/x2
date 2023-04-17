import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import estype from '#src/util/estype.util.js';


const TAG = Object.freeze({
    array:     '(arr)',
    bigint:    '(bnt)',
    boolean:   '(bul)',
    function:  '(fun)',
    number:    '(num)',
    object:    '(obj)',
    null:      '(nul)',
    string:    '(str)',
    symbol:    '(sym)',
    undefined: '(und)',
});

const rename$ = (

    object => {

        if (!object) {
            return object;
        }

        const v = object[V];
        const et = estype(v);

        const value = (
            ET.fun === et
                ? v.name ? `"${v.name}"` : TAG.function
                : (
                    Array.isArray(v)
                        ? TAG.array
                        : TAG[et]
                )
        );

        try {
            Object.defineProperty(object, 'name', {value});
        } catch {
            // left empty since it doesn't matter that much if setting the name fails
        }

        return object;

    }

);


// noinspection JSUnusedGlobalSymbols
export default rename$;
