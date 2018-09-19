import fetch from 'jest-fetch-mock';
import mock from 'xhr-mock';
import { Page, PageManager } from '../page.js';
global.fetch = fetch;
const xhrMock = mock;

describe('Page API', () => {
    const emptyPageResponse = { tags: [] };
    const emptyPageListResponse = { pages: [] };
    describe('Page', () => {
        describe('constructor tests', () => {
            it('can construct a new Page object using page ID', () => {
                expect.assertions(1);
                const page = new Page(123);
                expect(page).toBeDefined();
            });
            it('can construct a new Page object using page path', () => {
                expect.assertions(1);
                const page = new Page('foo/bar');
                expect(page).toBeDefined();
            });
            it("can construct a new Page object using 'home'", () => {
                expect.assertions(1);
                const page = new Page('home');
                expect(page).toBeDefined();
            });
            it("can construct a new Page object defaulting to 'home'", () => {
                expect.assertions(1);
                const page = new Page();
                expect(page).toBeDefined();
            });
        });
        describe('page tree', () => {
            let page = null;
            beforeEach(() => {
                fetch.once('{"page": {"subpages":{}}}');
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can get the page tree', async () => {
                expect.assertions(1);
                await expect(page.getTree()).resolves.toEqual({ properties: [], subpages: [{}] });
            });
        });
        describe('get tree IDs', () => {
            let page = null;
            beforeEach(() => {
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can get the hierarchical list of pages IDs from the current page to the home page', async () => {
                fetch.once('1,2,3,4');
                expect.assertions(1);
                await expect(page.getTreeIds()).resolves.toEqual([1, 2, 3, 4]);
            });
            it('can fail getting the hierarchy tree IDs of the current page', async () => {
                fetch.once('1,foo,3,4');
                expect.assertions(1);
                await expect(page.getTreeIds()).rejects.toEqual(new Error('Unable to parse the tree IDs.'));
            });
            it('can fail getting the hierarchy tree IDs of the current page', async () => {
                const err = new Error('get tree IDs failed');
                fetch.mockReject(err);
                expect.assertions(1);
                await expect(page.getTreeIds()).rejects.toEqual(err);
            });
        });
        describe('import archive', () => {
            let page = null;
            beforeEach(() => {
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail importing archived files on the current page', async () => {
                expect.assertions(1);
                const failResponseText = { message: 'Conflict', status: 409 };
                const failInfo = { responseText: JSON.stringify(failResponseText) };
                fetch.mockRejectOnce(failInfo);
                return await expect(
                    page.importArchive({}, { name: 'test.mtarc', size: 1000 }, { foo: 'bar' })
                ).rejects.toEqual(failResponseText);
            });
            it('can import an archive (no progress)', async () => {
                fetch.once('{}');
                expect.assertions(1);
                await expect(
                    page.importArchive({}, { name: 'test.mtarc', size: 1000 }, { foo: 'bar' })
                ).resolves.toEqual({});
            });
            it('can import an archive (empty added info)', async () => {
                fetch.once('{}');
                expect.assertions(1);
                await expect(
                    page.importArchive({ name: 'test.mtarc', size: 1000 }, {}, { foo: 'bar' })
                ).resolves.toEqual({});
            });
            it('can import an archive (no added info, no params)', async () => {
                fetch.once('{}');
                expect.assertions(1);
                await expect(page.importArchive({ name: 'test.mtarc', size: 1000 })).resolves.toEqual({});
            });
            it('can import an archive with progress', async () => {
                expect.assertions(1);
                xhrMock.setup();
                xhrMock.put(/@api\/deki\/pages\/123\/import/, (req, res) =>
                    res.status(200).body('{"uri.status":"https://example.com"}')
                );
                await expect(
                    page.importArchive('dummy', { name: 'test.mtarc', size: 1000, progress: () => {} }, { foo: 'bar' })
                ).resolves.toEqual({ statusUri: 'https://example.com' });
                xhrMock.teardown();
            });
            it('can import an archive with progress (no params)', async () => {
                expect.assertions(1);
                xhrMock.setup();
                xhrMock.put(/@api\/deki\/pages\/123\/import/, (req, res) =>
                    res.status(200).body('{"uri.status":"https://example.com"}')
                );
                await expect(
                    page.importArchive('dummy', { name: 'test.mtarc', size: 1000, progress: () => {} })
                ).resolves.toEqual({ statusUri: 'https://example.com' });
                xhrMock.teardown();
            });
            it('can import an archive with a conflict (with progress)', async () => {
                xhrMock.setup();
                xhrMock.put(/@api\/deki\/pages\/.*?\/import/, (req, res) =>
                    res
                        .status(409)
                        .reason('Conflict')
                        .body('{"error":"conflict"}')
                );
                const assertion = await expect(
                    page.importArchive('dummy', { name: 'test.mtarc', size: 1000, progress: () => {} }, { foo: 'bar' })
                ).rejects.toEqual({ error: 'conflict' });
                xhrMock.teardown();
                return assertion;
            });
        });
        describe('get full info', () => {
            let page = null;
            beforeEach(() => {
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail getting full page info', async () => {
                const mockFailed = new Error('page API failure');
                fetch.mockRejectOnce(mockFailed);
                expect.assertions(1);
                await expect(page.getFullInfo()).rejects.toEqual(mockFailed);
            });
            it('can succeed getting full info if the response is 404, but the page is virtual', async () => {
                fetch.once('{ "@virtual": "true" }', { status: 404 });
                expect.assertions(1);
                await expect(page.getFullInfo()).resolves.toEqual({ tags: [], virtual: true });
            });
            it('can fail getting full info if the response is 404, and the page is not virtual', async () => {
                fetch.once('{}', { status: 404 });
                expect.assertions(1);
                await expect(page.getFullInfo()).rejects.toEqual({
                    message: 'Not Found',
                    responseText: '{}',
                    status: 404
                });
            });
        });
        describe('page PDF blob', () => {
            let page = null;
            beforeEach(() => {
                fetch.once(Buffer.alloc(5));
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can export the page as a PDF (no params)', async () => {
                // jest-fetch-mock uses isomorphic-fetch which does not implement blob()
                // This is a quick and dirty mock for it so the full exportPdf() functionality can be tested
                global.Response.prototype.blob = jest.fn().mockResolvedValueOnce([1, 2, 3, 4, 5]);
                expect.assertions(1);
                await expect(page.exportPdf()).resolves.toEqual([1, 2, 3, 4, 5]);
            });
        });
        describe('operations', () => {
            let page = null;
            beforeEach(() => {
                fetch.once('{}');
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can get the simple page info', async () => {
                expect.assertions(1);
                await expect(page.getInfo()).resolves.toEqual(emptyPageResponse);
            });
            it('can get the simple page info with params', async () => {
                expect.assertions(1);
                await expect(page.getInfo({ exclude: 'revision' })).resolves.toEqual(emptyPageResponse);
            });
            it('can get the page info', async () => {
                expect.assertions(1);
                await expect(page.getFullInfo()).resolves.toEqual(emptyPageResponse);
            });
            it('can get the page info with params', async () => {
                expect.assertions(1);
                await expect(page.getFullInfo({ t: Date.now() })).resolves.toEqual(emptyPageResponse);
            });
            it('can get the page contents', async () => {
                expect.assertions(1);
                await expect(page.getContents()).resolves.toEqual({ targets: [] });
            });
            it('can get the subpages', async () => {
                expect.assertions(1);
                await expect(page.getSubpages()).resolves.toEqual({ subpages: [] });
            });
            it('can get files and subpages', async () => {
                expect.assertions(1);
                await expect(page.getFilesAndSubpages()).resolves.toEqual({});
            });
            it('can get the tags', async () => {
                expect.assertions(1);
                await expect(page.getTags()).resolves.toEqual(emptyPageResponse);
            });
            it('can get the user rating', async () => {
                expect.assertions(1);
                await expect(page.getRating()).resolves.toEqual({});
            });
            it('can fetch a template rendered in the context of the Page', async () => {
                expect.assertions(1);
                await expect(page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage')).resolves.toEqual({
                    targets: []
                });
            });
            it('can fetch a template rendered in the context of the Page with supplied options', async () => {
                expect.assertions(1);
                await expect(
                    page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage', { includes: 'overview' })
                ).resolves.toEqual({
                    targets: []
                });
            });
            it("can fetch the page's files with default options", async () => {
                expect.assertions(1);
                await expect(page.getFiles()).resolves.toEqual({ files: [] });
            });
            it("can fetch the page's files with supplied options", async () => {
                expect.assertions(1);
                await expect(page.getFiles({ limit: 200 })).resolves.toEqual({ files: [] });
            });
            it('can get the related pages', async () => {
                expect.assertions(1);
                await expect(page.getRelated()).resolves.toEqual(emptyPageListResponse);
            });
            it('can get the related pages (with params)', async () => {
                expect.assertions(1);
                await expect(page.getRelated({ overview: true })).resolves.toEqual(emptyPageListResponse);
            });
            it('can get the page overview', async () => {
                expect.assertions(1);
                await expect(page.getOverview()).resolves.toEqual({});
            });
            it('can get the page export information', async () => {
                expect.assertions(1);
                await expect(page.getExportInformation()).resolves.toEqual({});
            });
            it('can get the diff for a page', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: 'b5f8fd4e-d84e-11e6-8e3d-54e94a010000' })).resolves.toEqual({});
            });
            it('can get the diff for a page ("all" format)', async () => {
                expect.assertions(1);
                await expect(
                    page.getDiff({ previous: 'b5f8fd4e-d84e-11e6-8e3d-54e94a010000', includeVersions: true })
                ).resolves.toEqual({});
            });
            it('getDiff() can fail (no params)', async () => {
                expect.assertions(1);
                await expect(page.getDiff()).rejects.toEqual(new Error('The `previous` parameter must be supplied.'));
            });
            it('getDiff() can fail (invalid previous)', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: true })).rejects.toEqual(
                    new Error('The `previous` parameter must be a number or a string.')
                );
            });
            it('getDiff() can fail (invalid revision)', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: 21, revision: true })).rejects.toEqual(
                    new Error('The revision parameter must be a number or a string.')
                );
            });
            it('getDiff() can fail (invalid format)', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: 21, format: 100 })).rejects.toEqual(
                    new Error('The `format` parameter must be a string equal to "html" or "xhtml".')
                );
            });
            it('getDiff() can fail (invalid includeVersions)', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: 21, includeVersions: 'true' })).rejects.toEqual(
                    new Error('The `includeVersions` parameter must be a Boolean value.')
                );
            });
            it('can export the page as a PDF (all params)', async () => {
                expect.assertions(1);
                await expect(
                    page.exportPdf({
                        fileName: 'foo.pdf',
                        format: 'html',
                        stylesheet: 'foo.css',
                        deep: true,
                        showToc: true,
                        dryRun: true
                    })
                ).resolves.toBeInstanceOf(global.Response);
            });
            it('PDF export failure (invalid fileName)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ fileName: 132 })).rejects.toEqual(
                    new Error('The fileName parameter must be a non-empty string')
                );
            });
            it('PDF export failure (invalid stylesheet)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ stylesheet: [132] })).rejects.toEqual(
                    new Error('The stylesheet parameter must be a non-empty string')
                );
            });
            it('PDF export failure (invalid format)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ format: 'peedeeeff' })).rejects.toEqual(
                    new Error('The `format` parameter must be either "pdf" or "html".')
                );
            });
            it('PDF export failure (invalid deep)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ deep: 'true' })).rejects.toEqual(
                    new Error('The `deep` parameter must be a Boolean value.')
                );
            });
            it('PDF export failure (invalid showToc)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ showToc: {} })).rejects.toEqual(
                    new Error('The `showToc` parameter must be a Boolean value.')
                );
            });
            it('PDF export failure (invalid dryRun)', async () => {
                expect.assertions(1);
                await expect(page.exportPdf({ dryRun: [] })).rejects.toEqual(
                    new Error('The `dryRun` parameter must be a Boolean value.')
                );
            });
            it('can get link details (no params)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails()).resolves.toEqual(emptyPageListResponse);
            });
            it('can get link details (all params)', async () => {
                expect.assertions(1);
                await expect(
                    page.getLinkDetails({
                        includeSubpages: true,
                        linkTypes: ['foo', 'bar'],
                        broken: false,
                        redirect: true,
                        limit: 99,
                        offset: 98,
                        q: 'baz'
                    })
                ).resolves.toEqual(emptyPageListResponse);
            });
            it('link details failure (invalid includeSubpages)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ includeSubpages: 'true' })).rejects.toEqual(
                    new Error('The `includeSubpages` parameter must be a Boolean value.')
                );
            });
            it('link details failure (invalid linkTypes)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ linkTypes: 'true' })).rejects.toEqual(
                    new Error('The `linkTypes` parameter must be an array.')
                );
            });
            it('link details failure (invalid broken)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ broken: 123 })).rejects.toEqual(
                    new Error('The `broken` parameter must be a Boolean value.')
                );
            });
            it('link details failure (invalid redirect)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ redirect: 123 })).rejects.toEqual(
                    new Error('The `redirect` parameter must be a Boolean value.')
                );
            });
            it('link details failure (invalid limit)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ limit: true })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('link details failure (invalid offset)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ offset: {} })).rejects.toEqual(
                    new Error('The `offset` parameter must be a number.')
                );
            });
            it('link details failure (invalid q)', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails({ q: 123 })).rejects.toEqual(
                    new Error('The `q` parameter must be a string.')
                );
            });
            it('can get the health inspections (no parameters)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections()).resolves.toEqual({ inspections: [] });
            });
            it('can get the health inspections (all parameters)', async () => {
                expect.assertions(1);
                await expect(
                    page.getHealthInspections({
                        analyzers: ['foo', 'bar'],
                        severities: ['foo', 'bar'],
                        includeSubpages: true,
                        limit: 400,
                        offset: 100
                    })
                ).resolves.toEqual({ inspections: [] });
            });
            it('health inspections failure (invalid includeSubpages)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections({ includeSubpages: 'true' })).rejects.toEqual(
                    new Error('The `includeSubpages` parameter must be a boolean value.')
                );
            });
            it('health inspections failure (invalid analyzers)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections({ analyzers: 'true' })).rejects.toEqual(
                    new Error('The `analyzers` parameter must be an array.')
                );
            });
            it('health inspections failure (invalid severities)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections({ severities: 123 })).rejects.toEqual(
                    new Error('The `severities` parameter must be an array.')
                );
            });
            it('health inspections failure (invalid limit)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections({ limit: true })).rejects.toEqual(
                    new Error('The `limit` parameter must be a number.')
                );
            });
            it('health inspections failure (invalid offset)', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections({ offset: {} })).rejects.toEqual(
                    new Error('The `offset` parameter must be a number.')
                );
            });
            it('can rate a page', async () => {
                expect.assertions(1);
                await expect(page.rate(1)).resolves.toEqual({});
            });
            it('can rate a page; sending in the old rating', async () => {
                expect.assertions(1);
                await expect(page.rate(1, 0)).resolves.toEqual({});
            });
            it('can reset a page rating implicitly', async () => {
                expect.assertions(1);
                await expect(page.rate()).resolves.toEqual({});
            });
            it('can fail for invalid page rating values', () => {
                expect.assertions(6);
                expect(() => page.rate('foo')).toThrow();
                expect(() => page.rate(10)).toThrow();
                expect(() => page.rate({ score: 1 })).toThrow();
                expect(() => page.rate(1, 'foo')).toThrow();
                expect(() => page.rate(1, 10)).toThrow();
                expect(() => page.rate(1, { score: 1 })).toThrow();
            });
            it('can set the page overview', async () => {
                expect.assertions(1);
                await expect(page.setOverview({ body: 'FOO' })).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail if no arguments are sent when setting the page overview', async () => {
                expect.assertions(1);
                await expect(page.setOverview()).rejects.toEqual(new Error('No overview body was supplied'));
            });
            it('can move a page', async () => {
                expect.assertions(1);
                await expect(page.move({ to: 'foo/bar' })).resolves.toEqual(emptyPageListResponse);
            });
            it('can move a page with no options provided', async () => {
                expect.assertions(1);
                await expect(page.move()).resolves.toEqual(emptyPageListResponse);
            });
            it('can set the page contents', async () => {
                expect.assertions(1);
                await expect(page.setContents('Sample contents')).resolves.toEqual({});
            });
            it('can fail when setting invalid page contents', async () => {
                expect.assertions(1);
                await expect(page.setContents({})).rejects.toEqual(new Error('Contents should be string.'));
            });
            it('can handle setting the page contents conflict', async () => {
                expect.assertions(1);
                await expect(page.setContents('Sample contents', { edittime: 'now', abort: 'never' })).resolves.toEqual(
                    {}
                );
            });
            it('can activate a draft for the page', async () => {
                expect.assertions(1);
                await expect(page.activateDraft()).resolves.toEqual(emptyPageResponse);
            });
            it('can delete a page', async () => {
                expect.assertions(1);
                await expect(page.delete()).resolves.toEqual(emptyPageListResponse);
            });
            it('can delete pages recursively', async () => {
                expect.assertions(1);
                await expect(page.delete(true)).resolves.toEqual(emptyPageListResponse);
            });
            it('can set the tags', async () => {
                expect.assertions(1);
                await expect(page.setTags(['foo', 'bar'])).resolves.toEqual(emptyPageResponse);
            });
            it('can set the tags (empty request)', async () => {
                expect.assertions(1);
                await expect(page.setTags()).resolves.toEqual(emptyPageResponse);
            });
            it('can set the tags and allow idf errors', async () => {
                expect.assertions(1);
                await expect(page.setTags(['foo', 'bar'], { allow: 'idferrors' })).resolves.toEqual(emptyPageResponse);
            });
            it('can set the tags to empty and allow idf errors', async () => {
                expect.assertions(1);
                await expect(page.setTags(null, { allow: 'idferrors' })).resolves.toEqual(emptyPageResponse);
            });
            it('can get recommended tags', async () => {
                expect.assertions(1);
                await expect(page.getRecommendedTags()).resolves.toEqual(emptyPageResponse);
            });
            it('can attach a file to a page (no progress)', async () => {
                expect.assertions(1);
                await expect(page.attachFile({}, { name: 'test.jpg', type: 'image/jpg', size: 1000 })).resolves.toEqual(
                    {}
                );
            });
            it('can attach a file to a page (no added info)', async () => {
                expect.assertions(1);
                await expect(page.attachFile({ name: 'test.jpg', type: 'image/jpg', size: 1000 })).resolves.toEqual({});
            });
            it('can attach a file to a page (with progress)', async () => {
                expect.assertions(1);
                xhrMock.setup();
                xhrMock.put(/@api\/deki\/pages\/123\/files\/test.jpg/, (req, res) => {
                    return res.status(200).body('{"@id":456, "filename":"success.jpg"}');
                });
                await expect(
                    page.attachFile('dummy', { name: 'test.jpg', type: 'image/jpg', size: 1000, progress: () => {} })
                ).resolves.toEqual({ id: 456, filename: 'success.jpg' });
                xhrMock.teardown();
            });
            it('can copy a page', async () => {
                expect.assertions(1);
                await expect(page.copy({ to: 'foo/bar' })).resolves.toEqual(emptyPageListResponse);
            });
            it('can copy a page with `allow` specified', async () => {
                expect.assertions(1);
                await expect(page.copy({ to: 'foo/bar', allow: 'deleteredirects' })).resolves.toEqual(
                    emptyPageListResponse
                );
            });
            it('can fail if the `to` parameter is not sent to copy()', async () => {
                expect.assertions(1);
                await expect(page.copy()).rejects.toEqual(
                    new Error('The copy target location must be specified in the `to` parameter.')
                );
            });
            it('can revert a page (minimum options)', async () => {
                expect.assertions(1);
                await expect(page.revert({ fromRevision: 5 })).resolves.toBeInstanceOf(global.Response);
            });
            it('can revert a page (all options)', async () => {
                expect.assertions(1);
                await expect(page.revert({ fromRevision: 5, abort: 'never', verbose: true })).resolves.toBeInstanceOf(
                    global.Response
                );
            });
            it('can revert a page (alternate options)', async () => {
                expect.assertions(1);
                await expect(
                    page.revert({ fromRevision: 5, abort: 'conflict', verbose: false })
                ).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail while trying to revert a page (no options)', async () => {
                expect.assertions(1);
                await expect(page.revert()).rejects.toEqual(new Error('The revert options must be specified.'));
            });
            it('can fail while trying to revert a page (no `fromRevision`)', async () => {
                expect.assertions(1);
                await expect(page.revert({})).rejects.toEqual(
                    new Error('The fromRevision parameter must be specified, and must be a string or a number.')
                );
            });
            it('can fail while trying to revert a page (invalid `abort` type)', async () => {
                expect.assertions(1);
                await expect(
                    page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', abort: true })
                ).rejects.toEqual(new Error('The `abort` parameter must be set to "conflict" or "never".'));
            });
            it('can fail while trying to revert a page (invalid `abort` value)', async () => {
                expect.assertions(1);
                await expect(
                    page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', abort: 'YES' })
                ).rejects.toEqual(new Error('The `abort` parameter must be set to "conflict" or "never".'));
            });
            it('can fail while trying to revert a page (invalid `verbose` value)', async () => {
                expect.assertions(1);
                await expect(
                    page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', verbose: 'YES' })
                ).rejects.toEqual(new Error('The `verbose` parameter must be a Boolean value.'));
            });
            it('can set reorder the page (no params)', async () => {
                expect.assertions(1);
                await expect(page.setOrder()).resolves.toBeInstanceOf(global.Response);
            });
            it('can set reorder the page (with after ID)', async () => {
                expect.assertions(1);
                await expect(page.setOrder(111)).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail setting the page order (invalid after ID)', async () => {
                expect.assertions(1);
                await expect(page.setOrder('13')).rejects.toEqual(new Error('The afterId must be a numeric page ID.'));
            });
            it('can get hierarchy info', async () => {
                expect.assertions(1);
                await expect(page.getHierarchyInfo()).resolves.toEqual({});
            });
            it('can get the list of cases linked to the page', async () => {
                expect.assertions(1);
                await expect(page.getLinkedCases()).resolves.toEqual({ linkData: [] });
            });
            it('can link a case to the page', async () => {
                expect.assertions(1);
                await expect(page.linkToCase('abcd1234')).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail linking to a case if the case ID is not supplied', async () => {
                expect.assertions(1);
                await expect(page.linkToCase()).rejects.toEqual(
                    new Error('The case ID must be supplied in order to link a case to the page.')
                );
            });
            it('can unlink a case from the page', async () => {
                expect.assertions(1);
                await expect(page.unlinkCase('abcd1234')).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail unlinking from a case if the case ID is not supplied', async () => {
                expect.assertions(1);
                await expect(page.unlinkCase()).rejects.toEqual(
                    new Error('The case ID must be supplied in order to unlink a case from the page.')
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('page API failure');
            let page = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                page = new Page(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail getting basic page info', async () => {
                expect.assertions(1);
                await expect(page.getInfo()).rejects.toEqual(mockFailed);
            });
            it('can fail getting page contents', async () => {
                expect.assertions(1);
                await expect(page.getContents()).rejects.toEqual(mockFailed);
            });
            it('can fail setting page contents', async () => {
                expect.assertions(1);
                await expect(page.setContents('Sample contents')).rejects.toEqual({ message: 'page API failure' });
            });
            it('can fail getting page files', async () => {
                expect.assertions(1);
                await expect(page.getFiles()).rejects.toEqual(mockFailed);
            });
            it('can fail attaching files with no progress', async () => {
                expect.assertions(1);
                await expect(page.attachFile('testName')).rejects.toEqual(mockFailed);
            });
            it('can fail attaching a file to a page (with progress)', async () => {
                xhrMock.setup();
                xhrMock.put(/@api\/deki\/pages\/123\/files\/test.jpg/, (req, res) =>
                    res
                        .status(500)
                        .reason('There was an error')
                        .body('{"error":"bad"}')
                );
                await expect(
                    page.attachFile('dummy', { name: 'test.jpg', type: 'image/jpg', size: 1000, progress: () => {} })
                ).rejects.toEqual({
                    message: 'There was an error',
                    responseText: '{"error":"bad"}',
                    status: 500
                });
                xhrMock.teardown();
            });
            it('can fail getting overview', async () => {
                expect.assertions(1);
                await expect(page.getOverview()).rejects.toEqual(mockFailed);
            });
            it('can fail setting overview', async () => {
                expect.assertions(1);
                await expect(page.setOverview({ body: 'FOO' })).rejects.toEqual(mockFailed);
            });
            it('can fail getting page tags', async () => {
                expect.assertions(1);
                await expect(page.getTags()).rejects.toEqual(mockFailed);
            });
            it('can fail setting page tags', async () => {
                expect.assertions(1);
                await expect(page.setTags()).rejects.toEqual(mockFailed);
            });
            it('can fail getting recommended page tags', async () => {
                expect.assertions(1);
                await expect(page.getRecommendedTags()).rejects.toEqual({ message: 'page API failure' });
            });
            it('can fail getting diff between two versions', async () => {
                expect.assertions(1);
                await expect(page.getDiff({ previous: 21, format: 'html' })).rejects.toEqual({
                    message: 'page API failure'
                });
            });
            it('can fail getting related', async () => {
                expect.assertions(1);
                await expect(page.getRelated()).rejects.toEqual(mockFailed);
            });
            it('can fail reverting', async () => {
                expect.assertions(1);
                await expect(page.revert({ fromRevision: 5 })).rejects.toEqual(mockFailed);
            });
            it('can fail getting subpages of a page', async () => {
                expect.assertions(1);
                await expect(page.getSubpages()).rejects.toEqual(mockFailed);
            });
            it('can fail getting the files and subpages of a page', async () => {
                expect.assertions(1);
                await expect(page.getFilesAndSubpages()).rejects.toEqual(mockFailed);
            });
            it('can fail getting the hierarchy tree of the current page', async () => {
                expect.assertions(1);
                await expect(page.getTree()).rejects.toEqual(mockFailed);
            });
            it('can fail getting the rating information of the current page', async () => {
                expect.assertions(1);
                await expect(page.getRating()).rejects.toEqual(mockFailed);
            });
            it('can fail setting the rating of the current page', async () => {
                expect.assertions(1);
                await expect(page.rate()).rejects.toEqual(mockFailed);
            });
            it('can fail getting the html template of the current page', async () => {
                expect.assertions(1);
                await expect(page.getHtmlTemplate()).rejects.toEqual(mockFailed);
            });
            it('can fail copying the current page', async () => {
                expect.assertions(1);
                await expect(page.copy({ to: 'foo/bar' })).rejects.toBeDefined();
            });
            it('can fail moving the current page', async () => {
                expect.assertions(1);
                await expect(page.move({ to: 'foo/bar' })).rejects.toBeDefined();
            });
            it('can fail deleting the current page', async () => {
                expect.assertions(1);
                await expect(page.delete()).rejects.toEqual(mockFailed);
            });
            it('can fail activating a draft on the current page', async () => {
                expect.assertions(1);
                await expect(page.activateDraft()).rejects.toEqual(mockFailed);
            });
            it('can fail getting export information', async () => {
                expect.assertions(1);
                await expect(page.getExportInformation()).rejects.toEqual(mockFailed);
            });
            it('can fail exporting current page as pdf', async () => {
                expect.assertions(1);
                await expect(
                    page.exportPdf({
                        fileName: 'foo.pdf',
                        format: 'html',
                        stylesheet: 'foo.css',
                        deep: true,
                        showToc: true,
                        dryRun: true
                    })
                ).rejects.toEqual(mockFailed);
            });
            it('can fail setting order of current page', async () => {
                expect.assertions(1);
                await expect(page.setOrder()).rejects.toEqual(mockFailed);
            });
            it('can fail getting link details on current page', async () => {
                expect.assertions(1);
                await expect(page.getLinkDetails()).rejects.toBeDefined();
            });
            it('can fail getting health inspections on current page', async () => {
                expect.assertions(1);
                await expect(page.getHealthInspections()).rejects.toBeDefined();
            });
            it('can fail getting getting hierarchy info on current page', async () => {
                expect.assertions(1);
                await expect(page.getHierarchyInfo()).rejects.toEqual(mockFailed);
            });
            it('can fail posting link to case info on current page', async () => {
                expect.assertions(1);
                await expect(page.linkToCase('linkName')).rejects.toEqual(mockFailed);
            });
            it('can fail removing link to case on current page', async () => {
                expect.assertions(1);
                await expect(page.unlinkCase('linkName')).rejects.toEqual(mockFailed);
            });
            it('can fail getting link to case on current page', async () => {
                expect.assertions(1);
                await expect(page.getLinkedCases()).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('Page manager', () => {
        describe('operations', () => {
            let pm = null;
            beforeEach(() => {
                fetch.once('{}');
                pm = new PageManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                pm = null;
            });
            it('can fetch the ratings for a set of pages', async () => {
                expect.assertions(1);
                await expect(pm.getRatings([440, 441])).resolves.toEqual(emptyPageListResponse);
            });
            it('can find pages', async () => {
                expect.assertions(1);
                await expect(
                    pm.findPages({
                        parentId: 1,
                        tags: ['foo'],
                        missingClassifications: ['article:topic'],
                        since: new Date(1999, 12, 31),
                        upTo: new Date(Date.now())
                    })
                ).resolves.toEqual(emptyPageListResponse);
            });
            it('can find pages with missing optional parameters', async () => {
                expect.assertions(1);
                await expect(
                    pm.findPages({
                        tags: [],
                        missingClassifications: ['article:topic'],
                        since: new Date(1999, 12, 31),
                        upTo: new Date(Date.now())
                    })
                ).resolves.toEqual(emptyPageListResponse);
            });
            it('can find pages with missing optional parameters (different ones)', async () => {
                expect.assertions(1);
                await expect(pm.findPages({ parentId: 1, tags: ['foo'], missingClassifications: [] })).resolves.toEqual(
                    emptyPageListResponse
                );
            });
            it('can fail when no parameters are sent to find pages', async () => {
                expect.assertions(1);
                await expect(pm.findPages()).rejects.toEqual(
                    new Error('At least one constraint must be supplied to find pages.')
                );
            });
            it('can fail when an invalid `tags` parameter is sent to find pages', async () => {
                expect.assertions(1);
                await expect(pm.findPages({ tags: 'foo' })).rejects.toEqual(
                    new Error('The `tags` parameter must be an Array.')
                );
            });
            it('can fail when an invalid `missingClassifications` parameter is sent to find pages', async () => {
                expect.assertions(1);
                await expect(pm.findPages({ missingClassifications: 'foo' })).rejects.toEqual(
                    new Error('The `missingClassifications` parameter must be an Array.')
                );
            });
            it('can fail when an invalid `since` parameter is sent to find pages', async () => {
                expect.assertions(1);
                await expect(pm.findPages({ since: 'foo' })).rejects.toEqual(
                    new Error('The `since` parameter must be of type Date.')
                );
            });
            it('can fail when an invalid `upTo` parameter is sent to find pages', async () => {
                expect.assertions(1);
                await expect(pm.findPages({ upTo: 'foo' })).rejects.toEqual(
                    new Error('The `upTo` parameter must be of type Date.')
                );
            });
            it('can get template pages (no params)', async () => {
                expect.assertions(1);
                await expect(pm.getTemplates()).resolves.toEqual({ templates: [] });
            });
            it('can get template pages (all params)', async () => {
                expect.assertions(1);
                await expect(pm.getTemplates({ type: 'content', includeDescription: false })).resolves.toEqual({
                    templates: []
                });
            });
            it('get templates failure (invalid `type`)', async () => {
                expect.assertions(1);
                await expect(pm.getTemplates({ type: 'foo' })).rejects.toEqual(
                    new Error('The `type` parameter must be set to either "page" or "content".')
                );
            });
            it('invalid `includeDescription`', async () => {
                expect.assertions(1);
                await expect(pm.getTemplates({ includeDescription: 'foo' })).rejects.toEqual(
                    new Error('The `includeDescription` parameter must be a Boolean value')
                );
            });
            it('can get a list of popular pages (no params)', async () => {
                expect.assertions(1);
                await expect(pm.getPopularPages()).resolves.toEqual(emptyPageListResponse);
            });
            it('can get a list of popular pages (all params)', async () => {
                expect.assertions(1);
                await expect(pm.getPopularPages({ limit: 10, offset: 20 })).resolves.toEqual(emptyPageListResponse);
            });
            it('popular pages failure (invalid options)', async () => {
                expect.assertions(1);
                await expect(pm.getPopularPages({ limit: 'foo', offset: true })).rejects.toEqual(
                    'foo is not a number, foo does not equal all, true is not a number'
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('pageManager API failure');
            let page = null;
            beforeEach(() => {
                fetch.mockReject(mockFailed);
                page = new PageManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail getting page rating information', async () => {
                expect.assertions(1);
                await expect(page.getRatings([440, 441])).rejects.toEqual(mockFailed);
            });
            it('can fail finding pages', async () => {
                expect.assertions(1);
                await expect(
                    page.findPages({
                        parentId: 1,
                        tags: ['foo'],
                        missingClassifications: ['article:topic'],
                        since: new Date(1999, 12, 31),
                        upTo: new Date(Date.now())
                    })
                ).rejects.toBeDefined();
            });
            it('can fail getting page templates', async () => {
                expect.assertions(1);
                await expect(page.getTemplates()).rejects.toEqual(mockFailed);
            });
            it('can fail getting popular pages', async () => {
                expect.assertions(1);
                await expect(page.getPopularPages()).rejects.toEqual(mockFailed);
            });
        });
    });
});
