/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Plug } from 'lib/plug';
import { contextIdsModel } from 'models/contextIds.model';
import { contextIdModel } from 'models/contextId.model';
import { contextMapsModel } from 'models/contextMaps.model';
import { contextMapModel } from 'models/contextMap.model';
import { ContextIdManager, ContextDefinition, ContextMap } from 'contextId';
describe('Context ID', () => {
    describe('Manager', () => {
        let cm = null;
        beforeEach(() => {
            cm = new ContextIdManager();
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve({}));
            spyOn(contextIdModel, 'parse').and.returnValue({});
        });
        afterEach(() => {
            cm = null;
        });
        it('can fetch the list of all definitions', (done) => {
            spyOn(contextIdsModel, 'parse').and.returnValue({});
            cm.getDefinitions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch all context maps', (done) => {
            spyOn(contextMapsModel, 'parse').and.returnValue({});
            cm.getMaps().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can add a context ID definition', (done) => {
            cm.addDefinition('foo').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can add a context ID definition with a description', (done) => {
            cm.addDefinition('foo', 'Foo description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail if an ID is not supplied when trying to add a definition', (done) => {
            cm.addDefinition().catch((e) => {
                expect(e.message).toBe('an ID must be supplied to add a definition');
                done();
            });
        });
        it('can get a content ID Definition by id', () => {
            let def = cm.getDefinition('foo');
            expect(def).toBeDefined();
        });
        it('can get a content ID Map by language/id', () => {
            let map = cm.getMap('en-us', 'foo');
            expect(map).toBeDefined();
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
            spyOn(contextIdModel, 'parse').and.returnValue({});
            def = new ContextDefinition('foo');
        });
        afterEach(() => {
            def = null;
        });
        it('can get the definition info', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            def.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can update the description of a definintion', (done) => {
            spyOn(Plug.prototype, 'put').and.returnValue(Promise.resolve({}));
            def.updateDescription('New Description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can implicitly clear the description of a definintion', (done) => {
            spyOn(Plug.prototype, 'put').and.returnValue(Promise.resolve({}));
            def.updateDescription().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can delete a definition', (done) => {
            spyOn(Plug.prototype, 'delete').and.returnValue(Promise.resolve({}));
            def.delete().then(() => {
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
        let map = null;
        beforeEach(() => {
            spyOn(contextMapModel, 'parse').and.returnValue({});
            map = new ContextMap('en-us', 'foo');
        });
        afterEach(() => {
            map = null;
        });
        it('can get the info of a map', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            map.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can update an existing map', (done) => {
            spyOn(Plug.prototype, 'put').and.returnValue(Promise.resolve({}));
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
            spyOn(Plug.prototype, 'delete').and.returnValue(Promise.resolve({}));
            map.remove().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
