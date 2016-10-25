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
/* eslint-env jasmine, jest */
jest.unmock('../utility.js');
import { utility } from '../utility.js';

describe('Martian utility', () => {
    it('can escape a string for search queries', () => {
        let unescaped = '1111\\+-&|!(){}[]^"~*?:2222';
        expect(utility.searchEscape(unescaped)).toBe('1111\\\\\\+\\-\\&\\|\\!\\(\\)\\{\\}\\[\\]\\^\\"\\~\\*\\?\\:2222');
    });
    it('can get an appropriately-encoded ID for an API resource', () => {
        expect(utility.getResourceId(123)).toBe(123);
        expect(utility.getResourceId(123, 'home')).toBe(123);
        expect(utility.getResourceId('dog')).toBe('=dog');
        expect(utility.getResourceId('dog', 'dog')).toBe('dog');
        expect(utility.getResourceId('dog?cat/apple')).toBe('=dog%253Fcat%252Fapple');
    });
    it('can get an appropriately-encoded user token', () => {
        expect(utility.getNormalizedUserActivityToken('user 1')).toBe('=user%25201');
        expect(utility.getNormalizedUserActivityToken(123)).toBe(123);
        expect(utility.getNormalizedUserActivityToken('user:token')).toBe('user:token');
        expect(() => utility.getNormalizedUserActivityToken()).toThrow();
    });
    it('can get an appropriately-encoded filename for file attachment access', () => {
        expect(utility.getFilenameId('foo.png')).toBe('foo.png');
        expect(utility.getFilenameId('foo')).toBe('=foo');
        expect(utility.getFilenameId('dog#cat.gif')).toBe('dog%2523cat.gif');
        expect(() => utility.getFilenameId(123)).toThrow();
    });
});
