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
jest.unmock('../siteReports.js');
import { SiteReports } from '../siteReports.js';

describe('Site Reports', () => {
    describe('constructor', () => {
        it('can create a new SiteReports object', () => {
            const sr = new SiteReports();
            expect(sr).toBeDefined();
        });
    });
    describe('operations', () => {
        let sr;
        beforeEach(() => {
            sr = new SiteReports();
        });
        it('can get the site health report (no params)', () => {
            return sr.getSiteHealth();
        });
        it('can get the site health report (all params)', () => {
            return sr.getSiteHealth({ analyzers: [ 'foo' ], severities: [ 'error' ] });
        });
        it('can fail with an invalid `analyzers` parameter', () => {
            const success = jest.fn();
            return sr.getSiteHealth({ analyzers: 'foo' }).then(() => {
                success();
                throw new Error('The promise was resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail with an invalid `severities` parameter', () => {
            const success = jest.fn();
            return sr.getSiteHealth({ severities: 'foo' }).then(() => {
                success();
                throw new Error('The promise was resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
});
