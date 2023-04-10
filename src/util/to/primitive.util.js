import estype from '#src/util/estype.util.js';


const primitive = (hint, value) => {
    if ('number' !== hint) {
        return String(value);
    }

    if (null === value || void 1 === value) {
        return NaN;
    }

    if (Number.isNaN(value) || 'symbol' === estype(value)) {
        return NaN;
    }

    if (Number.isFinite(value) || Infinity === value || -Infinity === value) {
        return value;
    }

    try {
        return Number.parseFloat(value);
    } catch (e) {
        return NaN;
    }
};


// noinspection JSUnusedGlobalSymbols
export default primitive;
