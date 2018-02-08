/* eslint-env jasmine, jest */
jest.unmock('../license.js');
import { License } from '../license.js';

describe('License', () => {
    let license = null;
    beforeEach(() => {
        license = new License();
    });
    afterEach(() => {
        license = null;
    });
    it('can fetch the usage (no parameters)', () => {
        return license.getUsage();
    });
    it('can fetch the usage (all parameters)', () => {
        return license.getUsage({
            since: new Date(2015, 12, 31, 12, 12, 0),
            upTo: new Date(Date.now()),
            version: 2
        });
    });
    it('can fail if an invalid `since` value is sent', () => {
        const success = jest.fn();
        return license
            .getUsage({ since: '20151231121200' })
            .then(() => {
                success();
                throw new Error('Promise was resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can fail if an invalid `upTo` value is sent', () => {
        const success = jest.fn();
        return license
            .getUsage({ upTo: 20151231121200 })
            .then(() => {
                success();
                throw new Error('Promise was resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
    it('can fetch the usage logs', () => {
        return license.getUsageLogs();
    });
    it('can fetch the URL for a usage log', () => {
        return license.getUsageLogUrl('foo');
    });
    it('can fail if no name is supplied to fetch a log URL.', () => {
        const success = jest.fn();
        return license
            .getUsageLogUrl()
            .then(() => {
                success();
                throw new Error('Promise was resolved.');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
});
