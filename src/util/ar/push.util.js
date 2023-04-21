// noinspection SpellCheckingInspection
const push = (array, item) => {
    const a = Array.isArray(array) ? array : [];
    a.push(item);
    return a;
};

// noinspection JSUnusedGlobalSymbols
export default push;
