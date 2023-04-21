import identity from '#src/util/fn/identity.util.js';
import toString from '#src/util/to/string.util.js'; // eslint-disable-line no-shadow


const split = (separator, value) => toString(value).split(separator).filter(identity);


// noinspection JSUnusedGlobalSymbols
export default split;
