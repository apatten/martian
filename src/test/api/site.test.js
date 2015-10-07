import Site from 'api/site';
describe('Site API', () => {
    describe('operations', () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can fetch a translated string', (done) => {
            let locUri = '/@api/deki/site/localization/Test.Resource.key?';
            jasmine.Ajax.stubRequest(new RegExp(locUri), null, 'GET').andReturn({ status: 200, responseText: 'Translated string' });
            Site.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' }).then((r) => {
                expect(r).toBe('Translated string');
                done();
            });
        });
    });
});
