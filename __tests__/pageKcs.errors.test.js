/* eslint-env jasmine, jest */
jest.unmock('../pageKcs.js');
import { PageKcs } from '../pageKcs.js';

/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

describe('PageKcs', () => {
    let kcs;
    beforeEach(() => {
        kcs = new PageKcs(150);
    });
    afterEach(() => {
        kcs = null;
    });
    it('can fail getting kcs state', () => {
        const success = jest.fn();
        return kcs
            .getState()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
    it('can fail setting a kcs state', () => {
        const success = jest.fn();
        return kcs
            .setState()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
    it('can fail getting kcs valid transitions', () => {
        const success = jest.fn();
        return kcs
            .getValidTransitions()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
    it('can fail initializing a kcs state', () => {
        const success = jest.fn();
        return kcs
            .initialize()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
    it('can fail setting a kcs flag state', () => {
        const success = jest.fn();
        return kcs
            .setFlag()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
});
