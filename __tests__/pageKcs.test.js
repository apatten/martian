import fetch from 'jest-fetch-mock';
import { PageKcs } from '../pageKcs.js';
global.fetch = fetch;

describe('PageKcs', () => {
    let kcs;
    beforeEach(() => {
        kcs = new PageKcs(317);
    });
    afterEach(() => {
        kcs = null;
    });
    describe('operations', () => {
        beforeEach(() => {
            fetch.once('{}');
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can get state', async () => {
            expect.assertions(1);
            await expect(kcs.getState()).resolves.toEqual({});
        });
        it('requires a state to set state', () => {
            expect.assertions(1);
            return expect(kcs.setState({})).rejects.toEqual('A state must be specified for request.');
        });
        it('can set state', async () => {
            expect.assertions(1);
            await expect(kcs.setState({ confidence: 'wip', visibility: 'internal' })).resolves.toBeInstanceOf(
                global.Response
            );
        });
        it('can get transitions', async () => {
            expect.assertions(1);
            await expect(kcs.getValidTransitions()).resolves.toEqual({});
        });
        it('can initialize state', async () => {
            expect.assertions(1);
            await expect(kcs.initialize()).resolves.toBeInstanceOf(global.Response);
        });
        it('can set flag state', async () => {
            expect.assertions(1);
            await expect(kcs.setFlag({ state: true, details: 'Terrible' })).resolves.toBeInstanceOf(global.Response);
        });
        it('requires a state to set flag state', () => {
            expect.assertions(1);
            return expect(kcs.setFlag({})).rejects.toEqual('A flagged state must be specified for request.');
        });
        it('requires a state to set flag state', () => {
            expect.assertions(1);
            return expect(kcs.setFlag({ state: true })).rejects.toEqual(
                'Details must be specified for request when the flagged state is set to true.'
            );
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('pageKcs API failure');
        const parsedFailure = { message: 'pageKcs API failure' };
        beforeEach(() => {
            fetch.mockReject(mockFailed);
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fail getting kcs state', async () => {
            expect.assertions(1);
            await expect(kcs.getState()).rejects.toEqual(parsedFailure);
        });
        it('can fail setting a kcs state', async () => {
            expect.assertions(1);
            await expect(kcs.setState()).rejects.toEqual(parsedFailure);
        });
        it('can fail getting kcs valid transitions', async () => {
            expect.assertions(1);
            await expect(kcs.getValidTransitions()).rejects.toEqual(parsedFailure);
        });
        it('can fail initializing a kcs state', async () => {
            expect.assertions(1);
            await expect(kcs.initialize()).rejects.toEqual(parsedFailure);
        });
        it('can fail setting a kcs flag state', async () => {
            expect.assertions(1);
            await expect(kcs.setFlag({ state: false }, 'flagDetail')).rejects.toEqual(parsedFailure);
        });
    });
});
