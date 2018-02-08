/* eslint-env jasmine, jest */
import { valid, required, optional, one, all, string, number, equals, bool, array } from '../validation.js';

describe('Validation', () => {
    const obj = {
        foo: 'bar',
        abc: true,
        num: 123,
        arr: [123, 456, 789],
        multi: 'true'
    };
    describe('single value validation', () => {
        it('can validate a single value', () => {
            const dog = 'cat';
            const errors = valid.value(dog, one(string(), number(), array()));
            expect(errors.length).toBe(0);
        });
        it('can validate a single, invalid value', () => {
            const num = 123;
            const numErrors = valid.value(num, all(string(), equals('foo')));
            expect(numErrors.length).toBe(2);
        });
    });
    describe('object keys validation', () => {
        it('can validate an empty object', () => {
            const errors = valid.object({}, optional('foo', string()));
            expect(errors.length).toBe(0);
        });
        it('can validate an object', () => {
            const foo = 'bar';
            const arr = [];
            const errors = valid.object(
                { foo, arr },
                required('foo', string()),
                required('arr', one(array(), string()))
            );
            expect(errors.length).toBe(0);
        });
        it('can simply validate required values', () => {
            const errors = valid.object(
                obj,
                required('foo'),
                required('abc'),
                required('num', one(equals(123), equals(456))),
                required('arr')
            );
            expect(errors.length).toBe(0);
        });
        it("can validate an object's values", () => {
            const errors = valid.object(
                obj,
                required('foo', string()),
                required('abc', bool()),
                optional('optional'),
                optional('num', all(number(), equals(123))),
                required('arr', array()),
                optional('multi')
            );
            expect(errors.length).toBe(0);
        });
        it('can report validation errors', () => {
            const errors = valid.object(
                obj,
                required('notThere'),
                required('abc', string()),
                required('foo', number()),
                required('multi', array()),
                required('num', equals(456)),
                required('arr', bool())
            );
            expect(errors.length).toBe(6);
        });
        it('can report `all` and `one` validation errors', () => {
            const errors = valid.object(
                obj,
                required('foo', one(equals('barf'), equals('baz'))),
                required('arr', all(array(), val => (val.length === 4 ? [] : ['The length should be 4'])))
            );
            expect(errors.length).toBe(3);
        });
    });
});
