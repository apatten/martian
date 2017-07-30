/* eslint-env jasmine, jest */
jest.unmock('../siteReports.js');
import { SiteReports } from '../siteReports.js';

describe('Site Reports', () => {
    describe('constructor', () => {
        it('can create a new SiteReports object', () => {
            const sr = new SiteReports();
            expect(sr).toBeDefined();
        });
    });
    describe('operations', () => {
        let sr;
        beforeEach(() => {
            sr = new SiteReports();
        });
        it('can get the site health report (no params)', () => {
            return sr.getSiteHealth();
        });
        it('can get the site health report (all params)', () => {
            return sr.getSiteHealth({ analyzers: [ 'foo' ], severities: [ 'error' ] });
        });
        it('can fail with an invalid `analyzers` parameter', () => {
            const success = jest.fn();
            return sr.getSiteHealth({ analyzers: 'foo' }).then(() => {
                success();
                throw new Error('The promise was resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail with an invalid `severities` parameter', () => {
            const success = jest.fn();
            return sr.getSiteHealth({ severities: 'foo' }).then(() => {
                success();
                throw new Error('The promise was resolved');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
});
