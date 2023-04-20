import {describe, expect, it, jest} from '@jest/globals';
import Eventual from '#src/core/eventual.core.js';


// eslint-disable-next-line max-lines-per-function
describe('class Eventual', () => {

    it('is a Promise', () => {
        const p = new Eventual();
        expect(p instanceof Eventual).toBe(true);
        expect(p instanceof Promise).toBe(true);
    });

    it(
        '.resolve and .reject return correct promise objects',
        () => {
            expect(Eventual.resolve()).toBeInstanceOf(Promise);
            expect(Eventual.resolve()).toBeInstanceOf(Eventual);
            expect(Eventual.reject()).toBeInstanceOf(Promise);
            expect(Eventual.reject()).toBeInstanceOf(Eventual);
        },
    );

    it(
        '.resolve returns the value',
        async () => {

            const v = Symbol('value');
            const fn = jest.fn($ => $);

            await Eventual.resolve(v).then(fn);
            expect(fn).toBeCalledTimes(1);
            expect(fn).toBeCalledWith(v);
        },
    );

    it(
        '.reject returns the reason',
        async () => {

            const r1 = Symbol('reason 1');
            const r2 = Symbol('reason 2');
            const f1 = jest.fn($ => $);
            const f2 = jest.fn($ => $);

            await Eventual.reject(r1).catch(f1);
            expect(f1).toBeCalledTimes(1);
            expect(f1).toBeCalledWith(r1);

            await Eventual.reject(r2).then(null, f2);
            expect(f2).toBeCalledTimes(1);
            expect(f2).toBeCalledWith(r2);
        },
    );

    it(
        '.finally is being called',
        async () => {

            const f1 = jest.fn($ => $);
            const f2 = jest.fn($ => $);

            await Eventual.resolve().finally(f1);
            await Eventual.reject().catch($ => $).finally(f2);

            expect(f1).toBeCalledTimes(1);
            expect(f2).toBeCalledTimes(1);
        },
    );


    it.each([
        Eventual.all,
        Eventual.allSettled,
        Eventual.any,
        Eventual.race,
    ])(
        'statics are being called',
        async fn => {

            const v = jest.fn($ => $());
            const j = jest.fn((_, $) => $());

            const p = fn([new Eventual(v), new Eventual(j)]).catch($ => $);

            expect(v).not.toBeCalled();
            expect(j).not.toBeCalled();

            await p;

            expect(v).toBeCalledTimes(1);
            expect(j).toBeCalledTimes(1);
        },
    );

});
