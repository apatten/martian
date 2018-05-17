/* eslint-env jasmine, jest */
jest.unmock('../pageBase.js');
jest.unmock('../draft.js');
import { DraftManager, Draft } from '../draft.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);
jest.unmock('../pageBase.js');

describe('Plug Error handling for the draft.js Draft Manager module', () => {
    let dm = null;
    beforeEach(() => {
        dm = new DraftManager();
    });
    it('can fail to create draft when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(dm.createDraft()).rejects.toBeDefined();
    });
    it('can fail to get drafts when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(dm.getDrafts()).rejects.toEqual(mockFailed);
    });
});

describe('Plug Error handling for the draft.js Draft module', () => {
    let draft = null;
    beforeEach(() => {
        draft = new Draft();
    });
    it('can fail to deactivate draft when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(draft.deactivate()).rejects.toEqual(mockFailed);
    });
    it('can fail to publish drafts when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(draft.publish()).rejects.toEqual(mockFailed);
    });
    it('can fail to unpublish drafts when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(draft.unpublish()).rejects.toEqual(mockFailed);
    });
    it('can fail to set draft title when an HTTP error is returned', async () => {
        expect.assertions(1);
        return await expect(draft.setTitle(123)).rejects.toEqual(mockFailed);
    });
});
