/* eslint-env jasmine, jest */
jest.unmock('../learningPath.js');
import { LearningPathManager, LearningPath } from '../learningPath.js';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

describe('Learning Path API', () => {
    describe('Manager tests', () => {
        let lpm = null;
        beforeEach(() => {
            lpm = new LearningPathManager();
        });
        it('can fail getting the listing of all of the learning paths', async () => {
            expect.assertions(1);
            return await expect(lpm.getLearningPaths()).rejects.toEqual(undefined);
        });
        it('can fail creating a learning path', async () => {
            expect.assertions(1);
            return await expect(
                lpm.createLearningPath({ title: 'foo', name: 'bar', summary: 'baz', category: 'thing' })
            ).rejects.toEqual(undefined);
        });
        it('can fail getting the lsting of all categories used amongst learning paths', async () => {
            expect.assertions(1);
            return await expect(lpm.getCategories()).rejects.toEqual(undefined);
        });
    });
    describe('operations', () => {
        let lp = null;
        beforeEach(() => {
            lp = new LearningPath('foobar');
        });
        it('can fail getting a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.getInfo()).rejects.toEqual(undefined);
        });
        it('can fail updating a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.update({ title: 'bar' })).rejects.toEqual(undefined);
        });
        it('can fail removing a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.remove()).rejects.toEqual(undefined);
        });
        it('can fail cloning a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.clone('pathName')).rejects.toEqual(undefined);
        });
        it('can fail reverting a learning path to a specific revision', async () => {
            expect.assertions(1);
            return await expect(lp.revertToRevision(123)).rejects.toEqual(undefined);
        });
        it('can fail adding a page to a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.addPage(123)).rejects.toEqual(undefined);
        });
        it('can fail removing a page from a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.removePage(123)).rejects.toEqual(undefined);
        });
        it('can fail reordering a page in a learning path', async () => {
            expect.assertions(1);
            return await expect(lp.reorderPage(123)).rejects.toEqual(undefined);
        });
    });
});
