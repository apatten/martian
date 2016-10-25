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
/* eslint-env jasmine, jest */
jest.unmock('../contextId.js');
import { ContextIdManager, ContextDefinition, ContextMap } from '../contextId.js';

describe('Context ID', () => {
    describe('Manager', () => {
        let cm = null;
        beforeEach(() => {
            cm = new ContextIdManager();
        });
        afterEach(() => {
            cm = null;
        });
        it('can fetch all context maps', () => {
            return cm.getMaps();
        });
        it('can fetch the list of all context definitions', () => {
            return cm.getDefinitions();
        });
        it('can fetch the list of all context definitions (empty response)', () => {
            return cm.getDefinitions();
        });
        it('can add a context ID definition', () => {
            return cm.addDefinition('foo');
        });
        it('can add a context ID definition with a description', () => {
            return cm.addDefinition('foo', 'Foo description');
        });
        it('can fail if an ID is not supplied when trying to add a definition', () => {
            return cm.addDefinition().then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
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
            def = new ContextDefinition('foo');
        });
        afterEach(() => {
            def = null;
        });
        it('can get the definition info', () => {
            return def.getInfo();
        });
        it('can update the description of a definintion', () => {
            return def.updateDescription('New Description');
        });
        it('can implicitly clear the description of a definintion', () => {
            return def.updateDescription();
        });
        it('can delete a definition', () => {
            return def.delete();
        });
    });
    describe('Context Map constructor', () => {
        it('can construct a new Context Map', () => {
            expect(() => new ContextMap()).toThrow();
            expect(() => new ContextMap('foo')).toThrow();
            let cm = new ContextMap('en-us', 'foo');
            expect(cm).toBeDefined();
        });
    });
    describe('ContextMap instance functions', () => {
        let map = null;
        beforeEach(() => {
            map = new ContextMap('en-us', 'foo');
        });
        afterEach(() => {
            map = null;
        });
        it('can get the info of a map', () => {
            return map.getInfo();
        });
        it('can update an existing map', () => {
            return map.update(123);
        });
        it('can fail if an ID is not supplied when updating a map', () => {
            const success = jest.fn();
            return map.update().then(() => {
                success();
                throw new Error();
            }).catch((e) => {
                expect(success).not.toHaveBeenCalled();
                expect(e).toBeDefined();
            });
        });
        it('can clear a mapping', () => {
            return map.remove();
        });
    });
});
