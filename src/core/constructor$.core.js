const constructor$ = X => {

    // noinspection UnnecessaryLocalVariableJS
    const instance = $ => $ instanceof X;

    X.X.instance = instance;
    X.X.constructor = X;
    X.X.prototype = X.prototype;

    return Object.freeze(X.X);
};


// noinspection JSUnusedGlobalSymbols
export default constructor$;
