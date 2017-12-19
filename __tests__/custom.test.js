/* eslint-env jasmine, jest */
jest.unmock('/mindtouch-http.js/plug.js');
jest.mock('/mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/plug.js'));
jest.unmock('/mindtouch-http.js/progressPlug.js');
jest.mock('/mindtouch-http.js/progressPlug.js', () => require.requireActual('../__mocks__/progressPlug.js'));

jest.unmock('../page.js');
jest.unmock('../pageBase.js');
jest.unmock('../lib/modelParser.js');
jest.unmock('../contextId.js');
jest.unmock('../file.js');
jest.unmock('../group.js');
jest.unmock('../user.js');

describe('Special page Tests', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    it('can get the ID path in the tree', () => {
        const Response = require.requireActual('../__mocks__/response.js');
        Response.prototype.text = jest.fn(() => Promise.resolve('123,456'));
        const Page = require('../page.js').Page;
        const page = new Page(123);
        return page.getTreeIds();
    });
    it('can get the ID path in the tree (invalid data)', () => {
        const Response = require.requireActual('../__mocks__/response.js');
        Response.prototype.text = jest.fn(() => Promise.resolve('123,abc'));
        const Page = require('../page.js').Page;
        const page = new Page(123);
        return page.getTreeIds().catch(() => {});
    });
    it('can fetch the list of all context definitions (no response)', () => {
        const Response = require.requireActual('../__mocks__/response.js');
        Response.prototype.json = jest.fn(() => Promise.resolve(''));
        const ContextIdManager = require.requireActual('../contextId.js').ContextIdManager;
        const cm = new ContextIdManager();
        return cm.getDefinitions();
    });
    it('can handle a rejection properly for ContextIdManager.prototype.addDefinition', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                post() {
                    return Promise.reject({ message: 'Bad Request', status: 400, responseText: '{}' });
                }
            })
        );
        const ContextIdManager = require.requireActual('../contextId.js').ContextIdManager;
        const cm = new ContextIdManager();
        const success = jest.fn();
        return cm
            .addDefinition('foo')
            .then(() => {
                success();
                throw new Error('Promise was resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can fetch a virtual page', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                get() {
                    return Promise.reject({ message: 'Not found', status: 404, responseText: '{"@virtual":"true"}' });
                }
            })
        );
        const Page = require('../page.js').Page;
        let p = new Page(123);
        return p.getFullInfo().then((r) => expect(r.virtual).toBe(true));
    });
    it('can get through virtual page checking when there is another failure', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                get() {
                    return Promise.reject({
                        message: 'Not found',
                        status: 404,
                        responseText: '{"notavirtualpage":true}'
                    });
                }
            })
        );
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .getFullInfo()
            .then(() => {
                success();
                throw new Error();
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can get through virtual page checking when there is another failure (no responseText)', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                get() {
                    return Promise.reject({ message: 'Not found', status: 404, responseText: '' });
                }
            })
        );
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .getFullInfo()
            .then(() => {
                success();
                throw new Error();
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can import an archive with a conflict (no progress)', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                put() {
                    return Promise.reject({ message: 'Conflict', status: 409, responseText: '{}' });
                }
            })
        );
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .importArchive({}, { name: 'test.mtarc', size: 1000 }, { foo: 'bar' })
            .then(() => {
                success();
                throw new Error();
            })
            .catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
    });
    it('can import an archive with a conflict (with progress)', () => {
        jest.mock('/mindtouch-http.js/progressPlug.js', () => {
            class ProgressPlug {
                at() {
                    return new ProgressPlug();
                }
                withHeader() {
                    return new ProgressPlug();
                }
                withParams() {
                    return new ProgressPlug();
                }
                put() {
                    return Promise.reject({
                        message: 'Conflict',
                        status: 409,
                        responseText: '{}'
                    });
                }
            }
            return { ProgressPlug };
        });
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .importArchive({}, { name: 'test.mtarc', size: 1000, progress: () => {} }, { foo: 'bar' })
            .then(() => {
                success();
                throw new Error();
            })
            .catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
    });
    it('can handle a rejection properly for Page.prototype.copy', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                post() {
                    return Promise.reject({ message: 'Conflict', status: 409, responseText: '{}' });
                }
            })
        );
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .copy({ to: 'foo/bar' })
            .then(() => {
                success();
                throw new Error();
            })
            .catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
    });
    it('can handle a rejection properly for Page.prototype.move', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                post() {
                    return Promise.reject({ message: 'Conflict', status: 409, responseText: '{}' });
                }
            })
        );
        const Page = require('../page.js').Page;
        const page = new Page(123);
        const success = jest.fn();
        return page
            .move()
            .then(() => {
                success();
                throw new Error();
            })
            .catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
    });
    it('can handle a rejection properly for File.prototype.move', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                post() {
                    return Promise.reject({ message: 'Conflict', status: 409, responseText: '{}' });
                }
            })
        );
        const File = require('../file.js').File;
        const file = new File(123);
        const success = jest.fn();
        return file
            .move({ to: 'foo/bar', name: 'image.png' })
            .then(() => {
                success();
                throw new Error();
            })
            .catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
    });
    it('can handle a rejection properly for PageManager.prototype.findPages', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                get() {
                    return Promise.reject({
                        message: 'Bad Request',
                        status: 400,
                        responseText:
                            '{"exception":"MindTouch.Deki.Exceptions.FindPagesMissingConstraintsException","message":"Must specify at least one constraint","resource":"System.API.Error.finding-pages-missing-constraints"}'
                    });
                }
            })
        );
        const PageManager = require('../page.js').PageManager;
        const pm = new PageManager();
        const success = jest.fn();
        return pm
            .findPages({ tags: [ 'foo' ] })
            .then(() => {
                success();
                throw new Error('Promise was resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can handle a rejection properly for Group.prototype.removeUser', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                delete() {
                    return Promise.reject({ message: 'Not Found', status: 404, responseText: '{}' });
                }
            })
        );
        const Group = require('../group.js').Group;
        const g = new Group(5);
        const success = jest.fn();
        return g
            .removeUser(123)
            .then(() => {
                success();
                throw new Error('Promise was resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
});
