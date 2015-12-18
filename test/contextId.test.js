import {ContextDefinition, ContextMap} from 'contextId';
describe('Context ID', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });
    afterEach(() => {
        jasmine.Ajax.uninstall();
    });
    describe('static functionality', () => {
        let idsUri = '/@api/deki/contexts?';
        it('can fetch the list of all definitions', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(idsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextIdDefinitions });
            ContextDefinition.getDefinitions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the list of all definitions (single)', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(idsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextIdDefinitionsSingle });
            ContextDefinition.getDefinitions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the list of all definitions (empty)', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(idsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextIdDefinitionsEmpty });
            ContextDefinition.getDefinitions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can add a context ID definition', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(idsUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.contextIdDefinitionsSingle });
            ContextDefinition.addDefinition('foo').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can add a context ID definition with a description', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(idsUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.contextIdDefinitionsSingle });
            ContextDefinition.addDefinition('foo', 'Foo description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail if an ID is not supplied when trying to add a definition', (done) => {
            ContextDefinition.addDefinition().catch((e) => {
                expect(e.message).toBe('an ID must be supplied to add a definintion');
                done();
            });
        });
    });
    describe('definition constructor', () => {
        it('can create a new ContextDefinition', () => {
            expect(() => new ContextDefinition()).toThrow();
            let c = new ContextDefinition('foo');
            expect(c).toBeDefined();
            expect(() => ContextDefinition()).toThrow();
        });
    });
    describe('definition instance functions', () => {
        let def = null;
        beforeEach(() => {
            def = new ContextDefinition('foo');
        });
        afterEach(() => {
            def = null;
        });
        let defUri = '/@api/deki/contexts/foo?';
        it('can get the definition info', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(defUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextIdDefinition });
            def.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can update the description of a definintion', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(defUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.contextIdDefinition });
            def.updateDescription('New Description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can implicitly clear the description of a definintion', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(defUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.contextIdDefinition });
            def.updateDescription().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can delete a definition', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(defUri), null, 'POST').andReturn({ status: 200 });
            def.delete().then(() => {
                done();
            });
        });
    });
    describe('context map static functionality', () => {
        let mapsUri = '/@api/deki/contextmaps?';
        it('can fetch all context maps', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextMaps });
            ContextMap.getMaps().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch all context maps (single language)', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextMapsSingleLanguage });
            ContextMap.getMaps().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('Context Map constructor', () => {
        it('can construct a new Context Map', () => {
            expect(() => ContextMap()).toThrow();
            expect(() => new ContextMap()).toThrow();
            expect(() => new ContextMap('foo')).toThrow();
            let cm = new ContextMap('en-us', 'foo');
            expect(cm).toBeDefined();
        });
    });
    describe('ContextMap instance functions', () => {
        let mapUri = '/@api/deki/contextmaps/en-us/foo?';
        let map = null;
        beforeEach(() => {
            map = new ContextMap('en-us', 'foo');
        });
        afterEach(() => {
            map = null;
        });
        it('can get the info of a map', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextMap });
            map.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the verbose info of a map', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.contextMapVerbose });
            map.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can update an existing map', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.contextMapVerbose });
            map.update(123).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail if an ID is not supplied when updating a map', (done) => {
            map.update().catch((e) => {
                expect(e.message).toBe('a page ID must be supplied in order to update a mapping');
                done();
            });
        });
        it('can clear a mapping', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(mapUri), null, 'POST').andReturn({ status: 200 });
            map.remove().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
