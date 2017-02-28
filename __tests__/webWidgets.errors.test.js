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
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
const WebWidgetsManager = require.requireActual('../webWidgets.js').WebWidgetsManager;

describe('Error handling for WebWidgets.js', () => {
    let wwm = null;
    beforeEach(() => {
        wwm = new WebWidgetsManager();
    });
    afterEach(() => {
        wwm = null;
    });
    it('can fail getting active widgets', () => {
        const success = jest.fn();
        return wwm.getActiveWidgets().catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail getting inactive widgets', () => {
        const success = jest.fn();
        return wwm.getInactiveWidgets().catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail getting an individual widget', () => {
        const success = jest.fn();
        return wwm.getWidget(1).catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail creating a widget', () => {
        const success = jest.fn();
        return wwm.createWidget({ arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' }).catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail updating a widget', () => {
        const success = jest.fn();
        return wwm.updateWidget(1, { arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' }).catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail activating a widget', () => {
        const success = jest.fn();
        return wwm.activateWidget(1).catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
    it('can fail deactivating a widget', () => {
        const success = jest.fn();
        return wwm.deactivateWidget(1).catch(success).then(() => {
            expect(success).toHaveBeenCalled();
        });
    });
});
