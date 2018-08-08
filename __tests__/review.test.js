/* eslint-env jasmine, jest */
jest.unmock('../review.js');
import { Review } from '../review.js';

function defaultAttributes(attributes = {}) {
    return Object.assign({}, {
        pageId: 23,
        reviewerId: 2,
        reviewerType: 'User'
    }, attributes);
}

describe('Review', () => {
    describe('list', () => {
        const review = new Review();
        it('requires a page id', async() => {
            const reviews = await review.list(defaultAttributes().pageId);
            console.log({ reviews });
            expect(reviews.length).toBe(0);
        });
    });
    describe('create', () => {
        const review = new Review();
        it('requires a page id', () => {
            const attr = defaultAttributes();
            delete attr.pageId;
            expect(review.create(attr)).rejects.toContain('pageId is not defined');
        });
        it('requires a reviewer id', () => {
            const attr = defaultAttributes();
            delete attr.reviewerId;
            expect(review.create(attr)).rejects.toContain('reviewerId is not defined');
        });
        it('requires a reviewer type', () => {
            const attr = defaultAttributes();
            delete attr.reviewerType;
            expect(review.create(attr)).rejects.toContain('reviewerType is not defined');
        });
    });
    describe('update', () => {
        const review = new Review();
        it('requires a review id', () => {
            expect(review.update(defaultAttributes())).rejects.toContain('reviewId is not defined');
        });
        it('requires a reviewer id', () => {
            const attr = defaultAttributes();
            delete attr.reviewerId;
            expect(review.create(attr)).rejects.toContain('reviewerId is not defined');
        });
        it('requires a reviewer type', () => {
            const attr = defaultAttributes();
            delete attr.reviewerType;
            expect(review.create(attr)).rejects.toContain('reviewerType is not defined');
        });
    });
});
