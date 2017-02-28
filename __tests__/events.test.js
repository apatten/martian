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
jest.unmock('../lib/utility.js');
import { Events } from '../events.js';

describe('User Events', () => {
    let ue = null;
    beforeEach(() => {
        ue = new Events();
    });
    afterEach(() => {
        ue = null;
    });
    describe('drafts hierarchy history', () => {
        it('can get the drafts history logs', () => {
            return ue.getSiteDraftsHistoryLogs();
        });
        it('can get a drafts history log URL', () => {
            return ue.getSiteDraftsHistoryLogUrl('foo');
        });
        it('can fail if no log name is supplied when fetching the drafts history log URL', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistoryLogUrl().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can get the drafts hierarchy history (no params)', () => {
            return ue.getSiteDraftsHistory();
        });
        it('can get the drafts hierarchy history (empty params)', () => {
            return ue.getSiteDraftsHistory({});
        });
        it('can get the drafts hierarchy history (all params)', () => {
            return ue.getSiteDraftsHistory({
                limit: 50,
                include: [ 'page', 'user' ],
                upTo: 'e973ddc4-f9e4-427b-82a7-bac1bbb826cf'
            });
        });
        it('can fail getting the drafts hierarchy history (invalid limit)', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistory({ limit: 'this is not a number' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the drafts hierarchy history (invalid include)', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistory({ include: 'this is not an array' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the drafts hierarchy history (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistory({ upTo: 123465 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can get a drafts hierarchy detail (no options)', () => {
            return ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf');
        });
        it('can get a drafts hierarchy detail (empty options)', () => {
            return ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', {});
        });
        it('can get a drafts hierarchy detail (all options)', () => {
            return ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', { include: [ 'group', 'file', 'request' ] });
        });
        it('can fail getting the drafts hierarchy history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistoryDetail(123).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the drafts hierarchy history detail (invalid include)', () => {
            const success = jest.fn();
            return ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', { include: {} }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('draft history', () => {
        it('can fetch the history of a draft (no params)', () => {
            return ue.getDraftHistory();
        });
        it('can fetch the history of a draft (no options)', () => {
            return ue.getDraftHistory(132);
        });
        it('can fetch the history of a draft (empty options)', () => {
            return ue.getDraftHistory(132, {});
        });
        it('can fetch the history of a draft (all options)', () => {
            return ue.getDraftHistory(132, { limit: 45, upTo: '1682aa2a-8165-bca3-3033-1176848a90b2', include: [ 'page', 'request' ] });
        });
        it('can fail getting the history of a draft (invalid limit)', () => {
            const success = jest.fn();
            return ue.getDraftHistory(123, { limit: {} }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the history of a draft (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getDraftHistory(123, { upTo: 666 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the history of a draft (invalid include)', () => {
            const success = jest.fn();
            return ue.getDraftHistory(123, { include: true }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can get a draft history detail (no options)', () => {
            return ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2');
        });
        it('can get a draft history detail (empty options)', () => {
            return ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', {});
        });
        it('can get a draft history detail (all options)', () => {
            return ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: [ 'file', 'page' ] });
        });
        it('can fail getting a draft history detail (missing page ID)', () => {
            const success = jest.fn();
            return ue.getDraftHistoryDetail().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting a draft history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getDraftHistoryDetail('foo/bar').then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting a draft history detail (invalid include)', () => {
            const success = jest.fn();
            return ue.getDraftHistoryDetail(54, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: 1 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('learning path history', () => {
        it('can get the learning path history (no options)', () => {
            return ue.getLearningPathHistory('foo');
        });
        it('can get the learning path history (empty options)', () => {
            return ue.getLearningPathHistory('foo', {});
        });
        it('can get the learning path history (all options)', () => {
            return ue.getLearningPathHistory('foo', {
                limit: 165,
                upTo: '1682aa2a-8165-bca3-3033-1176848a90b2',
                include: [ 'user', 'file' ]
            });
        });
        it('can fail getting the learning path history (no ID)', () => {
            const success = jest.fn();
            return ue.getLearningPathHistory().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the learning path history (invalid limit)', () => {
            const success = jest.fn();
            return ue.getLearningPathHistory('foo', { limit: 'ONE MILLION' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the learning path history (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getLearningPathHistory('foo', { upTo: 1000000 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail getting the learning path history (invalid include)', () => {
            const success = jest.fn();
            return ue.getLearningPathHistory('foo', { include: 'Not an array' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('site history', () => {
        it('can fetch the site history logs', () => {
            return ue.getSiteHistoryLogs();
        });
        it('can fetch a site history log URL', () => {
            return ue.getSiteHistoryLogUrl('foo');
        });
        it('can fail fetching a site history log URL with a missing name', () => {
            const success = jest.fn();
            return ue.getSiteHistoryLogUrl().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can get the site history (missing options)', () => {
            return ue.getSiteHistory();
        });
        it('can get the site history (empty options)', () => {
            return ue.getSiteHistory({});
        });
        it('can get the site history (all options)', () => {
            return ue.getSiteHistory({
                limit: 150,
                include: [ 'foo' ],
                upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
            });
        });
        it('can fail fetching the site history (invalid limit)', () => {
            const success = jest.fn();
            return ue.getSiteHistory({ limit: 'foo' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching the site history (invalid include)', () => {
            const success = jest.fn();
            return ue.getSiteHistory({ include: 'foo' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching the site history (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getSiteHistory({ upTo: true }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can get a site history detail (missing options)', () => {
            return ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2');
        });
        it('can get a site history detail (all options)', () => {
            return ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: [ 'page', 'user', 'group', 'file' ] });
        });
        it('can fail fetching a site history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getSiteHistoryDetail().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a site history detail (invalid include)', () => {
            const success = jest.fn();
            return ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'file' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('page history', () => {
        it('can fetch a page history (no arguments)', () => {
            return ue.getPageHistory();
        });
        it('can fetch a page history (no options)', () => {
            return ue.getPageHistory('home');
        });
        it('can fetch a page history (all options)', () => {
            return ue.getPageHistory(111, {
                limit: 200,
                include: [ 'ffffff', 'uuuuuuuu' ],
                upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
            });
        });
        it('can fail fetching a page history (invalid limit)', () => {
            const success = jest.fn();
            return ue.getPageHistory(123, { limit: 'file' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a page history (invalid include)', () => {
            const success = jest.fn();
            return ue.getPageHistory(123, { include: 'file' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a page history (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getPageHistory(123, { upTo: 4144 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fetch a page history detail (no options)', () => {
            return ue.getPageHistoryDetail('home', '1682aa2a-8165-bca3-3033-1176848a90b2');
        });
        it('can fetch a page history (all options)', () => {
            return ue.getPageHistoryDetail(111, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: [ 'ffffff', 'uuuuuuuu' ] });
        });
        it('can fail fetching a page history detail (missing page ID)', () => {
            const success = jest.fn();
            return ue.getPageHistoryDetail().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a page history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getPageHistoryDetail(123).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a page history detail (invalid include)', () => {
            const success = jest.fn();
            return ue.getPageHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'ffffff' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('user activity', () => {
        it('can fetch user activity logs', () => {
            return ue.getUserActivityLogs();
        });
        it('can fetch a user activity log URL', () => {
            return ue.getUserActivityLogUrl('foo');
        });
        it('can fail fetching a user activity log URL with a missing log name', () => {
            const success = jest.fn();
            return ue.getUserActivityLogUrl().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fetch a user activity (no options)', () => {
            return ue.getUserActivity('admin');
        });
        it('can fetch a user activity (all options)', () => {
            return ue.getUserActivity('admin', { limit: 444, include: [ 'page' ], upTo: '1682aa2a-8165-bca3-3033-1176848a90b2' });
        });
        it('can fetch a user activity (upTo === Date)', () => {
            return ue.getUserActivity('admin', { upTo: new Date() });
        });
        it('can fail fetching a user activity (missing token)', () => {
            const success = jest.fn();
            return ue.getUserActivity().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user activity (invalid token)', () => {
            const success = jest.fn();
            return ue.getUserActivity(true).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user activity (invalid limit)', () => {
            const success = jest.fn();
            return ue.getUserActivity('foo', { limit: '100' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user activity (invalid include)', () => {
            const success = jest.fn();
            return ue.getUserActivity('foo', { include: '100' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user activity (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getUserActivity('foo', { upTo: 100 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('user history', () => {
        it('can get user history (no options)', () => {
            return ue.getUserHistory();
        });
        it('can get user history (all options)', () => {
            return ue.getUserHistory({
                limit: 100,
                include: [ 'user' ],
                upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
            });
        });
        it('can get user history (upTo == Date)', () => {
            return ue.getUserHistory({ upTo: new Date() });
        });
        it('can fail fetching a user history (invalid limit)', () => {
            const success = jest.fn();
            return ue.getUserHistory({ limit: '100' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user history (invalid include)', () => {
            const success = jest.fn();
            return ue.getUserHistory({ include: '100' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user history (invalid upTo)', () => {
            const success = jest.fn();
            return ue.getUserHistory({ upTo: 100 }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fetch a user history detail (no options)', () => {
            return ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2');
        });
        it('can fetch a user history detail (all options)', () => {
            return ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: [ 'page', 'user', 'file', 'request' ] });
        });
        it('can fail fetching a user history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getUserHistoryDetail().then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail fetching a user history detail (missing detail ID)', () => {
            const success = jest.fn();
            return ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'page' }).then(() => {
                success();
                throw new Error('promise resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('logging events', () => {
        it('can log a page view (missing data)', () => {
            return ue.logPageView('foo/bar');
        });
        it('can log a page view (missing data)', () => {
            return ue.logPageView('foo/bar', { hello: 123 });
        });
        it('can log a search', () => {
            return ue.logSearch('admin', {});
        });
        it('can log a web widget impression', () => {
            return ue.logWebWidgetImpression();
        });
    });
});
