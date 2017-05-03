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
jest.unmock('../siteJob.model.js');
jest.unmock('../../lib/modelParser.js');
import { siteJobsModel } from '../siteJob.model.js';
import { modelParser } from '../../lib/modelParser.js';

describe('Site Jobs model parsing', () => {
    it('can parse if the response is an empty string', () => {
        const parser = modelParser.createParser(siteJobsModel);
        const parsed = parser('');
        expect(Array.isArray(parsed.jobs)).toBe(true);
        expect(parsed.jobs.length).toBe(0);
    });
});
