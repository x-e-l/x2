/* eslint-disable import/max-dependencies */


import apply from '#src/core/apply.core.js';
import common$ from '#src/core/common$.core.js';
import construct from '#src/core/construct.core.js';
import get from '#src/core/get.core.js';
import properties from '#src/core/properties.core.js';
import rename$ from '#src/core/rename$.core.js';
import reuse from '#src/core/reuse.core.js';
import {V} from '#src/etc/field.const.js';


// must be defined before X, so it can be used inside X
const COMMON = new Map();


class X extends Function {

    constructor(...$$) {
        const $ = $$.pop();
        const options = $$.pop();

        if ($ instanceof X) {
            return $; // eslint-disable-line no-constructor-return
        }

        const found = reuse(COMMON, $);
        if (found) {
            return found; // eslint-disable-line no-constructor-return
        }

        super();

        const isWrapper = $ instanceof Boolean || $ instanceof Number || $ instanceof String;
        this[V] = isWrapper ? $.valueOf() : $;

        rename$(this);
        if (options?.new && 'function' === typeof $) {
            this[V] = {[this.name]: (...$$) => new $(...$$)}[this.name];
        }

        const handler = {get: get(X, this), apply: apply(X), construct: construct(X)};


        // eslint-disable-next-line no-constructor-return
        return new Proxy(this, handler);
    }

    static X(...$$) {
        return new X(...$$);
    }
}


Object.defineProperties(X.prototype, properties(X));

X.X.class = X;
X.X.prototype = X.prototype;
Object.freeze(X.X);

common$(X, COMMON);


export default X.X;
