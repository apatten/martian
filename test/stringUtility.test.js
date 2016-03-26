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
import {stringUtility} from 'lib/stringUtility';
describe('string utility tests', () => {
    it('can check if a string is blank', () => {
        expect(stringUtility.isBlank()).toBe(true);
        expect(stringUtility.isBlank('')).toBe(true);
        expect(stringUtility.isBlank('asdf')).toBe(false);
    });
    it('can make a string', () => {
        expect(stringUtility.makeString()).toBe('');
        expect(stringUtility.makeString('abc')).toBe('abc');
        expect(stringUtility.makeString([])).toBe('');
        expect(stringUtility.makeString({})).toBe('[object Object]');
    });
    it('can trim the left of a string', () => {
        expect(stringUtility.leftTrim()).toBe('');
        expect(stringUtility.leftTrim('   abc')).toBe('abc');
        expect(stringUtility.leftTrim('\tabc')).toBe('abc');
        expect(stringUtility.leftTrim('//abc', '/')).toBe('abc');
    });
    it('can separate a string to the left', () => {
        expect(stringUtility.stringLeft('foo/bar', '/')).toBe('foo');
        expect(stringUtility.stringLeft('foo bar', ' ')).toBe('foo');
        expect(stringUtility.stringLeft('foo/bar', 'o/')).toBe('fo');
        expect(stringUtility.stringLeft('foo', '/')).toBe('foo');
        expect(stringUtility.stringLeft('/foo', '/')).toBe('');
        expect(stringUtility.stringLeft('foo')).toBe('foo');
        expect(stringUtility.stringLeft('foo', '*')).toBe('foo');
    });
    it('can separate a string to the right', () => {
        expect(stringUtility.stringRight('foo/bar', '/')).toBe('bar');
        expect(stringUtility.stringRight('foo bar', ' ')).toBe('bar');
        expect(stringUtility.stringRight('foo/bar', '/b')).toBe('ar');
        expect(stringUtility.stringRight('foo', '/')).toBe('foo');
        expect(stringUtility.stringRight('foo')).toBe('foo');
        expect(stringUtility.stringRight('foo/', '/')).toBe('');
    });
    it('can split a string into words', () => {
        expect(stringUtility.words('foo   bar')).toEqual([ 'foo', 'bar' ]);
        expect(stringUtility.words('foo/bar', '/')).toEqual([ 'foo', 'bar' ]);
        expect(stringUtility.words('foo/bar', '9')).toEqual([ 'foo/bar' ]);
    });
    it('can check if a string starts with a pattern', () => {
        expect(stringUtility.startsWith('foobar', 'foo')).toBe(true);
        expect(stringUtility.startsWith('foobar', 'oo')).toBe(false);
    });
});
