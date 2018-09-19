import fetch from 'jest-fetch-mock';
import { Site } from '../site.js';
global.fetch = fetch;

describe('Site API', () => {
    describe('construction', () => {
        it('can attempt to construct a Site object', () => {
            expect.assertions(1);
            const site1 = new Site();
            expect(site1).toBeDefined();
        });
    });
    describe('operations', () => {
        const emptySearchResult = { pages: [], results: [] };
        const emptyTagsResult = { tags: [] };
        const emptySetTagsResult = { skippedArticleChangePageIds: [], skippedKcsChangePageIds: [], skippedPageIds: [] };
        let site = null;
        beforeEach(() => {
            fetch.once('{}');
            site = new Site();
        });
        afterEach(() => {
            fetch.resetMocks();
            site = null;
        });
        it('can fetch a translated string', async () => {
            expect.assertions(1);
            await expect(site.getResourceString({ key: 'Test.Resource.key' })).resolves.toEqual('{}');
        });
        it('can fetch a translated string with language supplied', async () => {
            expect.assertions(1);
            await expect(site.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' })).resolves.toEqual('{}');
        });
        it('can fetch a batch of resource strings (min params)', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings({ keys: [] })).resolves.toEqual({ localizations: [] });
        });
        it('can fetch a batch of resource strings (all params)', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings({ keys: ['foo.bar.baz'], lang: 'en-us' })).resolves.toEqual({
                localizations: []
            });
        });
        it('can fail if no resource key is supplied', async () => {
            expect.assertions(1);
            await expect(site.getResourceString()).rejects.toEqual('No resource key was supplied');
        });
        it('can fail batch fetching (no parameters)', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings()).rejects.toEqual(
                new Error('The keys parameter must be supplied, and it must be an array.')
            );
        });
        it('can fail batch fetching (invalid keys)', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings({ keys: '' })).rejects.toEqual(
                new Error('The keys parameter must be supplied, and it must be an array.')
            );
        });
        it('can fail batch fetching (invalid lang)', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings({ keys: [], lang: true })).rejects.toEqual(
                new Error('The lang parameter must be a string')
            );
        });
        it('can perform a default search', async () => {
            expect.assertions(1);
            await expect(site.search()).resolves.toEqual(emptySearchResult);
        });
        it('can perform a search with some parameters', async () => {
            expect.assertions(1);
            await expect(site.search({ tags: ['abc', '123'], type: ['wiki', 'image'] })).resolves.toEqual(
                emptySearchResult
            );
        });
        it('can perform a search with some other parameters', async () => {
            expect.assertions(1);
            await expect(site.search({ path: 'foo/bar', q: 'search thing' })).resolves.toEqual(emptySearchResult);
        });
        it('can perform a search with a namespace param', async () => {
            expect.assertions(1);
            await expect(site.search({ q: 'search term', namespaces: 'template' })).resolves.toEqual(emptySearchResult);
        });
        it('can perform a search with all parameters', async () => {
            expect.assertions(1);
            await expect(
                site.search({
                    path: '/foo/bar',
                    tags: 'abc',
                    type: 'wiki',
                    offset: 123,
                    limit: 10,
                    q: 'search term',
                    namespaces: ['main', 'template'],
                    sessionid: 'foo'
                })
            ).resolves.toEqual(emptySearchResult);
        });
        it('can search the site index with defaults', async () => {
            expect.assertions(1);
            await expect(site.searchIndex()).resolves.toEqual(emptySearchResult);
        });
        it('can search the site index with all parameters sent', async () => {
            expect.assertions(1);
            await expect(
                site.searchIndex({
                    q: 'search query',
                    limit: 'all',
                    offset: 10,
                    sortBy: 'date',
                    verbose: false,
                    constraints: {
                        page: 'Category_1',
                        tags: ['foo', 'bar'],
                        type: 'wiki',
                        namespaces: ['main']
                    }
                })
            ).resolves.toEqual(emptySearchResult);
        });
        it('can search the site index with a constraint string passed', async () => {
            expect.assertions(1);
            await expect(
                site.searchIndex({
                    q: 'Foo',
                    constraints: { type: 'wiki' },
                    constraintString: 'language:en-us AND type:wiki'
                })
            ).resolves.toEqual(emptySearchResult);
        });
        it('can fail if an invalid `limit` parameter is passed in', async () => {
            expect.assertions(1);
            await expect(site.searchIndex({ limit: 'foo' })).rejects.toEqual(
                new Error('The limit for index searching must be a number or "all"')
            );
        });
        it('can get search analytics with defaults', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalytics({})).resolves.toEqual({});
        });
        it('can get search analytics with params', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalytics({ start: '20170817000000' })).resolves.toEqual({});
        });
        it('can get search analytics query with defaults', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalyticsQuery({ query: 'foobar' })).resolves.toEqual({});
        });
        it('can get search analytics with params', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalyticsQuery({ query: 'foobar', start: '20170817000000' })).resolves.toEqual(
                {}
            );
        });
        it('can fetch all site tags', async () => {
            expect.assertions(1);
            await expect(site.getTags()).resolves.toEqual(emptyTagsResult);
        });
        it('can update batch site tags (add only)', async () => {
            expect.assertions(1);
            await expect(site.setTags({ add: [{ name: 'foo', pageids: [123, 456] }] })).resolves.toEqual(
                emptySetTagsResult
            );
        });
        it('can update batch site tags (remove only)', async () => {
            expect.assertions(1);
            await expect(site.setTags({ remove: [{ name: 'foo', pageids: [123, 456] }] })).resolves.toEqual(
                emptySetTagsResult
            );
        });
        it('can update batch site tags (add and remove)', async () => {
            expect.assertions(1);
            await expect(
                site.setTags({
                    add: [{ name: 'foo', pageids: [123, 456] }],
                    remove: [{ name: 'foo', pageids: [123, 456] }]
                })
            ).resolves.toEqual(emptySetTagsResult);
        });
        it('can update batch site tags (empty request)', async () => {
            expect.assertions(1);
            await expect(site.setTags()).resolves.toEqual(emptySetTagsResult);
        });
        it('get available site activity log list', async () => {
            expect.assertions(1);
            await expect(site.getSiteActivityLogs()).resolves.toEqual({ logs: [] });
        });
        it('get available search query log list', async () => {
            expect.assertions(1);
            await expect(site.getSearchQueryLogs()).resolves.toEqual({ logs: [] });
        });
        it('can fail getting the search query log url with empty parameters', async () => {
            expect.assertions(1);
            await expect(site.getSearchQueryLogUrl()).rejects.toEqual(
                new Error('Attempting to get log url without required name')
            );
        });
        it('get site activity log url with empty parameters', async () => {
            expect.assertions(1);
            await expect(site.getSiteActivityLogUrl()).rejects.toEqual(
                new Error('Attempting to get log url without required name')
            );
        });
        it('get search query log url', async () => {
            expect.assertions(1);
            await expect(site.getSearchQueryLogUrl('searchqueries-2016-10-000')).resolves.toEqual({});
        });
        it('get site activity log url', async () => {
            expect.assertions(1);
            await expect(site.getSiteActivityLogUrl('searchqueries-2016-10-000')).resolves.toEqual({});
        });
        it('can fetch site activity', async () => {
            expect.assertions(1);
            await expect(site.getActivity()).resolves.toEqual({ entries: [] });
        });
        it('can fetch site activity with supplied since date', async () => {
            expect.assertions(1);
            await expect(site.getActivity(new Date('Wed, 07 Dec 2016 00:00:00'))).resolves.toEqual({ entries: [] });
        });
        it('can fail if an invalid since date is supplied', async () => {
            expect.assertions(1);
            await expect(site.getActivity('')).rejects.toEqual(
                new Error('The `since` parameter must be of type Date.')
            );
        });
        it('can get the site roles', async () => {
            expect.assertions(1);
            await expect(site.getRoles()).resolves.toEqual({ permissions: [] });
        });
        it('can send feedback (comment only)', async () => {
            expect.assertions(1);
            await expect(site.sendFeedback({ comment: 'This site is awesome' })).resolves.toBeInstanceOf(
                global.Response
            );
        });
        it('can send feedback (all params)', async () => {
            expect.assertions(1);
            await expect(
                site.sendFeedback({
                    comment: 'foo',
                    title: 'bar',
                    metadata: { dog: 'cat', asparagus: 'broccoli' }
                })
            ).resolves.toBeInstanceOf(global.Response);
        });
        it('can send feedback with non-string metadata values', async () => {
            expect.assertions(1);
            await expect(
                site.sendFeedback({
                    comment: 'foo',
                    title: 'bar',
                    metadata: { dog: 'cat', asparagus: 'broccoli', bool: true, num: 1234 }
                })
            ).resolves.toBeInstanceOf(global.Response);
        });
        it('send feedback failure (no comment)', async () => {
            expect.assertions(1);
            await expect(site.sendFeedback()).rejects.toEqual(
                new Error('The `comment` parameter must be supplied, and must be a string.')
            );
        });
        it('send feedback failure (invalid title)', async () => {
            expect.assertions(1);
            await expect(site.sendFeedback({ comment: 'foo', title: 1234 })).rejects.toEqual(
                new Error('The title parameter must be a string.')
            );
        });
        it('send feedback failure (invalid metadata)', async () => {
            expect.assertions(1);
            await expect(site.sendFeedback({ comment: 'foo', metadata: 'dog' })).rejects.toEqual(
                new Error('The `metadata` parameter must be an object.')
            );
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('site API failure');
        let site = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            site = new Site();
        });
        afterEach(() => {
            fetch.resetMocks();
            site = null;
        });
        it('can fail getting site activity logs', async () => {
            expect.assertions(1);
            await expect(site.getSiteActivityLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail getting search query logs', async () => {
            expect.assertions(1);
            await expect(site.getSearchQueryLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail getting single resource string', async () => {
            expect.assertions(1);
            await expect(site.getResourceString({ key: 'Test.Resource.key' })).rejects.toEqual(mockFailed);
        });
        it('can fail getting multiple resource strings', async () => {
            expect.assertions(1);
            await expect(site.getResourceStrings({ keys: ['foo.bar.baz'], lang: 'en-us' })).rejects.toEqual(mockFailed);
        });
        it('can fail getting search query log url', async () => {
            expect.assertions(1);
            await expect(site.getSearchQueryLogUrl('searchqueries-2016-10-000')).rejects.toEqual(mockFailed);
        });
        it('can fail getting site activity log url', async () => {
            expect.assertions(1);
            await expect(site.getSiteActivityLogUrl('searchqueries-2016-10-000')).rejects.toEqual(mockFailed);
        });
        it('can fail getting page tags', async () => {
            expect.assertions(1);
            await expect(site.getTags()).rejects.toEqual(mockFailed);
        });
        it('can fail setting page tags', async () => {
            expect.assertions(1);
            await expect(site.setTags()).rejects.toEqual(mockFailed);
        });
        it('can fail searching across the site', async () => {
            expect.assertions(1);
            await expect(site.search()).rejects.toEqual(mockFailed);
        });
        it('can fail searching site index across the site', async () => {
            expect.assertions(1);
            await expect(site.searchIndex()).rejects.toEqual(mockFailed);
        });
        it('can fail getting search analytics across the site', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalytics(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting search analytics for a given period for a given query', async () => {
            expect.assertions(1);
            await expect(site.getSearchAnalyticsQuery(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting site activity stats for a given site', async () => {
            expect.assertions(1);
            await expect(site.getActivity()).rejects.toEqual(mockFailed);
        });
        it('can fail getting site roles', async () => {
            expect.assertions(1);
            await expect(site.getRoles()).rejects.toEqual(mockFailed);
        });
        it('can fail sending feedback to the site owner', async () => {
            expect.assertions(1);
            await expect(site.sendFeedback({ comment: 'commentString' })).rejects.toEqual(mockFailed);
        });
    });
});
