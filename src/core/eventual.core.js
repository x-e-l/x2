import noop from '#src/util/fn/noop.util.js';


class Eventual extends Promise {

    #executor;

    #promise;

    constructor(executor) {
        super(noop);
        this.#executor = executor;
    }

    static all(iterable) {
        return new Eventual(() => Promise.all(iterable));
    }

    static allSettled(iterable) {
        return new Eventual(() => Promise.allSettled(iterable));
    }

    static any(iterable) {
        return new Eventual(() => Promise.any(iterable));
    }

    static race(iterable) {
        return new Eventual(() => Promise.race(iterable));
    }

    static resolve(value) {
        return new Eventual(resolve => resolve(value));
    }

    static reject(reason) {
        return new Eventual((resolve, reject) => reject(reason));
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
