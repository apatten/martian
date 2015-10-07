import File from 'api/file';
describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            let file = new File(123);
            expect(file).toBeDefined();
        });
    });
    describe('operations', () => {
        let file = null;
        beforeEach(() => {
            jasmine.Ajax.install();
            file = new File(123);
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
            file = null;
        });
        it('can fetch file info', (done) => {
            let infoUri = '/@api/deki/files/123/info?';
            jasmine.Ajax.stubRequest(new RegExp(infoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.file });
            file.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch file revisions', (done) => {
            let revisionsUri = '/@api/deki/files/123/revisions?';
            jasmine.Ajax.stubRequest(new RegExp(revisionsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.fileRevisions });
            file.getRevisions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can set the file description', (done) => {
            let descUri = '/@api/deki/files/123/description?';
            jasmine.Ajax.stubRequest(new RegExp(descUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.file });
            file.setDescription('This is the description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
