import fetch from 'jest-fetch-mock';
import { PageProperty } from '../pageProperty.js';
global.fetch = fetch;

describe('Page Property API', () => {
    describe('constructor tests', () => {
        it('can construct a PageProperty object for the home page implicitly', () => {
            expect.assertions(1);
            const p = new PageProperty();
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object for the home page explicitly', () => {
            expect.assertions(1);
            const p = new PageProperty('home');
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object by page ID', () => {
            expect.assertions(1);
            const p = new PageProperty(123);
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object by page path', () => {
            expect.assertions(1);
            const p = new PageProperty('foo/bar');
            expect(p).toBeDefined();
        });
        it('can fail if the constructor is not called correctly', () => {
            expect.assertions(1);
            expect(() => PageProperty()).toThrow();
        });
    });
    describe('operations', () => {
        const emptyListResponse = { properties: [] };
        let prop = null;
        beforeEach(() => {
            fetch.once('{}');
            prop = new PageProperty(123);
        });
        afterEach(() => {
            fetch.resetMocks();
            prop = null;
        });
        it('can fetch the properties from a page', async () => {
            expect.assertions(1);
            await expect(prop.getProperties()).resolves.toEqual(emptyListResponse);
        });
        it('can filter properties by supplying a list of names', async () => {
            expect.assertions(1);
            await expect(prop.getProperties(['property1', 'property2'])).resolves.toEqual(emptyListResponse);
        });
        it('can can fail gracefully if supplying an invalid name filter', async () => {
            expect.assertions(1);
            await expect(prop.getProperties('property1')).rejects.toEqual(
                new Error('The property names must be an array')
            );
        });
        it('can fetch a single property', async () => {
            expect.assertions(1);
            await expect(prop.getProperty('mindtouch.import#info')).resolves.toEqual({});
        });
        it('can fail gracefully if a key is not supplied when fetching a single property', async () => {
            expect.assertions(1);
            await expect(prop.getProperty()).rejects.toEqual(
                new Error('Attempting to fetch a page property without providing a property key')
            );
        });
        it('can fetch properties from children of the root page', async () => {
            expect.assertions(1);
            await expect(prop.getPropertyForChildren('property1')).resolves.toEqual({});
        });
        it('can fetch properties from children of the root page, and with a supplied depth', async () => {
            expect.assertions(1);
            await expect(prop.getPropertyForChildren('property1', 2)).resolves.toEqual({});
        });
        it('can fail gracefully if a key is not supplied when fetching children properties', async () => {
            expect.assertions(1);
            await expect(prop.getPropertyForChildren()).rejects.toEqual(
                new Error('Attempting to fetch properties for children without providing a property key')
            );
        });
        it('can fetch the contents of a single property', async () => {
            expect.assertions(1);
            await expect(prop.getPropertyContents('property1')).resolves.toBeInstanceOf(global.Response);
        });
        it('can fail gracefully if a key is not supplied when fetching the contents of a property', async () => {
            expect.assertions(1);
            await expect(prop.getPropertyContents()).rejects.toEqual(
                new Error('Attempting to fetch a page property contents without providing a property key')
            );
        });
        it('can fail gracefully if a key is not provided when setting a page property', async () => {
            expect.assertions(1);
            await expect(prop.setProperty()).rejects.toEqual(
                new Error('Attempting to set a property without providing a property key')
            );
        });
        it('can fail gracefully if the value text is not provided when setting a page property', async () => {
            expect.assertions(1);
            await expect(prop.setProperty('property1')).rejects.toEqual(
                new Error('Attempting to set a property without providing a property value')
            );
        });
        it('can set a page property', async () => {
            expect.assertions(1);
            await expect(
                prop.setProperty('property1', { text: 'property text', type: 'text/plain' })
            ).resolves.toBeInstanceOf(global.Response);
        });
        it('can set a page property using the default mime type', async () => {
            expect.assertions(1);
            await expect(prop.setProperty('property1', { text: 'property text' })).resolves.toBeInstanceOf(
                global.Response
            );
        });
        it('can fail gracefully if a key is not provided when deleting a page property', async () => {
            expect.assertions(1);
            await expect(prop.deleteProperty()).rejects.toEqual(
                new Error('Attempting to delete a property without providing a property key')
            );
        });
        it('can delete a page property', async () => {
            expect.assertions(1);
            await expect(prop.deleteProperty('property1')).resolves.toBeInstanceOf(global.Response);
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('pageProperty API failure');
        let page = null;
        beforeEach(() => {
            fetch.mockReject(mockFailed);
            page = new PageProperty();
        });
        afterEach(() => {
            fetch.resetMocks();
            page = null;
        });
        it('can fail getting listing of page properties for a hierarchy of pages', async () => {
            expect.assertions(1);
            await expect(page.getPropertyForChildren(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting listing of page properties for a hierarchy of pages', async () => {
            expect.assertions(1);
            await expect(page.getProperties(['propName'])).rejects.toEqual(mockFailed);
        });
        it('can fail getting listing of page property contents', async () => {
            expect.assertions(1);
            await expect(page.getPropertyContents(123)).rejects.toEqual(mockFailed);
        });
        it('can fail getting single page property', async () => {
            expect.assertions(1);
            await expect(page.getProperty(123)).rejects.toEqual(mockFailed);
        });
        it('can fail setting page property on the page', async () => {
            expect.assertions(1);
            await expect(page.setProperty('property1', { text: 'property text', type: 'text/plain' })).rejects.toEqual(
                mockFailed
            );
        });
        it('can fail deleting page property on the page', async () => {
            expect.assertions(1);
            await expect(page.deleteProperty(123)).rejects.toEqual(mockFailed);
        });
    });
});
