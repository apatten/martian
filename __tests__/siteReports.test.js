import fetch from 'jest-fetch-mock';
import { SiteReports } from '../siteReports.js';
global.fetch = fetch;

describe('Site Reports', () => {
    describe('constructor', () => {
        it('can create a new SiteReports object', () => {
            expect.assertions(1);
            const sr = new SiteReports();
            expect(sr).toBeDefined();
        });
    });
    describe('operations', () => {
        let sr = null;
        beforeEach(() => {
            fetch.once('{}');
            sr = new SiteReports();
        });
        afterEach(() => {
            fetch.resetMocks();
            sr = null;
        });
        it('can get the site health report (no params)', async () => {
            expect.assertions(1);
            await expect(sr.getSiteHealth()).resolves.toEqual({ inspections: [] });
        });
        it('can get the site health report (all params)', async () => {
            expect.assertions(1);
            await expect(sr.getSiteHealth({ analyzers: ['foo'], severities: ['error'] })).resolves.toEqual({
                inspections: []
            });
        });
        it('can fail with an invalid `analyzers` parameter', async () => {
            expect.assertions(1);
            await expect(sr.getSiteHealth({ analyzers: 'foo' })).rejects.toEqual(
                new Error('The `analyzers` option must be an array of analyzers')
            );
        });
        it('can fail with an invalid `severities` parameter', async () => {
            expect.assertions(1);
            await expect(sr.getSiteHealth({ severities: 'foo' })).rejects.toEqual(
                new Error('The `severities` option must be an array of severity levels')
            );
        });
    });
    describe('failures', () => {
        it('can get through virtual page checking when there is another failure (no responseText)', async () => {
            fetch.mockRejectOnce({ message: 'Bad Request', status: 400, responseText: '{}' });
            const sr = new SiteReports();
            await expect(sr.getSiteHealth()).rejects.toEqual({
                info: { arguments: [] },
                message: 'Bad Request',
                status: 400
            });
            fetch.resetMocks();
        });
    });
});
