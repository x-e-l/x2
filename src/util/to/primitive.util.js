import toNumber from '#src/util/to/number.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const toPrimitive = (hint, value) => (
     
    'number' === hint
        ? toNumber(value)
        : toString(value)

);


// noinspection JSUnusedGlobalSymbols
export default toPrimitive;
