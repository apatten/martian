/* eslint-env jasmine, jest */
jest.unmock('../siteJob.model.js');
jest.unmock('../../lib/modelParser.js');
import { siteJobsModel } from '../siteJob.model.js';
import { modelParser } from '../../lib/modelParser.js';

describe('Site Jobs model parsing', () => {
    it('can parse if the response is an empty string', () => {
        const parser = modelParser.createParser(siteJobsModel);
        const parsed = parser('');
        expect(Array.isArray(parsed.jobs)).toBe(true);
        expect(parsed.jobs.length).toBe(0);
    });
});
