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
jest.unmock('../api');
import { Api } from '../api';
describe('Api', () => {
    describe('http', () => {
        let api = null;
        beforeEach(() => {
            api = new Api();
        });
        afterEach(() => {
            api = null;
        });
        pit('can validate http', () => {
            return api.http();
        });
    });
    describe('f1', () => {
        let api = null;
        beforeEach(() => {
            api = new Api();
        });
        afterEach(() => {
            api = null;
        });
        pit('can validate f1', () => {
            return api.f1();
        });
    });
});