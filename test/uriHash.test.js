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
import UriHash from 'uriHash';
describe('URI Hash tests', () => {
    let hashString = '#a=1&b=2';
    let hash = null;
    beforeEach(() => {
        hash = new UriHash(hashString);
    });
    afterEach(() => {
        hash = null;
    });
    describe('read tests', () => {
        it('can create a UriHash with no string', () => {
            let empty = new UriHash();
            expect(empty.getQueryParams()).toEqual({});
        });
        it('can read the hash as query parameters', () => {
            expect(hash.getQueryParams()).toEqual({ a: '1', b: '2' });
        });
        it('can fetch a single param', () => {
            expect(hash.getParam('b')).toBe('2');
        });
        it('can return the original hash string', () => {
            expect(hash.toHashString()).toBe('#a=1&b=2');
        });
    });
    describe('manipulation tests', () => {
        it('can replace the hash', () => {
            expect(hash.replaceParams({ c: '3', d: '4' }).toHashString()).toBe('#c=3&d=4');
        });
        it('can add a single parameter', () => {
            expect(hash.withParam('c', '3').toHashString()).toBe('#a=1&b=2&c=3');
        });
        it('can remove a single parameter', () => {
            expect(hash.withoutParam('b').toHashString()).toBe('#a=1');
        });
    });
});
