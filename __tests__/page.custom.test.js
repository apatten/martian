/* eslint-env jasmine, jest */
jest.unmock('../page');
jest.unmock('../pageBase');
jest.unmock('../contextId');
jest.unmock('../lib/modelParser');
import { Plug } from 'mindtouch-http';
import { Page } from '../page';
import { ContextIdManager } from '../contextId';
describe('Special page Tests', () => {
    pit('can get the page overview', () => {
        Plug.prototype.getJson = jest.fn(() => {
            return Promise.resolve('This is the overview');
        });
        let p = new Page();
        return p.getOverview();
    });
    pit('can fail on overview fetching', () => {
        Plug.prototype.getJson = jest.fn(() => {
            return Promise.reject('This is not json');
        });
        let p = new Page();
        return p.getOverview().catch(() => {});
    });
    pit('can fetch a virtual page', () => {
        Plug.prototype.get = jest.fn(() => {
            return Promise.reject({
                message: 'Not found',
                status: 404,
                responseText: '{"@virtual":true}',
                responseJson: { '@virtual': true }
            });
        });
        let p = new Page(123);
        return p.getFullInfo();
    });
    pit('can get through virtual page checking when there is another failure', () => {
        Plug.prototype.get = jest.fn(() => {
            return Promise.reject({
                message: 'Not found',
                status: 404,
                responseText: ''
            });
        });
        let page = new Page(123);
        return page.getFullInfo().catch(() => {});
    });
    pit('can get the ID path in the tree', () => {
        Plug.prototype.getText = jest.fn(() => {
            return Promise.resolve('123,456');
        });
        let page = new Page(123);
        return page.getTreeIds();
    });
    it('can get the ID path in the tree (invalid data)', () => {
        Plug.prototype.getText = jest.fn(() => {
            return Promise.resolve('123,abc');
        });
        let page = new Page(123);
        return page.getTreeIds().catch(() => {});
    });
    pit('can fetch the list of all context definitions', () => {
        Plug.prototype.getJson = jest.fn(() => {
            return Promise.resolve({ context: [ 'abc', 'def' ] });
        });
        const cm = new ContextIdManager();
        return cm.getDefinitions();
    });
    pit('can fetch the list of all context definitions (empty response)', () => {
        Plug.prototype.getJson = jest.fn(() => {
            return Promise.resolve({});
        });
        const cm = new ContextIdManager();
        return cm.getDefinitions();
    });
    pit('can fetch the list of all context definitions (invalid response)', () => {
        Plug.prototype.getJson = jest.fn(() => {
            return Promise.resolve([]);
        });
        const cm = new ContextIdManager();
        return cm.getDefinitions();
    });
});
