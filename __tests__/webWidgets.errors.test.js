/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    delete: () => Promise.reject(),
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
const WebWidgetsManager = require.requireActual('../webWidgets.js').WebWidgetsManager;

describe('WebWidgets', () => {
    describe('api error handling', () => {
        let wwm = null;
        beforeEach(() => {
            wwm = new WebWidgetsManager();
        });
        afterEach(() => {
            wwm = null;
        });
        it('can fail getting active widgets', () => {
            const success = jest.fn();
            return wwm.getActiveWidgets().catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail getting inactive widgets', () => {
            const success = jest.fn();
            return wwm.getInactiveWidgets().catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail getting an individual widget', () => {
            const success = jest.fn();
            return wwm.getWidget(1).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail creating a widget', () => {
            const success = jest.fn();
            return wwm.createWidget({ arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' }).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail deleting a widget', () => {
            const success = jest.fn();
            return wwm.deleteWidget(1).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail updating a widget', () => {
            const success = jest.fn();
            return wwm.updateWidget(1, { arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' }).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail activating a widget', () => {
            const success = jest.fn();
            return wwm.activateWidget(1).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
        it('can fail deactivating a widget', () => {
            const success = jest.fn();
            return wwm.deactivateWidget(1).catch(success).then(() => {
                expect(success).toHaveBeenCalled();
            });
        });
    });
});
