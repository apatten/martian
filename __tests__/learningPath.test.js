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
jest.unmock('../learningPath');
import { LearningPathManager, LearningPath } from '../learningPath';

describe('Learning Path API', () => {
    let lpm = null;
    beforeEach(() => {
        lpm = new LearningPathManager();
    });
    afterEach(() => {
        lpm = null;
    });
    describe('constructor', () => {
        it('can construct a new learning path', () => {
            let learningPath = new LearningPath('foobar');
            expect(learningPath).toBeDefined();
            expect(() => learningPath()).toThrow();
            expect(() => LearningPathManager()).toThrow();
        });
    });
    describe('Manager tests', () => {
        pit('can get the listing of all of the learning paths', () => {
            return lpm.getLearningPaths();
        });
        it('can get learning path by name', () => {
            var lp = lpm.getLearningPath('name');
            expect(lp instanceof LearningPath).toBe(true);
        });
        pit('can create a learning path', () => {
            return lpm.create({ title: 'foo', name: 'bar', summary: 'baz' });
        });
        pit('can create a learning path with a long summary', () => {
            return lpm.create({
                title: 'foo',
                name: 'bar',
                summary: 'Years isn\'t there void third darkness tree made firmament from set which morning hath signs all so meat which abundantly. Together behold land. Land form, grass isn\'t called won\'t called. Said is great second were sea beginning unto unto without she\'d. Seas seed she\'d waters hath. Saying yielding rule. Forth light creeping winged day it blessed let in multiply don\'t. Likeness creature under have, have created, i set creeping blessed his after likeness seasons midst under also days shall, don\'t male fifth tree there hath herb gathering stars. Gathering form Place whales open blessed waters seas Fruitful earth kind wherein years signs evening female spirit winged His they\'re god whales meat meat without for face. Saw moveth their open don\'t after be and without, first thing third Divided herb every greater. Lights forth from us there gathered. Appear subdue. Own fourth living, created our rule creature, firmament our our, first evening good it you\'re bring you\'re wherein said said blessed very light form saying you. Heaven, very saw dominion without every tree male. Bring their night creepeth was won\'t fill beast god thing his you\'ll cattle together earth, without is also. Set the man which creeping place. Dry made likeness.'
            });
        });
    });
    describe('operations', () => {
        let learningPath = null;
        beforeEach(() => {
            learningPath = new LearningPath('foobar');
        });
        afterEach(() => {
            learningPath = null;
        });
        pit('can get a learning path', () => {
            return learningPath.getInfo();
        });
        pit('can update a learning path', () => {
            return learningPath.update({ name: 'foo', title: 'bar', summary: 'baz' });
        });
        pit('can truncate a long summary', () => {
            return learningPath.update({
                name: 'foo',
                title: 'bar',
                summary: 'Years isn\'t there void third darkness tree made firmament from set which morning hath signs all so meat which abundantly. Together behold land. Land form, grass isn\'t called won\'t called. Said is great second were sea beginning unto unto without she\'d. Seas seed she\'d waters hath. Saying yielding rule. Forth light creeping winged day it blessed let in multiply don\'t. Likeness creature under have, have created, i set creeping blessed his after likeness seasons midst under also days shall, don\'t male fifth tree there hath herb gathering stars. Gathering form Place whales open blessed waters seas Fruitful earth kind wherein years signs evening female spirit winged His they\'re god whales meat meat without for face. Saw moveth their open don\'t after be and without, first thing third Divided herb every greater. Lights forth from us there gathered. Appear subdue. Own fourth living, created our rule creature, firmament our our, first evening good it you\'re bring you\'re wherein said said blessed very light form saying you. Heaven, very saw dominion without every tree male. Bring their night creepeth was won\'t fill beast god thing his you\'ll cattle together earth, without is also. Set the man which creeping place. Dry made likeness.'
            });
        });
        pit('can remove a learning path', () => {
            return learningPath.remove();
        });
        pit('can update a learning path with pages', () => {
            return learningPath.update({ name: 'foo', title: 'bar', summary: 'baz', pages: [ { id: 123 }, { id: 124 }, { id: 125 } ] });
        });
    });
    describe('page operations', () => {
        let learningPath = null;
        beforeEach(() => {
            learningPath = new LearningPath('foobar');
        });
        afterEach(() => {
            learningPath = null;
        });
        pit('can add a page to a learning path', () => {
            return learningPath.addPage(123, 20160225000833);
        });
        pit('can remove a page from a learning path', () => {
            return learningPath.removePage(123, 20160225000833);
        });
        pit('can reorder a page in a learning path', () => {
            return learningPath.reorderPage(123, 124, 20160225000833);
        });
    });
});
