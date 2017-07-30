/* eslint-env jasmine, jest */
jest.unmock('../learningPath.js');
import { LearningPathManager, LearningPath } from '../learningPath.js';

describe('Learning Path API', () => {
    describe('constructor', () => {
        it('can construct a new learning path', () => {
            let learningPath = new LearningPath('foobar');
            expect(learningPath).toBeDefined();
            expect(() => learningPath()).toThrow();
            expect(() => LearningPathManager()).toThrow();
        });
    });
    describe('Manager tests', () => {
        let lpm = null;
        beforeEach(() => {
            lpm = new LearningPathManager();
        });
        afterEach(() => {
            lpm = null;
        });
        it('can get the listing of all of the learning paths', () => {
            return lpm.getLearningPaths();
        });
        it('can get learning path by name', () => {
            var lp = lpm.getLearningPath('name');
            expect(lp instanceof LearningPath).toBe(true);
        });
        it('can create a learning path', () => {
            return lpm.createLearningPath({ title: 'foo', name: 'bar', summary: 'baz', category: 'thing' });
        });
        it('can create a learning path with a long summary', () => {
            return lpm.createLearningPath({
                title: 'foo',
                name: 'bar',
                summary: 'Years isn\'t there void third darkness tree made firmament from set which morning hath signs all so meat which abundantly. Together behold land. Land form, grass isn\'t called won\'t called. Said is great second were sea beginning unto unto without she\'d. Seas seed she\'d waters hath. Saying yielding rule. Forth light creeping winged day it blessed let in multiply don\'t. Likeness creature under have, have created, i set creeping blessed his after likeness seasons midst under also days shall, don\'t male fifth tree there hath herb gathering stars. Gathering form Place whales open blessed waters seas Fruitful earth kind wherein years signs evening female spirit winged His they\'re god whales meat meat without for face. Saw moveth their open don\'t after be and without, first thing third Divided herb every greater. Lights forth from us there gathered. Appear subdue. Own fourth living, created our rule creature, firmament our our, first evening good it you\'re bring you\'re wherein said said blessed very light form saying you. Heaven, very saw dominion without every tree male. Bring their night creepeth was won\'t fill beast god thing his you\'ll cattle together earth, without is also. Set the man which creeping place. Dry made likeness.'
            });
        });
        describe('create learning path failures', () => {
            let failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('no data', () => {
                return lpm.createLearningPath().catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid name', () => {
                return lpm.createLearningPath({ name: '' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid title', () => {
                return lpm.createLearningPath({ name: 'foo', title: '' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid summary', () => {
                return lpm.createLearningPath({ name: 'foo', title: 'bar', summary: 123 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid category', () => {
                return lpm.createLearningPath({ name: 'foo', title: 'bar', category: 123 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
        it('can get the categories', () => {
            return lpm.getCategories();
        });
    });
    describe('operations', () => {
        let lp = null;
        beforeEach(() => {
            lp = new LearningPath('foobar');
        });
        afterEach(() => {
            lp = null;
        });
        it('can get a learning path', () => {
            return lp.getInfo();
        });
        it('can get a learning path revision', () => {
            return lp.getInfo('89e26fa4-633b-48f0-9433-2c3c54bcbf48');
        });
        it('can update a learning path (minimum params)', () => {
            return lp.update({ title: 'bar' });
        });
        it('can update a learning path (all params)', () => {
            return lp.update({ title: 'bar', summary: 'baz', category: 'foo', pageIds: [ 1, 2, 3 ] }, '201703021200');
        });
        it('can fail updating a learning path (no params)', () => {
            const failed = jest.fn();
            return lp.update().catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fail updating a learning path (no title)', () => {
            const failed = jest.fn();
            return lp.update({ summary: 'foo' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fail updating a learning path (invalid summary)', () => {
            const failed = jest.fn();
            return lp.update({ title: 'path', summary: 132 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fail updating a learning path (invalid category)', () => {
            const failed = jest.fn();
            return lp.update({ title: 'path', category: 132 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fail updating a learning path (invalid page IDs)', () => {
            const failed = jest.fn();
            return lp.update({ title: 'path', pageIds: 132 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can remove a learning path', () => {
            return lp.remove();
        });
        it('can clone a learning path', () => {
            return lp.clone('bar');
        });
        it('can fail while cloning a learning path', () => {
            const failed = jest.fn();
            return lp.clone().catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can revert a learning path to a specific revision', () => {
            return lp.revertToRevision(1);
        });
        it('can revert a learning path to a specific revision (edit time included)', () => {
            return lp.revertToRevision(1, '201703021200');
        });
        it('can fail while trying to revert to a revision with no revision specified', () => {
            const failed = jest.fn();
            return lp.revertToRevision().catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
        it('can add a page to a learning path', () => {
            return lp.addPage(123, '20160225000833');
        });
        it('can add a page to a learning path (no edit time)', () => {
            return lp.addPage(123);
        });
        it('can remove a page from a learning path', () => {
            return lp.removePage(123, '20160225000833');
        });
        it('can remove a page from a learning path (no edit time)', () => {
            return lp.removePage(123);
        });
        it('can reorder a page in a learning path', () => {
            return lp.reorderPage(123, 124, '20160225000833');
        });
        it('can reorder a page in a learning path (no edit time)', () => {
            return lp.reorderPage(123, 124);
        });
        it('can reorder a page in a learning path (page ID only)', () => {
            return lp.reorderPage(123);
        });
    });
});
