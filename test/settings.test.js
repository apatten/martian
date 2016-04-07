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
import { Settings } from 'lib/settings';
describe('Settings', () => {
    it('can get and set a single config item', () => {
        Settings.defaults = {
            abc: 123,
            foo: 'bar'
        };
        let defSettings = new Settings();
        expect(defSettings.get('abc')).toBe(123);
        expect(defSettings.get('foo')).toBe('bar');
    });
    it('can create settings objects', () => {
        let settings1 = new Settings();
        let settings2 = new Settings({
            foo: 'bar',
            host: 'http://www.example.com'
        });
        settings1.set('foo', 'baz');
        expect(settings1.get('foo')).toBe('baz');
        expect(settings1.get('host')).not.toBeDefined();
        expect(settings2.get('foo')).toBe('bar');
        expect(settings2.get('host')).toBe('http://www.example.com');
        expect(() => Settings()).toThrow();
    });
    it('can set settings values', () => {
        let settings = new Settings();
        settings.set('foo', 'bar');
        settings.set('abc', 123);
        settings.set('object', { dog: 'cat' });
        expect(settings.get('foo')).toBe('bar');
        expect(settings.get('abc')).toBe(123);
        expect(settings.get('object')).toEqual({ dog: 'cat' });
        let newSettings = settings.getProperties();
        expect(newSettings.foo).toBe('bar');
        expect(newSettings.abc).toBe(123);
        expect(newSettings.object).toEqual({ dog: 'cat' });
    });
    it('can clone a settings object', () => {
        let settings = new Settings({ foo: 'bar', abc: 123 });
        let settings2 = settings.clone({ foo: 'baz' });
        expect(settings.get('foo')).toBe('bar');
        expect(settings2.get('foo')).toBe('baz');
        expect(settings.get('abc')).toBe(123);
        expect(settings2.get('abc')).toBe(123);
    });
    it('can clone a settings object with no overrides', () => {
        let settings = new Settings({ foo: 'bar', abc: 123 });
        let settings2 = settings.clone();
        expect(settings.get('foo')).toBe('bar');
        expect(settings2.get('foo')).toBe('bar');
        expect(settings.get('abc')).toBe(123);
        expect(settings2.get('abc')).toBe(123);
    });
});
