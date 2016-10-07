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
/* eslint-env jest, jasmine */
jest.unmock('../settings');
import { Settings } from '../settings';
describe('Settings', () => {
    describe('defaults and construction', () => {
        beforeEach(() => {
            Settings.default.reset();
        });
        it('can get the cookie manager', () => {
            expect(Settings.cookieManager).toBe(null);
        });
        it('can set the cookie manager', () => {
            Settings.cookieManager = 'cookieManager';
            expect(Settings.cookieManager).toBe('cookieManager');
        });
        it('can get and set the defaults', () => {
            Settings.default.host = 'http://www.example.com';
            Settings.default.token = 'abcd1234';
            Settings.default.headers = { Authorizarion: 'Basic ABDC1234' };
            let defSettings = new Settings();
            Settings.default.host = 'http://example.com';
            Settings.default.token = 'efgh5678';
            Settings.default.headers = {};
            expect(defSettings.host).toBe('http://www.example.com');
            expect(defSettings.token).toBe('abcd1234');
            expect(defSettings.plugConfig.uriParts).toEqual({ query: { 'dream.out.format': 'json' } });
            expect(defSettings.plugConfig.headers).toEqual({ Authorizarion: 'Basic ABDC1234' });
            expect(Settings.default.host).toBe('http://example.com');
            expect(Settings.default.token).toBe('efgh5678');
            expect(Settings.default.headers).toEqual({});
        });
        it('can create a settings object', () => {
            let settings = new Settings({
                host: 'http://www.example.com',
                origin: 'http://foo.com',
                queryParams: { foo: 'bar' }
            });
            expect(settings.host).toBe('http://www.example.com');
            expect(settings.origin).toBe('http://foo.com');
            expect(settings.plugConfig.uriParts).toEqual({ query: { foo: 'bar' } });
            expect(typeof settings.plugConfig.beforeRequest).toBe('function');
        });
        it('can behave differently based on the origin parameter', () => {
            const settings = new Settings({
                host: 'http://www.example.com',
                origin: 'http://www.example.com'
            });
            expect(settings.plugConfig.headers).toEqual({ 'X-Deki-Requested-With': 'XMLHttpRequest', 'X-Deki-Client': 'mindtouch-martian' });
            const settings2 = new Settings({
                host: 'http://www.example.com',
                origin: 'http://www.google.com/foo/bar'
            });
            expect(settings2.plugConfig.headers).toEqual({ 'X-Deki-Client': 'mindtouch-martian' });
        });
    });
    describe('beforeRequest handling', () => {
        it('can handle a dev token that is not set', () => {
            let settings = new Settings();
            let params = { headers: {} };
            params = settings.plugConfig.beforeRequest(params);
            expect(params).toEqual({ headers: {} });
        });
        it('can handle a dev token that is a string', () => {
            let settings = new Settings({
                token: 'abcd1234'
            });
            let params = { headers: {} };
            params = settings.plugConfig.beforeRequest(params);
            expect(params.headers).toEqual({ 'X-Deki-Token': 'abcd1234' });
        });
        it('can handle a dev token that is a function', () => {
            let settings = new Settings({
                token: () => '1234abcd'
            });
            let params = { headers: {} };
            params = settings.plugConfig.beforeRequest(params);
            expect(params.headers).toEqual({ 'X-Deki-Token': '1234abcd' });
        });
    });
});
