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
jest.unmock('../events.js');
import { Events } from '../events.js';

describe('User Events', () => {
    describe('constructor', () => {
        it('can construct a user events object', () => {
            let ue = new Events();
            expect(ue).toBeDefined();
            expect(() => Events()).toThrow();
        });
    });
    describe('functionality', () => {
        let ue = null;
        beforeEach(() => {
            ue = new Events();
        });
        afterEach(() => {
            ue = null;
        });
        it('can fetch activity for a user', () => {
            return ue.getUserActivity('viewer');
        });
        it('can log a search event', () => {
            return ue.logSearch('viewer', {});
        });
        it('can fetch a user\'s history listing', () => {
            return ue.getUserHistory(20);
        });
        it('can fetch a specific user history event detail', () => {
            return ue.getUserHistoryDetail(20, '1682aa2a-8165-bca3-3033-1176848a90b2');
        });
        it('can log a web widget impression event', () => {
            return ue.logWebWidgetImpression();
        });
        it('can fetch a page history event', () => {
            return ue.getPageHistory();
        });
        it('can fetch a draft history event', () => {
            return ue.getDraftHistory();
        });
        it('can fetch a page history detail event', () => {
            return ue.getPageHistoryDetail();
        });
        it('can fetch a list of available user activity logs ', () => {
            return ue.getAvailableUserActivityLogs();
        });
        it('can fetch a list of available site history logs ', () => {
            return ue.getAvailableSiteHistoryLogs();
        });
        it('can fetch a list of available draft history logs ', () => {
            return ue.getAvailableDraftsHistoryLogs();
        });
        it('can fetch a draft history log url ', () => {
            return ue.getDraftHistoryLogUrl('drafthistory-2016-10-000');
        });
        it('can fetch a site history log url ', () => {
            return ue.getSiteHistoryLogUrl('sitehistory-2016-10-000');
        });
        it('can fetch a user activity log url ', () => {
            return ue.getUserActivityLogUrl('useractivity-2016-10-000');
        });
        it('can fetch a draft history detail event', () => {
            return ue.getDraftHistoryDetail();
        });
    });
});
