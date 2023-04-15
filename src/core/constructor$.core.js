const DUMMY = (() => {

    let x; // eslint-disable-line prefer-const

    const X = function DummyX() {
        return x;
    };

    x = Object.freeze(new X());

    X.X = Object.freeze(Object.assign(() => x, {
        instance:    Object.freeze($ => $ instanceof X),
        constructor: X,
        prototype:   Object.freeze(X.prototype),
    }));

    Object.freeze(X);

    return X.X;
})();


const constructor$ = X => {

    // this constructor upgrade is for a specific use case,
    // just return dummy result for everything else
    if (!(X instanceof Function) || !(X.X instanceof Function)) {
        return DUMMY;
    }

    // yes necessary, `const` gives the name to the `=>` function
    // noinspection UnnecessaryLocalVariableJS
    const instance = $ => $ instanceof X;

    X.X.instance = instance;
    X.X.constructor = X;
    X.X.prototype = X.prototype;

    return Object.freeze(X.X);
};


// noinspection JSUnusedGlobalSymbols
export default constructor$;
