/* eslint-env jasmine, jest */
jest.unmock('../pageContents.model.js');
import { pageContentsModel } from '../pageContents.model.js';

describe('Page Contents Model', () => {
    it('returns the parsed "body" array', () => {
        let mockData = {
            body: [
                'body content',
                {
                    '@target': 'target',
                    '#text': 'target content'
                }
            ]
        };
        let results = [];
        pageContentsModel.forEach((propertyModel) => {
            if(typeof propertyModel.transform === 'function') {
                results.push(propertyModel.transform(mockData.body));
            }
        });
        expect(results).toEqual([
            'body content',
            [ { target: 'target content' } ]
        ]);
    });
});
