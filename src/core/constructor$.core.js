const constructor$ = X => {

    // this upgrade is for a specific constructor, throw error otherwise
    if (!(X instanceof Function) || !(X.X instanceof Function)) {
        throw new TypeError('X and X.X must both be instances of Function');
    }

    X.X.class = X;
    X.X.prototype = X.prototype;

    return Object.freeze(X.X);
};


// noinspection JSUnusedGlobalSymbols
export default constructor$;
