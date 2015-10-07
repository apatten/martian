import PageHierarchy from 'api/pageHierarchy';
describe('Page Hierarchy', () => {
    let ph;
    let rootUri = '/@api/deki/pages/123?';
    let subpagesUri = '/@api/deki/pages/123/subpages?';
    beforeEach(() => {
        ph = new PageHierarchy();
        jasmine.Ajax.install();
    });
    afterEach(() => {
        ph = null;
        jasmine.Ajax.uninstall();
    });
    it('can create a new page hierarchy object', () => {
        expect(ph).toBeDefined();
    });
    it('can fetch the home page info', (done) => {
        jasmine.Ajax.stubRequest(new RegExp(rootUri), null, 'GET').andReturn({
            status: 200,
            responseText: '{"@id": "123","@href": "https://www.example.com/@api/deki/pages/123?redirects=0", "path": "foo/bar", "title": "Bar"}'
        });
        ph.getRoot(123).then((r) => {
            expect(r.id).toBe(123);
            done();
        });
    });
    it('can handle a 400 response when fetching the home page info', (done) => {
        jasmine.Ajax.stubRequest(new RegExp(rootUri), null, 'GET').andReturn({ status: 400, responseText: 'bad request' });
        ph.getRoot(123).catch((e) => {
            expect(e.message).toBe('bad request');
            expect(e.errorCode).toBe(400);
            done();
        });
    });
    it('can fetch the children of a page', (done) => {
        jasmine.Ajax.stubRequest(new RegExp(subpagesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.subpages });
        ph.getChildren(123).then((r) => {
            expect(r.length).toBe(1);
            done();
        });
    });
    it('can fetch both the root info and subpages', (done) => {
        jasmine.Ajax.stubRequest(new RegExp(rootUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.page });
        jasmine.Ajax.stubRequest(new RegExp(subpagesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.subpages });
        ph.getRootAndChildren(123).then(r => {
            expect(Array.isArray(r)).toBe(true);
            expect(r[0].subpages).toBe(true);
            done();
        });
    });
});
