/* eslint-env jasmine, jest */
const Response = require.requireActual('../__mocks__/response.js');
const Plug = require.requireActual('../__mocks__/plug.js').Plug;

jest.unmock('../page.js');
jest.unmock('../pageBase.js');
jest.unmock('../contextId.js');
import { Page } from '../page.js';
import { ContextIdManager } from '../contextId.js';

describe('Special page Tests', () => {
    beforeEach(() => {
        Response.prototype.json = jest.fn(() => Promise.resolve({}));
        Response.prototype.text = jest.fn(() => Promise.resolve(''));
    });
    it('can fail on overview fetching', () => {
        Response.prototype.json = jest.fn(() => Promise.reject());
        let p = new Page();
        return p.getOverview().then((r) => {
            expect(r).not.toBeDefined();
        }).catch(() => {});
    });
    it('can fetch a virtual page', () => {
        Plug.prototype.get = jest.fn(() => {
            return Promise.reject({
                message: 'Not found',
                status: 404,
                responseText: '{"@virtual":"true"}'
            });
        });
        let p = new Page(123);
        return p.getFullInfo();
    });
    it('can get through virtual page checking when there is another failure', () => {
        Plug.prototype.get = jest.fn(() => {
            return Promise.reject({
                message: 'Not found',
                status: 404,
                responseText: ''
            });
        });
        let page = new Page(123);
        return page.getFullInfo().then((r) => {
            expect(r).not.toBeDefined();
        }).catch(() => {});
    });
    pit('can get the ID path in the tree', () => {
        Response.prototype.text = jest.fn(() => Promise.resolve('123,456'));
        let page = new Page(123);
        return page.getTreeIds();
    });
    it('can get the ID path in the tree (invalid data)', () => {
        Response.prototype.text = jest.fn(() => Promise.resolve('123,abc'));
        let page = new Page(123);
        return page.getTreeIds().catch(() => {});
    });
    pit('can fetch the list of all context definitions (invalid response)', () => {
        Response.prototype.json = jest.fn(() => Promise.resolve([]));
        const cm = new ContextIdManager();
        return cm.getDefinitions();
    });
});
