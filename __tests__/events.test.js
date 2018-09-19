import fetch from 'jest-fetch-mock';
import { Events } from '../events.js';
global.fetch = fetch;

describe('Events', () => {
    describe('operations', () => {
        const emptySummaryResp = { summary: [] };
        const emptyEventsResp = { events: [] };
        const emptyLogsResp = { logs: [] };
        let ue = null;
        beforeEach(() => {
            fetch.once('{}');
            ue = new Events();
        });
        afterEach(() => {
            fetch.resetMocks();
            ue = null;
        });
        describe('drafts hierarchy history', () => {
            it('can get the drafts history logs', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistoryLogs()).resolves.toEqual({ logs: [] });
            });
            it('can get a drafts history log URL', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistoryLogUrl('foo')).resolves.toEqual({});
            });
            it('can fail if no log name is supplied when fetching the drafts history log URL', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistoryLogUrl()).rejects.toEqual(
                    new Error('Attempting to get log url without required name')
                );
            });
            it('can get the drafts hierarchy history (no params)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistory()).resolves.toEqual(emptySummaryResp);
            });
            it('can get the drafts hierarchy history (empty params)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistory({})).resolves.toEqual(emptySummaryResp);
            });
            it('can get the drafts hierarchy history (all params)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteDraftsHistory({
                        limit: 50,
                        include: ['page', 'user'],
                        upTo: 'e973ddc4-f9e4-427b-82a7-bac1bbb826cf'
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail getting the drafts hierarchy history (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistory({ limit: 'this is not a number' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number less than or equal to 1000.')
                );
            });
            it('can fail getting the drafts hierarchy history (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistory({ include: 'this is not an array' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail getting the drafts hierarchy history (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistory({ upTo: 123465 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string.')
                );
            });
            it('can get a drafts hierarchy detail (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf')).resolves.toEqual(
                    emptySummaryResp
                );
            });
            it('can get a drafts hierarchy detail (empty options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', {})
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can get a drafts hierarchy detail (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', {
                        include: ['group', 'file', 'request']
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail getting the drafts hierarchy history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteDraftsHistoryDetail(123)).rejects.toEqual(
                    new Error('The detail ID must be specified, and it must be a string.')
                );
            });
            it('can fail getting the drafts hierarchy history detail (invalid include)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteDraftsHistoryDetail('e973ddc4-f9e4-427b-82a7-bac1bbb826cf', { include: {} })
                ).rejects.toEqual(new Error('The `include` option must be an array'));
            });
        });
        describe('draft history', () => {
            it('can fetch the history of a draft (no params)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory()).resolves.toEqual(emptySummaryResp);
            });
            it('can fetch the history of a draft (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory(132)).resolves.toEqual(emptySummaryResp);
            });
            it('can fetch the history of a draft (empty options)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory(132, {})).resolves.toEqual(emptySummaryResp);
            });
            it('can fetch the history of a draft (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getDraftHistory(132, {
                        limit: 45,
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2',
                        include: ['page', 'request']
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail getting the history of a draft (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory(123, { limit: {} })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('can fail getting the history of a draft (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory(123, { upTo: 666 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string.')
                );
            });
            it('can fail getting the history of a draft (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistory(123, { include: true })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can get a draft history detail (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2')).resolves.toEqual(
                    emptyEventsResp
                );
            });
            it('can get a draft history detail (empty options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', {})
                ).resolves.toEqual(emptyEventsResp);
            });
            it('can get a draft history detail (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getDraftHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: ['file', 'page'] })
                ).resolves.toEqual(emptyEventsResp);
            });
            it('can fail getting a draft history detail (missing page ID)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistoryDetail()).rejects.toEqual(
                    new Error('The page ID is required to fetch a draft history detail.')
                );
            });
            it('can fail getting a draft history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(ue.getDraftHistoryDetail('foo/bar')).rejects.toEqual(
                    new Error('The detail ID is required to fetch a draft history detail.')
                );
            });
            it('can fail getting a draft history detail (invalid include)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getDraftHistoryDetail(54, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: 1 })
                ).rejects.toEqual(new Error('The `include` parameter must be an array.'));
            });
        });
        describe('learning path history', () => {
            it('can get the learning path history (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory('foo')).resolves.toEqual(emptySummaryResp);
            });
            it('can get the learning path history (empty options)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory('foo', {})).resolves.toEqual(emptySummaryResp);
            });
            it('can get the learning path history (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getLearningPathHistory('foo', {
                        limit: 165,
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2',
                        include: ['user', 'file']
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail getting the learning path history (no ID)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory()).rejects.toEqual(
                    new Error('The learning path ID must be supplied, and must be a string')
                );
            });
            it('can fail getting the learning path history (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory('foo', { limit: 'ONE MILLION' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('can fail getting the learning path history (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory('foo', { upTo: 1000000 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string.')
                );
            });
            it('can fail getting the learning path history (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getLearningPathHistory('foo', { include: 'Not an array' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
        });
        describe('site history', () => {
            it('can fetch the site history logs', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistoryLogs()).resolves.toEqual(emptyLogsResp);
            });
            it('can fetch a site history log URL', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistoryLogUrl('foo')).resolves.toEqual({});
            });
            it('can fail fetching a site history log URL with a missing name', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistoryLogUrl()).rejects.toEqual(
                    new Error('Attempting to get log url without required name')
                );
            });
            it('can get the site history (missing options)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistory()).resolves.toEqual(emptySummaryResp);
            });
            it('can get the site history (empty options)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistory({})).resolves.toEqual(emptySummaryResp);
            });
            it('can get the site history (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteHistory({
                        limit: 150,
                        include: ['foo'],
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail fetching the site history (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistory({ limit: 'foo' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number less than or equal to 1000.')
                );
            });
            it('can fail fetching the site history (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistory({ include: 'foo' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail fetching the site history (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistory({ upTo: true })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string.')
                );
            });
            it('can get a site history detail (missing options)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2')).resolves.toEqual(
                    emptySummaryResp
                );
            });
            it('can get a site history detail (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', {
                        include: ['page', 'user', 'group', 'file']
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail fetching a site history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(ue.getSiteHistoryDetail()).rejects.toEqual(
                    new Error('The detail ID must be specified, and it must be a string.')
                );
            });
            it('can fail fetching a site history detail (invalid include)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getSiteHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'file' })
                ).rejects.toEqual(new Error('The `include` option must be an array'));
            });
        });
        describe('page history', () => {
            it('can fetch a page history (no arguments)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistory()).resolves.toEqual(emptySummaryResp);
            });
            it('can fetch a page history (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistory('home')).resolves.toEqual(emptySummaryResp);
            });
            it('can fetch a page history (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getPageHistory(111, {
                        limit: 200,
                        include: ['ffffff', 'uuuuuuuu'],
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail fetching a page history (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistory(123, { limit: 'file' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number less than or equal to 1000.')
                );
            });
            it('can fail fetching a page history (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistory(123, { include: 'file' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail fetching a page history (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistory(123, { upTo: 4144 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string.')
                );
            });
            it('can fetch a page history detail (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistoryDetail('home', '1682aa2a-8165-bca3-3033-1176848a90b2')).resolves.toEqual(
                    emptyEventsResp
                );
            });
            it('can fetch a page history (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getPageHistoryDetail(111, '1682aa2a-8165-bca3-3033-1176848a90b2', {
                        include: ['ffffff', 'uuuuuuuu']
                    })
                ).resolves.toEqual(emptyEventsResp);
            });
            it('can fail fetching a page history detail (missing page ID)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistoryDetail()).rejects.toEqual(
                    new Error('The page ID is required to fetch a page history detail.')
                );
            });
            it('can fail fetching a page history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(ue.getPageHistoryDetail(123)).rejects.toEqual(
                    new Error('The detail ID is required to fetch a page history detail.')
                );
            });
            it('can fail fetching a page history detail (invalid include)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getPageHistoryDetail(123, '1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'ffffff' })
                ).rejects.toEqual(new Error('The `include` parameter must be an array.'));
            });
        });
        describe('user activity', () => {
            it('can fetch user activity logs', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivityLogs()).resolves.toEqual(emptyLogsResp);
            });
            it('can fetch a user activity log URL', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivityLogUrl('foo')).resolves.toEqual({});
            });
            it('can fail fetching a user activity log URL with a missing log name', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivityLogUrl()).rejects.toEqual(
                    new Error('Attempting to get log url without required name')
                );
            });
            it('can fetch a user activity (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity('admin')).resolves.toEqual(emptyEventsResp);
            });
            it('can fetch a user activity (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getUserActivity('admin', {
                        limit: 444,
                        include: ['page'],
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
                    })
                ).resolves.toEqual(emptyEventsResp);
            });
            it('can fetch a user activity (upTo === Date)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity('admin', { upTo: new Date() })).resolves.toEqual(emptyEventsResp);
            });
            it('can fail fetching a user activity (missing token)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity()).rejects.toEqual(
                    new Error('The user activity token must be supplied')
                );
            });
            it('can fail fetching a user activity (invalid token)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity(true)).rejects.toEqual(
                    new Error('The user activity token must be a string or number')
                );
            });
            it('can fail fetching a user activity (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity('foo', { limit: '100' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('can fail fetching a user activity (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity('foo', { include: '100' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail fetching a user activity (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getUserActivity('foo', { upTo: 100 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string or a Date.')
                );
            });
        });
        describe('user history', () => {
            it('can get user history (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistory()).resolves.toEqual(emptySummaryResp);
            });
            it('can get user history (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getUserHistory(1, {
                        limit: 100,
                        include: ['user'],
                        upTo: '1682aa2a-8165-bca3-3033-1176848a90b2'
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can get user history (upTo == Date)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistory('admin', { upTo: new Date() })).resolves.toEqual(emptySummaryResp);
            });
            it('can fail fetching a user history (invalid limit)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistory('admin', { limit: '100' })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('can fail fetching a user history (invalid include)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistory(10, { include: '100' })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail fetching a user history (invalid upTo)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistory('current', { upTo: 100 })).rejects.toEqual(
                    new Error('The `upTo` parameter must be a string or a Date.')
                );
            });
            it('can fetch a user history detail (no options)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2')).resolves.toEqual(
                    emptySummaryResp
                );
            });
            it('can fetch a user history detail (all options)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', {
                        include: ['page', 'user', 'file', 'request']
                    })
                ).resolves.toEqual(emptySummaryResp);
            });
            it('can fail fetching a user history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(ue.getUserHistoryDetail()).rejects.toEqual(new Error('The detail ID must be supplied'));
            });
            it('can fail fetching a user history detail (missing detail ID)', async () => {
                expect.assertions(1);
                await expect(
                    ue.getUserHistoryDetail('1682aa2a-8165-bca3-3033-1176848a90b2', { include: 'page' })
                ).rejects.toEqual(new Error('The `include` parameter must be an array.'));
            });
        });
        describe('logging events', () => {
            it('can log a page view (missing data)', async () => {
                expect.assertions(1);
                await expect(ue.logPageView('foo/bar')).resolves.toBeInstanceOf(global.Response);
            });
            it('can log a page view (missing data)', async () => {
                expect.assertions(1);
                await expect(ue.logPageView('foo/bar', { hello: 123 })).resolves.toBeInstanceOf(global.Response);
            });
            it('can log a search', async () => {
                expect.assertions(1);
                await expect(ue.logSearch('admin', {})).resolves.toBeInstanceOf(global.Response);
            });
            it('can log a web widget impression', async () => {
                expect.assertions(1);
                await expect(ue.logWebWidgetImpression()).resolves.toBeInstanceOf(global.Response);
            });
        });
    });
    describe('errors', () => {
        const mockFailed = new Error('event API error');
        let events = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            events = new Events();
        });
        afterEach(() => {
            fetch.resetMocks();
            events = null;
        });
        it('can fail getting site drafts history logs', async () => {
            expect.assertions(1);
            await expect(events.getSiteDraftsHistoryLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site drafts history log url', async () => {
            expect.assertions(1);
            await expect(events.getSiteDraftsHistoryLogUrl(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting site drafts history', async () => {
            expect.assertions(1);
            await expect(events.getSiteDraftsHistory()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site drafts history detail', async () => {
            expect.assertions(1);
            await expect(events.getSiteDraftsHistoryDetail('detailID')).rejects.toEqual(mockFailed);
        });
        it('can fail getting site draft history summary', async () => {
            expect.assertions(1);
            await expect(events.getDraftHistory()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site draft history detail', async () => {
            expect.assertions(1);
            await expect(events.getDraftHistoryDetail(123, '123')).rejects.toEqual(mockFailed);
        });
        it('can fail getting learning path history', async () => {
            expect.assertions(1);
            await expect(events.getLearningPathHistory('pathID')).rejects.toEqual(mockFailed);
        });
        it('can fail getting site history logs', async () => {
            expect.assertions(1);
            await expect(events.getSiteHistoryLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site history log url', async () => {
            expect.assertions(1);
            await expect(events.getSiteHistoryLogUrl(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting site history summary', async () => {
            expect.assertions(1);
            await expect(events.getSiteHistory()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site history detail', async () => {
            expect.assertions(1);
            await expect(events.getSiteHistoryDetail('detailID')).rejects.toEqual(mockFailed);
        });
        it('can fail getting log page view', async () => {
            expect.assertions(1);
            await expect(events.logPageView()).rejects.toEqual(mockFailed);
        });
        it('can fail getting page history', async () => {
            expect.assertions(1);
            await expect(events.getPageHistory(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting page history detail', async () => {
            expect.assertions(1);
            await expect(events.getPageHistoryDetail(123, 'test')).rejects.toEqual(mockFailed);
        });
        it('can fail getting log search', async () => {
            expect.assertions(1);
            await expect(events.logSearch()).rejects.toEqual(mockFailed);
        });
        it('can fail getting user activity logs', async () => {
            expect.assertions(1);
            await expect(events.getUserActivityLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail getting user activity log url', async () => {
            expect.assertions(1);
            await expect(events.getUserActivityLogUrl(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting user activity summary', async () => {
            expect.assertions(1);
            await expect(events.getUserActivity(123)).rejects.toEqual(mockFailed);
        });
        it('can fail if the API returns an error while getting User History', async () => {
            expect.assertions(1);
            await expect(events.getUserHistory()).rejects.toBeDefined();
        });
        it('can fail getting user history detail', async () => {
            expect.assertions(1);
            await expect(events.getUserHistoryDetail(123)).rejects.toEqual(mockFailed);
        });
        it('can fail logging a web widget impression', async () => {
            expect.assertions(1);
            await expect(events.logWebWidgetImpression()).rejects.toEqual(mockFailed);
        });
    });
});
