import fetch from 'jest-fetch-mock';
import { ContextIdManager, ContextDefinition, ContextMap } from '../contextId.js';
global.fetch = fetch;

describe('Context ID', () => {
    describe('ContextIdManager', () => {
        let cm = null;
        beforeEach(() => {
            fetch.once('{}');
            cm = new ContextIdManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            cm = null;
        });
        it('can fetch all context maps', async () => {
            expect.assertions(1);
            await expect(cm.getMaps()).resolves.toEqual({ contextMaps: [], languages: [] });
        });
        it('can add a context ID definition', async () => {
            expect.assertions(1);
            await expect(cm.addDefinition('foo')).resolves.toEqual({});
        });
        it('can add a context ID definition with a description', async () => {
            expect.assertions(1);
            await expect(cm.addDefinition('foo', 'Foo description')).resolves.toEqual({});
        });
        it('can fail if an ID is not supplied when trying to add a definition', async () => {
            expect.assertions(1);
            await expect(cm.addDefinition()).rejects.toEqual(new Error('an ID must be supplied to add a definition'));
        });
        it('can get a content ID Definition by id', () => {
            expect.assertions(1);
            return expect(cm.getDefinition('foo')).toBeInstanceOf(ContextDefinition);
        });
        it('can get a content ID Map by language/id', () => {
            expect.assertions(1);
            expect(cm.getMap('en-us', 'foo')).toBeInstanceOf(ContextMap);
        });
    });
    describe('Manager getDefinitions()', () => {
        let cm = null;
        beforeEach(() => {
            cm = new ContextIdManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            cm = null;
        });
        it('can fetch the list of all context definitions', async () => {
            fetch.once('{}');
            expect.assertions(1);
            await expect(cm.getDefinitions()).resolves.toEqual({ contextIds: [] });
        });
        it('can fetch the list of all context definitions (empty response)', async () => {
            fetch.once(JSON.stringify(''));
            expect.assertions(1);
            await expect(cm.getDefinitions()).resolves.toEqual({ contextIds: [] });
        });
    });
    describe('Manager errors', () => {
        const mockFailed = new Error('failed');
        let cm = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            cm = new ContextIdManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            cm = null;
        });
        it('can fail fetching all context maps', async () => {
            expect.assertions(1);
            await expect(cm.getMaps()).rejects.toEqual(mockFailed);
        });
        it('can fail fetching the list of all context definitions', async () => {
            expect.assertions(1);
            await expect(cm.getDefinitions()).rejects.toEqual(mockFailed);
        });
        it('can fail adding a context ID definition', async () => {
            expect.assertions(1);
            await expect(cm.addDefinition(123)).rejects.toEqual({ message: 'failed' });
        });
    });
    describe('definition constructor', () => {
        it('can create a new ContextDefinition', () => {
            expect.assertions(3);
            expect(() => new ContextDefinition()).toThrow();
            let c = new ContextDefinition('foo');
            expect(c).toBeDefined();
            expect(() => ContextDefinition()).toThrow();
        });
    });
    describe('definition instance functions', () => {
        let def = null;
        beforeEach(() => {
            fetch.once('{}');
            def = new ContextDefinition('foo');
        });
        afterEach(() => {
            fetch.resetMocks();
            def = null;
        });
        it('can get the definition info', async () => {
            expect.assertions(1);
            await expect(def.getInfo()).resolves.toEqual({});
        });
        it('can update the description of a definition', async () => {
            expect.assertions(1);
            await expect(def.updateDescription('New Description')).resolves.toEqual({});
        });
        it('can implicitly clear the description of a definition', async () => {
            expect.assertions(1);
            await expect(def.updateDescription()).resolves.toEqual({});
        });
        it('can delete a definition', async () => {
            expect.assertions(1);
            await expect(def.delete()).resolves.toBeInstanceOf(global.Response);
        });
    });
    describe('definition instance errors', () => {
        const mockFailed = new Error('failed');
        let def = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            def = new ContextDefinition('foo');
        });
        afterEach(() => {
            fetch.resetMocks();
            def = null;
        });
        it('can fail getting the definition info', async () => {
            expect.assertions(1);
            await expect(def.getInfo()).rejects.toEqual(mockFailed);
        });
        it('can fail updating the description of a definition', async () => {
            expect.assertions(1);
            await expect(def.updateDescription()).rejects.toEqual(mockFailed);
        });
        it('can fail deleting a definition', async () => {
            expect.assertions(1);
            await expect(def.delete()).rejects.toEqual(mockFailed);
        });
    });
    describe('Context Map constructor', () => {
        it('can construct a new Context Map', () => {
            expect.assertions(3);
            expect(() => new ContextMap()).toThrow();
            expect(() => new ContextMap('foo')).toThrow();
            let cm = new ContextMap('en-us', 'foo');
            expect(cm).toBeDefined();
        });
    });
    describe('ContextMap instance functions', () => {
        let map = null;
        beforeEach(() => {
            fetch.once('{}');
            map = new ContextMap('en-us', 'foo');
        });
        afterEach(() => {
            fetch.resetMocks();
            map = null;
        });
        it('can get the info of a map', async () => {
            expect.assertions(1);
            await expect(map.getInfo()).resolves.toEqual({});
        });
        it('can update an existing map', async () => {
            expect.assertions(1);
            await expect(map.update(123)).resolves.toEqual({});
        });
        it('can fail if an ID is not supplied when updating a map', async () => {
            expect.assertions(1);
            await expect(map.update()).rejects.toEqual(
                new Error('a page ID must be supplied in order to update a mapping')
            );
        });
        it('can clear a mapping', async () => {
            expect.assertions(1);
            await expect(map.remove()).resolves.toBeInstanceOf(global.Response);
        });
    });
    describe('ContextMap instance errors', () => {
        const mockFailed = new Error('failed');
        let map = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            map = new ContextMap('en-us', 'foo');
        });
        afterEach(() => {
            fetch.resetMocks();
            map = null;
        });
        it('can fail getting the info of a map', async () => {
            expect.assertions(1);
            await expect(map.getInfo()).rejects.toEqual(mockFailed);
        });
        it('can fail updating an existing map', async () => {
            expect.assertions(1);
            await expect(map.update(123)).rejects.toEqual(mockFailed);
        });
        it('can failing clearing a mapping', async () => {
            expect.assertions(1);
            await expect(map.remove()).rejects.toEqual(mockFailed);
        });
    });
});
