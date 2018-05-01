/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
jest.unmock('../pageBase.js');
const Page = require.requireActual('../page.js').Page;
const PageManager = require.requireActual('../page.js').PageManager;

describe('Plug Error handling for the page.js module', () => {
    let page = null;
    beforeEach(() => {
        page = new Page(123);
    });
    it('can fail getting basic page info', async () => {
        expect.assertions(1);
        return await expect(page.getInfo()).rejects.toEqual(undefined);
    });
    it('can fail getting subpages of a page', async () => {
        expect.assertions(1);
        return await expect(page.getSubpages()).rejects.toEqual(undefined);
    });
    it('can fail getting the files and subpages of a page', async () => {
        expect.assertions(1);
        return await expect(page.getFilesAndSubpages()).rejects.toEqual(undefined);
    });
    it('can fail getting the hierarchy tree of the current page', async () => {
        expect.assertions(1);
        return await expect(page.getTree()).rejects.toEqual(undefined);
    });
    it('can fail getting the hierarchy tree IDs of the current page', async () => {
        expect.assertions(1);
        return await expect(page.getTreeIds()).rejects.toBeDefined();
    });
    it('can fail getting the rating information of the current page', async () => {
        expect.assertions(1);
        return await expect(page.getRating()).rejects.toEqual(undefined);
    });
    it('can fail setting the rating of the current page', async () => {
        expect.assertions(1);
        return await expect(page.rate()).rejects.toEqual(undefined);
    });
    it('can fail getting the html template of the current page', async () => {
        expect.assertions(1);
        return await expect(page.getHtmlTemplate()).rejects.toEqual(undefined);
    });
    it('can fail copying the current page', async () => {
        expect.assertions(1);
        return await expect(page.copy({ to: 'foo/bar' })).rejects.toBeDefined();
    });
    it('can fail moving the current page', async () => {
        expect.assertions(1);
        return await expect(page.move({ to: 'foo/bar' })).rejects.toBeDefined();
    });
    it('can fail deleting the current page', async () => {
        expect.assertions(1);
        return await expect(page.delete()).rejects.toEqual(undefined);
    });
    it('can fail activating a draft on the current page', async () => {
        expect.assertions(1);
        return await expect(page.activateDraft()).rejects.toEqual(undefined);
    });
    it('can fail importing archived files on the current page', async () => {
        expect.assertions(1);
        return await expect(page.importArchive({ name: 'testFile.mtarc', size: 1000 })).rejects.toBeDefined();
    });
    it('can fail getting export information', async () => {
        expect.assertions(1);
        return await expect(page.getExportInformation()).rejects.toEqual(undefined);
    });
    it('can fail exporting current page as pdf', async () => {
        expect.assertions(1);
        return await expect(
            page.exportPdf({
                fileName: 'foo.pdf',
                format: 'html',
                stylesheet: 'foo.css',
                deep: true,
                showToc: true,
                dryRun: true
            })
        ).rejects.toEqual(undefined);
    });
    it('can fail setting order of current page', async () => {
        expect.assertions(1);
        return await expect(page.setOrder()).rejects.toEqual(undefined);
    });
    it('can fail getting link details on current page', async () => {
        expect.assertions(1);
        return await expect(page.getLinkDetails()).rejects.toBeDefined();
    });
    it('can fail getting health inspections on current page', async () => {
        expect.assertions(1);
        return await expect(page.getHealthInspections()).rejects.toBeDefined();
    });
    it('can fail getting getting hierarchy info on current page', async () => {
        expect.assertions(1);
        return await expect(page.getHierarchyInfo()).rejects.toEqual(undefined);
    });
    it('can fail posting link to case info on current page', async () => {
        expect.assertions(1);
        return await expect(page.linkToCase('linkName')).rejects.toEqual(undefined);
    });
    it('can fail removing link to case on current page', async () => {
        expect.assertions(1);
        return await expect(page.unlinkCase('linkName')).rejects.toEqual(undefined);
    });
    it('can fail getting link to case on current page', async () => {
        expect.assertions(1);
        return await expect(page.getLinkedCases()).rejects.toEqual(undefined);
    });
});

describe('Plug Error handling for the page.js module', () => {
    let page = null;
    const failed = jest.fn();
    beforeEach(() => {
        page = new PageManager();
    });
    afterEach(() => {
        page = null;
        failed.mockReset();
    });
    it('can fail getting page rating information', async () => {
        expect.assertions(1);
        return await expect(page.getRatings([440, 441])).rejects.toEqual(undefined);
    });
    it('can fail finding pages', async () => {
        expect.assertions(1);
        return await expect(
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
        return await expect(page.getTemplates()).rejects.toEqual(undefined);
    });
    it('can fail getting popular pages', async () => {
        expect.assertions(1);
        return await expect(page.getPopularPages()).rejects.toEqual(undefined);
    });
});
