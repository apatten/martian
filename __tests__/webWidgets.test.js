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
jest.unmock('../webWidgets.js');
import { WebWidgetsManager } from '../webWidgets.js';

describe('WebWidgets', () => {
    let wwm = null;
    beforeEach(() => {
        wwm = new WebWidgetsManager();
    });
    afterEach(() => {
        wwm = null;
    });
    it('can get active widgets', () => {
        return wwm.getActiveWidgets();
    });
    it('can get inactive widgets', () => {
        return wwm.getInactiveWidgets();
    });
    it('can get an individual widget', () => {
        return wwm.getWidget(1);
    });
    it('can create a widget', () => {
        return wwm.createWidget({ arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' });
    });
    it('can delete a widget', () => {
        return wwm.deleteWidget(1);
    });
    it('can update a widget', () => {
        return wwm.updateWidget(1, { arguments: [ { name: '', value: '' } ], hosts: [], name: '', type: '' });
    });
    it('can activate a widget', () => {
        return wwm.activateWidget(1);
    });
    it('can deactivate a widget', () => {
        return wwm.deactivateWidget(1);
    });
});
