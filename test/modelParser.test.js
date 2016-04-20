/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { modelParser } from '../lib/modelParser';

describe('Model Parser', () => {
    describe('Type Converter', () => {
        it('returns true', () => {
            let toTrue = modelParser.to.boolean('true');
            expect(toTrue).toBe(true);
        });
        it('returns false', () => {
            let toFalse = modelParser.to.boolean('false') || modelParser.to.boolean();
            expect(toFalse).toBe(false);
        });
        it('returns a valid date', () => {
            let toDate = modelParser.to.date('Mon, 05 Oct 2015 18:44:27 GMT');
            expect(toDate).toBeDefined();
        });
        it('thows converting to date', () => {
            let err;
            try {
                modelParser.to.date('');
            } catch(e) {
                err = e;
            }
            expect(err).toBeDefined();
        });
        it('returns a valid integer', () => {
            let toInteger = modelParser.to.integer('5');
            expect(toInteger).toBe(5);
        });
        it('thows converting to integer', () => {
            let err;
            try {
                modelParser.to.integer('55-55');
            } catch(e) {
                err = e;
            }
            expect(err).toBeDefined();
        });
        it('returns a parsed json', () => {
            let parsed = modelParser.to.json('{}');
            expect(parsed).toEqual({});
        });
    });
    describe('Valid Check', () => {
        it('returns true', () => {
            let isTrue = modelParser.isValid(0) && modelParser.isValid(false) && modelParser.isValid([]);
            expect(isTrue).toBe(true);
        });
        it('returns false', () => {
            let isFalse = modelParser.isValid() ||
                          modelParser.isValid(null) ||
                          modelParser.isValid(NaN) ||
                          modelParser.isValid('');
            expect(isFalse).toBe(false);
        });
    });
    describe('Force Array', () => {
        it('returns an empty array', () => {
            let forcedArr = modelParser.forceArray();
            expect(forcedArr).toEqual([]);
        });
        it('returns an array with a value', () => {
            let forcedArr = modelParser.forceArray(5);
            expect(forcedArr).toEqual([ 5 ]);
        });
        it('returns the original array', () => {
            let originalArr = [ 5 ];
            let forcedArr = modelParser.forceArray(originalArr);
            expect(forcedArr).toBe(originalArr);
        });
    });
    describe('Get Value', () => {
        it('returns undefined with null', () => {
            let obj = null;
            let path = [ 'prop' ];
            let result = modelParser.getValue(obj, ...path);
            expect(result).not.toBeDefined();
        });
        it('returns undefined with long path', () => {
            let obj = { a: {} };
            let path = [ 'a', 'b', 'c' ];
            let result = modelParser.getValue(obj, ...path);
            expect(result).not.toBeDefined();
        });
        it('returns the value', () => {
            let obj = { a: { b: 5 } };
            let path = [ 'a', 'b' ];
            let result = modelParser.getValue(obj, ...path);
            expect(result).toBe(5);
        });
        it('returns the parent value of #text', () => {
            let obj = { a: { b: 'text' } };
            let path = [ 'a', 'b', '#text' ];
            let result = modelParser.getValue(obj, ...path);
            expect(result).toBe('text');
        });
        it('returns the value of #text', () => {
            let obj = { a: { b: { '#text': 'text' } } };
            let path = [ 'a', 'b', '#text' ];
            let result = modelParser.getValue(obj, ...path);
            expect(result).toBe('text');
        });
    });
    describe('Transform Value', () => {
        it('returns the value transformed by a type converter', () => {
            let value = '5';
            let transform = 'integer';
            let result = modelParser.transformValue(value, transform);
            expect(result).toBe(5);
        });
        it('returns the value transformed by a model', () => {
            let value = { '@id': 4 };
            let transform = [
                {
                    field: '@id',
                    name: 'ids',
                    isArray: true,
                    transform(val) {
                        return val + 1;
                    }
                }
            ];
            let result = modelParser.transformValue(value, transform);
            expect(result).toEqual({ ids: [ 5 ] });
        });
    });
    describe('Create Parser', () => {
        it('throws when parsing a bad model', () => {
            let model = [
                { field: 'id' },
                { field: 'id' }
            ];
            let parser = modelParser.createParser(model);
            let err;
            try {
                parser({ id: 5 });
            } catch(e) {
                err = e;
            }
            expect(err).toBeDefined();
        });
        it('throws when parsing bad data', () => {
            let model = [
                { field: 'id' }
            ];
            let parser = modelParser.createParser(model);
            let err;
            try {
                parser(5);
            } catch(e) {
                err = e;
            }
            expect(err).toBeDefined();
        });
    });
});
