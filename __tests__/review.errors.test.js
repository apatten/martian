/* eslint-env jasmine, jest */
jest.unmock('../review.js');
import { Review } from '../review.js';

const mockFailed = 'MOCK FAILED';
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        post: () => Promise.reject(mockFailed)
    })
);

function defaultAttributes(attributes = {}) {
    return Object.assign({}, {
        pageId: 23,
        reviewerId: 2,
        reviewerType: 'User'
    }, attributes);
}

describe('Review', () => {
    it('create can handle failed post request', async () => {
        const review = new Review();
        return await expect(review.create(defaultAttributes())).rejects.toEqual(mockFailed);
    });
});
