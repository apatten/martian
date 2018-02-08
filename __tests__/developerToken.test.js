/* eslint-env jasmine, jest */
jest.unmock('../developerToken.js');
import { DeveloperTokenManager, DeveloperToken } from '../developerToken.js';

describe('Developer Tokens', () => {
    describe('DeveloperTokenManager', () => {
        describe('constructor', () => {
            it('can construct a new DeveloperTokenManager', () => {
                const dtm = new DeveloperTokenManager();
                expect(dtm).toBeDefined();
            });
        });
        describe('operations', () => {
            let dtm = null;
            beforeEach(() => {
                dtm = new DeveloperTokenManager();
            });
            it('can fetch the site developer tokens', () => {
                return dtm.getTokens();
            });
            it('can add a new "browser" developer token', () => {
                return dtm.addToken({ name: 'My New Token', host: 'www.example.com' });
            });
            it('can add a new "server" developer token', () => {
                return dtm.addToken({ name: 'My New Token' });
            });
            it('can fail if the name is not supplied when adding a new token', () => {
                const failed = jest.fn();
                return dtm
                    .addToken()
                    .catch(failed)
                    .then(() => expect(failed).toHaveBeenCalled());
            });
        });
    });
    describe('DeveloperToken', () => {
        describe('constructor', () => {
            it('can construct a new DeveloperToken instance', () => {
                const dt = new DeveloperToken(666);
                expect(dt).toBeDefined();
            });
            it('can fail if the ID of the token is not supplied', () => {
                expect(() => {
                    const dt = new DeveloperToken(); // eslint-disable-line no-unused-vars
                }).toThrow('The id must be supplied to create a new DeveloperToken instance');
            });
        });
        describe('operations', () => {
            let dt;
            beforeEach(() => {
                dt = new DeveloperToken(10);
            });
            it('can delete a token', () => {
                return dt.delete();
            });
        });
    });
});
