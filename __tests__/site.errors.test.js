/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
jest.unmock('../site.js');
import { Site } from '../site.js';

describe('Page Subscriptions', () => {
    let site = null;
    beforeEach(() => {
        site = new Site();
    });
    it('can fail getting site activity logs', async () => {
        expect.assertions(1);
        return await expect(site.getSiteActivityLogs()).rejects.toEqual(undefined);
    });
    it('can fail getting search query logs', async () => {
        expect.assertions(1);
        return await expect(site.getSearchQueryLogs()).rejects.toEqual(undefined);
    });
    it('can fail getting single resource string', async () => {
        expect.assertions(1);
        return await expect(site.getResourceString({ key: 'Test.Resource.key' })).rejects.toEqual(undefined);
    });
    it('can fail getting multiple resource strings', async () => {
        expect.assertions(1);
        return await expect(site.getResourceStrings({ keys: ['foo.bar.baz'], lang: 'en-us' })).rejects.toEqual(
            undefined
        );
    });
    it('can fail getting search query log url', async () => {
        expect.assertions(1);
        return await expect(site.getSearchQueryLogUrl('searchqueries-2016-10-000')).rejects.toEqual(undefined);
    });
    it('can fail getting site activity log url', async () => {
        expect.assertions(1);
        return await expect(site.getSiteActivityLogUrl('searchqueries-2016-10-000')).rejects.toEqual(undefined);
    });
    it('can fail getting page tags', async () => {
        expect.assertions(1);
        return await expect(site.getTags()).rejects.toEqual(undefined);
    });
    it('can fail setting page tags', async () => {
        expect.assertions(1);
        return await expect(site.setTags()).rejects.toEqual(undefined);
    });
    it('can fail searching across the site', async () => {
        expect.assertions(1);
        return await expect(site.search()).rejects.toEqual(undefined);
    });
    it('can fail searching site index across the site', async () => {
        expect.assertions(1);
        return await expect(site.searchIndex()).rejects.toEqual(undefined);
    });
    it('can fail getting search analytics across the site', async () => {
        expect.assertions(1);
        return await expect(site.getSearchAnalytics(123)).rejects.toEqual(undefined);
    });
    it('can fail getting search analytics for a given period for a given query', async () => {
        expect.assertions(1);
        return await expect(site.getSearchAnalyticsQuery(123)).rejects.toEqual(undefined);
    });
    it('can fail getting site activity stats for a given site', async () => {
        expect.assertions(1);
        return await expect(site.getActivity()).rejects.toEqual(undefined);
    });
    it('can fail getting site roles', async () => {
        expect.assertions(1);
        return await expect(site.getRoles()).rejects.toEqual(undefined);
    });
    it('can fail sending feedback to the site owner', async () => {
        expect.assertions(1);
        return await expect(site.sendFeedback({ comment: 'commentString' })).rejects.toEqual(undefined);
    });
});
