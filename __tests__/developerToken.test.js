import fetch from 'jest-fetch-mock';
import { DeveloperTokenManager, DeveloperToken } from '../developerToken.js';
global.fetch = fetch;

describe('Developer Tokens', () => {
    describe('DeveloperTokenManager', () => {
        describe('constructor', () => {
            it('can construct a new DeveloperTokenManager', () => {
                const dtm = new DeveloperTokenManager();
                expect.assertions(1);
                expect(dtm).toBeDefined();
            });
        });
        describe('operations', () => {
            let dtm = null;
            beforeEach(() => {
                fetch.once('{}');
                dtm = new DeveloperTokenManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                dtm = null;
            });
            it('can fetch the site developer tokens', async () => {
                expect.assertions(1);
                await expect(dtm.getTokens()).resolves.toEqual({ developerTokens: [] });
            });
            it('can add a new "browser" developer token', async () => {
                expect.assertions(1);
                await expect(dtm.addToken({ name: 'My New Token', host: 'www.example.com' })).resolves.toEqual({});
            });
            it('can add a new "server" developer token', async () => {
                expect.assertions(1);
                await expect(dtm.addToken({ name: 'My New Token' })).resolves.toEqual({});
            });
            it('can fail if the name is not supplied when adding a new token', async () => {
                expect.assertions(1);
                await expect(dtm.addToken()).rejects.toEqual(
                    new Error('The name must be supplied when adding a new developer token')
                );
            });
        });
    });
    describe('DeveloperToken', () => {
        let dt = null;
        beforeEach(() => {
            fetch.once('{}');
        });
        afterEach(() => {
            fetch.resetMocks();
            dt = null;
        });
        describe('constructor', () => {
            it('can construct a new DeveloperToken instance', () => {
                dt = new DeveloperToken(666);
                expect.assertions(1);
                expect(dt).toBeDefined();
            });
            it('can fail if the ID of the token is not supplied', () => {
                expect.assertions(1);
                expect(() => {
                    dt = new DeveloperToken();
                }).toThrow('The id must be supplied to create a new DeveloperToken instance');
            });
        });
        describe('operations', () => {
            beforeEach(() => {
                dt = new DeveloperToken(10);
            });
            it('can delete a token', async () => {
                expect.assertions(1);
                await expect(dt.delete()).resolves.toBeInstanceOf(global.Response);
            });
        });
    });
    describe('Developer Token Errors', () => {
        afterEach(() => {
            fetch.resetMocks();
        });
        describe('manager', () => {
            it('can fail if the delete operation is rejected', async () => {
                expect.assertions(1);
                fetch.mockReject({ responseText: '{}' });
                const dt = new DeveloperToken(11);
                expect.assertions(1);
                await expect(dt.delete()).rejects.toEqual({ info: { arguments: [] } });
            });
        });
        describe('instance', () => {
            it('can fail if the add operation is rejected', async () => {
                expect.assertions(1);
                fetch.mockReject({ responseText: '{}' });
                const dtm = new DeveloperTokenManager();
                await expect(dtm.addToken({ name: 'My New Token', host: 'www.example.com' })).rejects.toEqual({
                    info: { arguments: [] }
                });
            });
            it('can fail if the get operation is rejected', async () => {
                expect.assertions(1);
                fetch.mockReject('failed');
                const dtm = new DeveloperTokenManager();
                await expect(dtm.getTokens()).rejects.toEqual('failed');
            });
        });
    });
});
