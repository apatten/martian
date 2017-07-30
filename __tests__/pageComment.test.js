/* eslint-env jasmine, jest */
jest.unmock('../pageComment.js');
import { PageCommentManager, PageComment } from '../pageComment.js';

describe('Page Comment tests', () => {
    describe('PageCommentManager class', () => {
        describe('construction', () => {
            it('can create a new PageCommentManager', () => {
                const pcm = new PageCommentManager(123);
                expect(pcm).toBeDefined();
            });
        });
        describe('operations', () => {
            let pcm = null;
            beforeEach(() => {
                pcm = new PageCommentManager();
            });
            afterEach(() => {
                pcm = null;
            });
            it('can create a new page comment', () => {
                return pcm.addComment('foo');
            });
            it('can fail if no comment is supplied when creating a new comment', () => {
                const failed = jest.fn();
                return pcm.addComment().catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
    });
    describe('PageComment class', () => {
        describe('constructor', () => {
            it('can construct a PageComment', () => {
                const pc = new PageComment(123, 1);
                expect(pc).toBeDefined();
                expect(() => new PageComment()).toThrow();
            });
        });
        describe('operations', () => {
            let pc = null;
            beforeEach(() => {
                pc = new PageComment(123, 123);
            });
            afterEach(() => {
                pc = null;
            });
            it('can update a page comment', () => {
                return pc.update();
            });
            it('can delete a page comment', () => {
                return pc.delete();
            });
        });
    });
});
