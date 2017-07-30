/* eslint-env jasmine, jest */
jest.unmock('../permissions.model.js');
import { permissionsModel } from '../permissions.model.js';

describe('Permissions Model', () => {
    it('returns the parsed operations', () => {
        let operations1 = 'foo,bar';
        let operations2 = 100;
        permissionsModel.forEach((propertyModel) => {
            if(typeof propertyModel.transform === 'function' && propertyModel.field[0] === 'operations') {
                operations1 = propertyModel.transform(operations1);
                operations2 = propertyModel.transform(operations2);
            }
        });
        expect(operations1).toEqual([ 'foo', 'bar' ]);
        expect(operations2).toEqual([]);
    });
    it('returns the parsed role', () => {
        let role0 = 100;
        let role1 = {
            '#text': 'role name',
            '@id': '5',
            '@href': 'href'
        };
        let role2 = 'role name';
        let role3 = {
            '@id': '5',
            '@href': 'href'
        };
        let role4 = {};
        permissionsModel.forEach((propertyModel) => {
            if(typeof propertyModel.transform === 'function' && propertyModel.field === 'role') {
                role0 = propertyModel.transform(role0);
                role1 = propertyModel.transform(role1);
                role2 = propertyModel.transform(role2);
                role3 = propertyModel.transform(role3);
                role4 = propertyModel.transform(role4);
            }
        });
        expect(role0).toEqual({});
        expect(role1).toEqual({
            name: 'role name',
            id: 5,
            href: 'href'
        });
        expect(role2).toEqual({
            name: 'role name'
        });
        expect(role3).toEqual({ id: 5, href: 'href' });
        expect(role4).toEqual({});
    });
});
