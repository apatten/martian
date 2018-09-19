import fetch from 'jest-fetch-mock';
import { PageSecurity } from '../pageSecurity';
global.fetch = fetch;

describe('Page Security', () => {
    let ps;
    beforeEach(() => {
        ps = new PageSecurity(123);
    });
    afterEach(() => {
        ps = null;
    });
    describe('constructor', () => {
        it('can create a new PageSecurity', () => {
            const sec = new PageSecurity();
            expect(sec instanceof PageSecurity).toBe(true);
            const sec2 = new PageSecurity(123);
            expect(sec2 instanceof PageSecurity).toBe(true);
        });
    });
    describe('operations', () => {
        const emptyResponse = { grants: [] };
        beforeEach(() => {
            fetch.once('{}');
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fetch the security info', async () => {
            expect.assertions(1);
            await expect(ps.get()).resolves.toEqual(emptyResponse);
        });
        it('can reset the security info', async () => {
            expect.assertions(1);
            await expect(ps.reset()).resolves.toBeInstanceOf(global.Response);
        });
        it('can set the security info (minimum parameters)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public' })).resolves.toEqual(emptyResponse);
        });
        it('can set the security info (all parameters)', async () => {
            expect.assertions(1);
            await expect(
                ps.set({
                    cascade: 'delta',
                    pageRestriction: 'Private',
                    grants: [
                        { user: 1, role: 'Manager' },
                        { user: 'editor', role: 'Contributor' },
                        { group: 5, role: 'Viewer' },
                        { group: 'foo', role: 'None' }
                    ]
                })
            ).resolves.toEqual(emptyResponse);
        });
        it('missing pageRestriction', async () => {
            expect.assertions(1);
            await expect(ps.set()).rejects.toEqual(
                new Error('The pageRestriction parameter must be provided and must be a string.')
            );
        });
        it('invalid pageRestriction', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 13 })).rejects.toEqual(
                new Error('The pageRestriction parameter must be provided and must be a string.')
            );
        });
        it('invalid grants (bad type)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: {} })).rejects.toEqual(
                new Error('The specified grants must be an array')
            );
        });
        it('invalid grants (user and group defined)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: [{ user: 1, group: 2 }] })).rejects.toEqual(
                new Error('The grant must only define a single user or group, but not both.')
            );
        });
        it('invalid grants (no user or group defined)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: [{ role: 'foo' }] })).rejects.toEqual(
                new Error('The grant must only define a single user or group, but not both.')
            );
        });
        it('invalid grants (invalid user)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: [{ user: true }] })).rejects.toEqual(
                new Error('The grant user parameter must be a numeric ID or an username')
            );
        });
        it('invalid grants (invalid group)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: [{ group: [] }] })).rejects.toEqual(
                new Error('The grant group parameter must be a numeric ID or an username')
            );
        });
        it('invalid grants (invalid role)', async () => {
            expect.assertions(1);
            await expect(ps.set({ pageRestriction: 'Public', grants: [{ user: 'foo', role: 123 }] })).rejects.toEqual(
                new Error('The grant role must be defined and must be a string.')
            );
        });
        it('can update security info (no params)', async () => {
            expect.assertions(1);
            await expect(ps.update()).resolves.toEqual(emptyResponse);
        });
        it('can update security info (all params)', async () => {
            expect.assertions(1);
            await expect(
                ps.update({
                    cascade: 'delta',
                    pageRestriction: 'Private',
                    grantsAdded: [{ user: 1, role: 'Manager' }],
                    grantsRemoved: [{ group: 'foo', role: 'Contributor' }]
                })
            ).resolves.toEqual(emptyResponse);
        });
        it('invalid grantsAdded', async () => {
            expect.assertions(1);
            await expect(ps.update({ grantsAdded: 'foo' })).rejects.toEqual(
                new Error('The specified grants must be an array')
            );
        });
        it('invalid grantsRemoved', async () => {
            expect.assertions(1);
            await expect(ps.update({ grantsRemoved: {} })).rejects.toEqual(
                new Error('The specified grants must be an array')
            );
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('pageSecurity API failure');
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fail getting the pages security info', async () => {
            expect.assertions(1);
            return await expect(ps.get()).rejects.toEqual(mockFailed);
        });
        it('can fail resetting the pages security info', async () => {
            expect.assertions(1);
            return await expect(ps.reset()).rejects.toEqual(mockFailed);
        });
        it('can fail setting the pages security info', async () => {
            expect.assertions(1);
            return await expect(ps.set({ pageRestriction: 'Public' })).rejects.toEqual(mockFailed);
        });
        it('can fail updating the pages security info', async () => {
            expect.assertions(1);
            return await expect(ps.update()).rejects.toEqual(mockFailed);
        });
    });
});
