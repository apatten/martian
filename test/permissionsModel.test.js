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
import { permissionsModel } from '../models/permissions.model';
describe('Permissions Model', () => {
    it('returns the parsed operations', () => {
        let operations = 'foo,bar';
        permissionsModel.forEach((propertyModel) => {
            if(typeof propertyModel.transform === 'function' && propertyModel.field[0] === 'operations') {
                operations = propertyModel.transform(operations);
            }
        });
        expect(operations).toEqual([ 'foo', 'bar' ]);
    });
    it('returns the parsed role', () => {
        let role1 = {
            '#text': 'role name',
            '@id': '5',
            '@href': 'href'
        };
        let role2 = 'role name';
        permissionsModel.forEach((propertyModel) => {
            if(typeof propertyModel.transform === 'function' && propertyModel.field === 'role') {
                role1 = propertyModel.transform(role1);
                role2 = propertyModel.transform(role2);
            }
        });
        expect(role1).toEqual({
            name: 'role name',
            id: 5,
            href: 'href'
        });
        expect(role2).toEqual({
            name: 'role name'
        });
    });
});
