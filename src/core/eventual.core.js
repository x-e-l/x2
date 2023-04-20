import noop from '#src/util/fn/noop.util.js';


class Eventual extends Promise {

    #executor;

    #promise;

    constructor(executor) {
        super(noop);
        this.#executor = executor;
    }

    static all(iterable) {
        return Eventual.#wait('all', iterable);
    }

    static allSettled(iterable) {
        return Eventual.#wait('allSettled', iterable);
    }

    static any(iterable) {
        return Eventual.#wait('any', iterable);
    }

    static race(iterable) {
        return Eventual.#wait('race', iterable);
    }

    static resolve(value) {
        return new Eventual(s => s(value));
    }

    static reject(reason) {
        return new Eventual((_, j) => j(reason));
    }

    static #wait(kind, iterable) {
        return new Eventual((s, j) => Promise[kind](iterable).then(s).catch(j));
    }

    then(onFulfilled, onRejected) {
        return this.#run().then(onFulfilled, onRejected);
    }

    catch(onRejected) {
        return this.#run().catch(onRejected);
    }

    finally(onFinally) {
        return this.#run().finally(onFinally);
    }

    #run() {
        this.#promise ??= new Promise(this.#executor);
        return this.#promise;
    }


}


export default Eventual;
