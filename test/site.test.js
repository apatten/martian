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
import Site from 'site';
describe('Site API', () => {
    describe('operations', () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can fetch a translated string', (done) => {
            let locUri = '/@api/deki/site/localization/Test.Resource.key?';
            jasmine.Ajax.stubRequest(new RegExp(locUri), null, 'GET').andReturn({ status: 200, responseText: 'Translated string' });
            Site.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' }).then((r) => {
                expect(r).toBe('Translated string');
                done();
            });
        });
    });
});
