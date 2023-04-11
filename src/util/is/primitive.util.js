import ET from '#src/etc/et.const.js';
import estype from '#src/util/estype.util.js';


const isPrimitive = $ => {
    const et = estype($);
    return et !== ET.obj && et !== ET.fun;
};


export default isPrimitive;
