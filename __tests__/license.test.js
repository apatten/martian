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
jest.unmock('../license.js');
import { License } from '../license.js';

describe('License', () => {
    let license = null;
    beforeEach(() => {
        license = new License();
    });
    afterEach(() => {
        license = null;
    });
    it('can fetch the usage (no parameters)', () => {
        return license.getUsage();
    });
    it('can fetch the usage (all parameters)', () => {
        return license.getUsage({
            since: new Date(2015, 12, 31, 12, 12, 0),
            upTo: new Date(Date.now()),
            version: 2
        });
    });
    it('can fail if an invalid `since` value is sent', () => {
        const success = jest.fn();
        return license.getUsage({ since: '20151231121200' }).then(() => {
            success();
            throw new Error('Promise was resolved');
        }).catch(() => {
            expect(success).not.toHaveBeenCalled();
        });
    });
    it('can fail if an invalid `upTo` value is sent', () => {
        const success = jest.fn();
        return license.getUsage({ upTo: 20151231121200 }).then(() => {
            success();
            throw new Error('Promise was resolved');
        }).catch(() => {
            expect(success).not.toHaveBeenCalled();
        });
    });
    it('can fetch the usage logs', () => {
        return license.getUsageLogs();
    });
    it('can fetch the URL for a usage log', () => {
        return license.getUsageLogUrl('foo');
    });
    it('can fail if no name is supplied to fetch a log URL.', () => {
        const success = jest.fn();
        return license.getUsageLogUrl().then(() => {
            success();
            throw new Error('Promise was resolved.');
        }).catch(() => {
            expect(success).not.toHaveBeenCalled();
        });
    });
});
