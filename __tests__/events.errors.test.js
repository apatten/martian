/* eslint-env jasmine, jest */
jest.unmock('../events.js');
import { Events } from '../events.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('Events', () => {
    let events = null;
    beforeEach(() => {
        events = new Events();
    });
    it('can fail getting site drafts history logs', async () => {
        expect.assertions(1);
        return await expect(events.getSiteDraftsHistoryLogs()).rejects.toEqual(mockFailed);
    });
    it('can fail getting site drafts history log url', async () => {
        expect.assertions(1);
        return await expect(events.getSiteDraftsHistoryLogUrl(123)).rejects.toEqual(mockFailed);
    });
    it('can fail getting site drafts history', async () => {
        expect.assertions(1);
        return await expect(events.getSiteDraftsHistory()).rejects.toEqual(mockFailed);
    });
    it('can fail getting site drafts history detail', async () => {
        expect.assertions(1);
        return await expect(events.getSiteDraftsHistoryDetail('detailID')).rejects.toEqual(mockFailed);
    });
    it('can fail getting site draft history summary', async () => {
        expect.assertions(1);
        return await expect(events.getDraftHistory()).rejects.toEqual(mockFailed);
    });
    it('can fail getting site draft history detail', async () => {
        expect.assertions(1);
        return await expect(events.getDraftHistoryDetail(123, '123')).rejects.toEqual(mockFailed);
    });
    it('can fail getting learning path history', async () => {
        expect.assertions(1);
        return await expect(events.getLearningPathHistory('pathID')).rejects.toEqual(mockFailed);
    });
    it('can fail getting site history logs', async () => {
        expect.assertions(1);
        return await expect(events.getSiteHistoryLogs()).rejects.toEqual(mockFailed);
    });
    it('can fail getting site history log url', async () => {
        expect.assertions(1);
        return await expect(events.getSiteHistoryLogUrl(123)).rejects.toEqual(mockFailed);
    });
    it('can fail getting site history summary', async () => {
        expect.assertions(1);
        return await expect(events.getSiteHistory()).rejects.toEqual(mockFailed);
    });
    it('can fail getting site history detail', async () => {
        expect.assertions(1);
        return await expect(events.getSiteHistoryDetail('detailID')).rejects.toEqual(mockFailed);
    });
    it('can fail getting log page view', async () => {
        expect.assertions(1);
        return await expect(events.logPageView()).rejects.toEqual(mockFailed);
    });
    it('can fail getting page history', async () => {
        expect.assertions(1);
        return await expect(events.getPageHistory(123)).rejects.toEqual(mockFailed);
    });
    it('can fail getting page history detail', async () => {
        expect.assertions(1);
        return await expect(events.getPageHistoryDetail(123, 'test')).rejects.toEqual(mockFailed);
    });
    it('can fail getting log search', async () => {
        expect.assertions(1);
        return await expect(events.logSearch()).rejects.toEqual(mockFailed);
    });
    it('can fail getting user activity logs', async () => {
        expect.assertions(1);
        return await expect(events.getUserActivityLogs()).rejects.toEqual(mockFailed);
    });
    it('can fail getting user activity log url', async () => {
        expect.assertions(1);
        return await expect(events.getUserActivityLogUrl(123)).rejects.toEqual(mockFailed);
    });
    it('can fail getting user activity summary', async () => {
        expect.assertions(1);
        return await expect(events.getUserActivity(123)).rejects.toEqual(mockFailed);
    });
    it('can fail if the API returns an error while getting User History', async () => {
        expect.assertions(1);
        return await expect(events.getUserHistory()).rejects.toBeDefined();
    });
    it('can fail getting user history detail', async () => {
        expect.assertions(1);
        return await expect(events.getUserHistoryDetail(123)).rejects.toEqual(mockFailed);
    });
    it('can fail logging a web widget impression', async () => {
        expect.assertions(1);
        return await expect(events.logWebWidgetImpression()).rejects.toEqual(mockFailed);
    });
});
