import ET from '#src/etc/et.const.js';
import {V} from '#src/etc/field.const.js';
import TAG from '#src/etc/tag.const.js';
import estype from '#src/util/estype.util.js';


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
