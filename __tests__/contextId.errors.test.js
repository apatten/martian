/* eslint-env jasmine, jest */

jest.unmock('../contextId.js');
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

import { ContextIdManager, ContextDefinition, ContextMap } from '../contextId.js';

describe('Context ID', () => {
    describe('Manager', () => {
        let cm = null;
        beforeEach(() => {
            cm = new ContextIdManager();
        });
        afterEach(() => {
            cm = null;
        });
        it('can fail fetching all context maps', async () => {
            expect.assertions(1);
            return await expect(cm.getMaps()).rejects.toEqual(undefined);
        });
        it('can fail fetching the list of all context definitions', async () => {
            expect.assertions(1);
            return await expect(cm.getDefinitions()).rejects.toEqual(undefined);
        });
        it('can fail adding a context ID definition', async () => {
            expect.assertions(1);
            return await expect(cm.addDefinition(123)).rejects.toBeDefined();
        });
    });
    describe('definition instance functions', () => {
        let def = null;
        beforeEach(() => {
            def = new ContextDefinition('foo');
        });
        it('can fail getting the definition info', async () => {
            expect.assertions(1);
            return await expect(def.getInfo()).rejects.toEqual(undefined);
        });
        it('can fail updating the description of a definintion', async () => {
            expect.assertions(1);
            return await expect(def.updateDescription()).rejects.toEqual(undefined);
        });
        it('can fail deleting a definition', async () => {
            expect.assertions(1);
            return await expect(def.delete()).rejects.toEqual(undefined);
        });
    });
    describe('ContextMap instance functions', () => {
        let map = null;
        beforeEach(() => {
            map = new ContextMap('en-us', 'foo');
        });
        it('can fail getting the info of a map', async () => {
            expect.assertions(1);
            return await expect(map.getInfo()).rejects.toEqual(undefined);
        });
        it('can fail updating an existing map', async () => {
            expect.assertions(1);
            return await expect(map.update(123)).rejects.toEqual(undefined);
        });
        it('can failing clearing a mapping', async () => {
            expect.assertions(1);
            return await expect(map.remove()).rejects.toEqual(undefined);
        });
    });
});
