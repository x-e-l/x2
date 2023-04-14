const objectToString = Function.prototype.call.bind(Object.prototype.toString);


// eslint-disable-next-line no-shadow
const toString = value => {
    try {
        return String(value);
    } catch {
        return objectToString(value);
    }
};


// noinspection JSUnusedGlobalSymbols
export default toString;
