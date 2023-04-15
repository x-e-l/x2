/* eslint-disable import/max-dependencies */


import apply from '#src/core/apply.core.js';
import common$ from '#src/core/common$.core.js';
import constructor$ from '#src/core/constructor$.core.js';
import get from '#src/core/get.core.js';
import prototype$ from '#src/core/prototype$.core.js';
import rename$ from '#src/core/rename$.core.js';
import reuse from '#src/core/reuse.core.js';
import {V} from '#src/etc/field.const.js';


// must be defined before X, so it can be used inside X
const COMMON = new Map();


class X extends Function {

    constructor($) {

        if (new.target !== X) {
            return new X(new TypeError('X is not sub-class-able')); // eslint-disable-line no-constructor-return
        }

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

        return new Proxy(rename$(this), {get: get(X, this), apply: apply(X)}); // eslint-disable-line no-constructor-return
    }

    static X($) {
        return new X($);
    }
}

constructor$(X);
prototype$(X);
common$(X, COMMON);


export default X.X;
