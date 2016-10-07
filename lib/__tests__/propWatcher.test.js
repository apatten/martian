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
jest.unmock('../propWatcher');
import { PropWatcher } from '../propWatcher';
describe('Prop Watcher', () => {
    it('can list all props on an untouched object', () => {
        const props = new PropWatcher({
            a: 1,
            b: {
                c: 2
            }
        });
        expect(props.getUnaccessed()).toEqual([ 'a', 'b', 'b > c' ]);
    });
    it('can list all unaccessed props on an object', () => {
        const obj = {
            a: 1,
            b: {
                c: 2
            }
        };
        const props = new PropWatcher(obj);

        // eslint-disable-next-line no-unused-expressions
        obj.b;
        expect(props.getUnaccessed()).toEqual([ 'a', 'b > c' ]);
    });
    it('can mutate props on an object', () => {
        const obj = {
            a: 1,
            b: {
                c: 2
            }
        };

        // eslint-disable-next-line no-new
        new PropWatcher(obj);
        obj.b = 3;
        expect(obj.b).toEqual(3);
    });
});
