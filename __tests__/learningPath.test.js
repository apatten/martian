import fetch from 'jest-fetch-mock';
import { LearningPathManager, LearningPath } from '../learningPath.js';
global.fetch = fetch;

describe('Learning Path API', () => {
    const emptyLPResponse = { pages: [] };
    describe('LearningPathManager', () => {
        let lpm = null;
        beforeEach(() => {
            lpm = new LearningPathManager();
        });
        afterEach(() => {
            lpm = null;
        });
        describe('operations', () => {
            beforeEach(() => {
                fetch.once('{}');
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can get the listing of all of the learning paths', async () => {
                expect.assertions(1);
                await expect(lpm.getLearningPaths()).resolves.toEqual({ learningPaths: [] });
            });
            it('can get learning path by name', () => {
                expect.assertions(1);
                expect(lpm.getLearningPath('name')).toBeInstanceOf(LearningPath);
            });
            it('can create a learning path', async () => {
                expect.assertions(1);
                await expect(
                    lpm.createLearningPath({ title: 'foo', name: 'bar', summary: 'baz', category: 'thing' })
                ).resolves.toEqual(emptyLPResponse);
            });
            it('can create a learning path with a long summary', async () => {
                expect.assertions(1);
                await expect(
                    lpm.createLearningPath({
                        title: 'foo',
                        name: 'bar',
                        summary:
                            "Years isn't there void third darkness tree made firmament from set which morning hath signs all so meat which abundantly. Together behold land. Land form, grass isn't called won't called. Said is great second were sea beginning unto unto without she'd. Seas seed she'd waters hath. Saying yielding rule. Forth light creeping winged day it blessed let in multiply don't. Likeness creature under have, have created, i set creeping blessed his after likeness seasons midst under also days shall, don't male fifth tree there hath herb gathering stars. Gathering form Place whales open blessed waters seas Fruitful earth kind wherein years signs evening female spirit winged His they're god whales meat meat without for face. Saw moveth their open don't after be and without, first thing third Divided herb every greater. Lights forth from us there gathered. Appear subdue. Own fourth living, created our rule creature, firmament our our, first evening good it you're bring you're wherein said said blessed very light form saying you. Heaven, very saw dominion without every tree male. Bring their night creepeth was won't fill beast god thing his you'll cattle together earth, without is also. Set the man which creeping place. Dry made likeness."
                    })
                ).resolves.toEqual(emptyLPResponse);
            });
            it('can get the categories', async () => {
                expect.assertions(1);
                await expect(lpm.getCategories()).resolves.toEqual({ categories: [] });
            });
            it('can fail to create a learning path (no data)', async () => {
                await expect(lpm.createLearningPath()).rejects.toEqual(
                    new Error('Unable to create a learning path without data.')
                );
            });
            it('can fail to create a learning path (invalid name)', async () => {
                await expect(lpm.createLearningPath({ name: '' })).rejects.toEqual(
                    new Error('The `name` parameter must be supplied, and must be a non-empty string.')
                );
            });
            it('can fail to create a learning path (invalid title)', async () => {
                await expect(lpm.createLearningPath({ name: 'foo', title: '' })).rejects.toEqual(
                    new Error('The `title` parameter must be supplied, and must be a non-empty string.')
                );
            });
            it('can fail to create a learning path (invalid summary)', async () => {
                await expect(lpm.createLearningPath({ name: 'foo', title: 'bar', summary: 123 })).rejects.toEqual(
                    new Error('The `summary` parameter must be a string.')
                );
            });
            it('can fail to create a learning path (invalid category)', async () => {
                await expect(lpm.createLearningPath({ name: 'foo', title: 'bar', category: 123 })).rejects.toEqual(
                    new Error('The `category` parameter must be a string.')
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('learningPathManager API failure');
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can fail getting the listing of all of the learning paths', async () => {
                expect.assertions(1);
                await expect(lpm.getLearningPaths()).rejects.toEqual(mockFailed);
            });
            it('can fail creating a learning path', async () => {
                expect.assertions(1);
                await expect(
                    lpm.createLearningPath({ title: 'foo', name: 'bar', summary: 'baz', category: 'thing' })
                ).rejects.toEqual(mockFailed);
            });
            it('can fail getting the listing of all categories used amongst learning paths', async () => {
                expect.assertions(1);
                await expect(lpm.getCategories()).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('LearningPath', () => {
        let lp = null;
        beforeEach(() => {
            lp = new LearningPath('foobar');
        });
        afterEach(() => {
            lp = null;
        });
        describe('operations', () => {
            const emptyTagsResponse = { tags: [] };
            beforeEach(() => {
                fetch.once('{}');
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can construct a new learning path', () => {
                expect.assertions(3);
                const learningPath = new LearningPath('foobar');
                expect(learningPath).toBeDefined();
                expect(() => LearningPath()).toThrow();
                expect(() => LearningPathManager()).toThrow();
            });
            it('can get a learning path', async () => {
                expect.assertions(1);
                await expect(lp.getInfo()).resolves.toEqual(emptyLPResponse);
            });
            it('can get a learning path revision', async () => {
                expect.assertions(1);
                await expect(lp.getInfo('89e26fa4-633b-48f0-9433-2c3c54bcbf48')).resolves.toEqual(emptyLPResponse);
            });
            it('can update a learning path (minimum params)', async () => {
                expect.assertions(1);
                await expect(lp.update({ title: 'bar' })).resolves.toEqual(emptyLPResponse);
            });
            it('can update a learning path (all params)', async () => {
                expect.assertions(1);
                await expect(
                    lp.update({ title: 'bar', summary: 'baz', category: 'foo', pageIds: [1, 2, 3] }, '201703021200')
                ).resolves.toEqual(emptyLPResponse);
            });
            it('can fail updating a learning path (no params)', async () => {
                expect.assertions(1);
                await expect(lp.update()).rejects.toEqual(
                    'The content parameter must be supplied to update a learning path'
                );
            });
            it('can fail updating a learning path (no title)', async () => {
                expect.assertions(1);
                await expect(lp.update({ summary: 'foo' })).rejects.toEqual(
                    'The title parameter must be supplied, and must be a non-empty string.'
                );
            });
            it('can fail updating a learning path (invalid summary)', async () => {
                expect.assertions(1);
                await expect(lp.update({ title: 'path', summary: 132 })).rejects.toEqual(
                    'The summary parameter must be a string'
                );
            });
            it('can fail updating a learning path (invalid category)', async () => {
                expect.assertions(1);
                await expect(lp.update({ title: 'path', summary: 'foo', category: 132 })).rejects.toEqual(
                    'The category parameter must be a string'
                );
            });
            it('can fail updating a learning path (invalid page IDs)', async () => {
                expect.assertions(1);
                await expect(lp.update({ title: 'path', pageIds: 132 })).rejects.toEqual(
                    'The pages parameter must be an array'
                );
            });
            it('can remove a learning path', async () => {
                expect.assertions(1);
                await expect(lp.remove()).resolves.toBeInstanceOf(global.Response);
            });
            it('can clone a learning path', async () => {
                expect.assertions(1);
                await expect(lp.clone('bar')).resolves.toEqual(emptyLPResponse);
            });
            it('can fail while cloning a learning path', async () => {
                expect.assertions(1);
                await expect(lp.clone()).rejects.toEqual('The new name for the clone must be a non-empty string.');
            });
            it('can revert a learning path to a specific revision', async () => {
                expect.assertions(1);
                await expect(lp.revertToRevision(1)).resolves.toEqual(emptyLPResponse);
            });
            it('can revert a learning path to a specific revision (edit time included)', async () => {
                expect.assertions(1);
                await expect(lp.revertToRevision(1, '201703021200')).resolves.toEqual(emptyLPResponse);
            });
            it('can fail while trying to revert to a revision with no revision specified', async () => {
                expect.assertions(1);
                await expect(lp.revertToRevision()).rejects.toEqual(new Error('The revision parameter is required'));
            });
            it('can add a page to a learning path', async () => {
                expect.assertions(1);
                await expect(lp.addPage(123, '20160225000833')).resolves.toEqual(emptyTagsResponse);
            });
            it('can add a page to a learning path (no edit time)', async () => {
                expect.assertions(1);
                await expect(lp.addPage(123)).resolves.toEqual(emptyTagsResponse);
            });
            it('can remove a page from a learning path', async () => {
                expect.assertions(1);
                await expect(lp.removePage(123, '20160225000833')).resolves.toBeInstanceOf(global.Response);
            });
            it('can remove a page from a learning path (no edit time)', async () => {
                expect.assertions(1);
                await expect(lp.removePage(123)).resolves.toBeInstanceOf(global.Response);
            });
            it('can reorder a page in a learning path', async () => {
                expect.assertions(1);
                await expect(lp.reorderPage(123, 124, '20160225000833')).resolves.toEqual(emptyLPResponse);
            });
            it('can reorder a page in a learning path (no edit time)', async () => {
                expect.assertions(1);
                await expect(lp.reorderPage(123, 124)).resolves.toEqual(emptyLPResponse);
            });
            it('can reorder a page in a learning path (page ID only)', async () => {
                expect.assertions(1);
                await expect(lp.reorderPage(123)).resolves.toEqual(emptyLPResponse);
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('learningPath API failure');
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can fail getting a learning path', async () => {
                expect.assertions(1);
                await expect(lp.getInfo()).rejects.toEqual(mockFailed);
            });
            it('can fail updating a learning path', async () => {
                expect.assertions(1);
                await expect(lp.update({ title: 'bar' })).rejects.toEqual(mockFailed);
            });
            it('can fail removing a learning path', async () => {
                expect.assertions(1);
                await expect(lp.remove()).rejects.toEqual(mockFailed);
            });
            it('can fail cloning a learning path', async () => {
                expect.assertions(1);
                await expect(lp.clone('pathName')).rejects.toEqual(mockFailed);
            });
            it('can fail reverting a learning path to a specific revision', async () => {
                expect.assertions(1);
                await expect(lp.revertToRevision(123)).rejects.toEqual(mockFailed);
            });
            it('can fail adding a page to a learning path', async () => {
                expect.assertions(1);
                await expect(lp.addPage(123)).rejects.toEqual(mockFailed);
            });
            it('can fail removing a page from a learning path', async () => {
                expect.assertions(1);
                await expect(lp.removePage(123)).rejects.toEqual(mockFailed);
            });
            it('can fail reordering a page in a learning path', async () => {
                expect.assertions(1);
                await expect(lp.reorderPage(123)).rejects.toEqual(mockFailed);
            });
        });
    });
});
