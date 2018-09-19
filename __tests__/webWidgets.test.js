import fetch from 'jest-fetch-mock';
import { WebWidgetsManager } from '../webWidgets.js';
global.fetch = fetch;

describe('WebWidgetsManager', () => {
    describe('operations', () => {
        let wwm = null;
        beforeEach(() => {
            fetch.once('{}');
            wwm = new WebWidgetsManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            wwm = null;
        });
        it('can get active widgets', async () => {
            expect.assertions(1);
            await expect(wwm.getActiveWidgets()).resolves.toEqual({ webWidgets: [] });
        });
        it('can get inactive widgets', async () => {
            expect.assertions(1);
            await expect(wwm.getInactiveWidgets()).resolves.toEqual({ webWidgets: [] });
        });
        it('can get an individual widget', async () => {
            expect.assertions(1);
            await expect(wwm.getWidget(1)).resolves.toEqual({});
        });
        it('can create a widget', async () => {
            expect.assertions(1);
            await expect(
                wwm.createWidget({
                    arguments: [{ name: '', value: '' }],
                    hosts: [],
                    name: '',
                    type: '',
                    parentId: 7
                })
            ).resolves.toEqual({});
        });
        it('can delete a widget', async () => {
            expect.assertions(1);
            await expect(wwm.deleteWidget(1)).resolves.toBeInstanceOf(global.Response);
        });
        it('can update a widget', async () => {
            expect.assertions(1);
            await expect(
                wwm.updateWidget(1, { arguments: [{ name: '', value: '' }], hosts: [], name: '', type: '' })
            ).resolves.toEqual({});
        });
        it('can activate a widget', async () => {
            expect.assertions(1);
            await expect(wwm.activateWidget(1)).resolves.toEqual({});
        });
        it('can deactivate a widget', async () => {
            expect.assertions(1);
            await expect(wwm.deactivateWidget(1)).resolves.toEqual({});
        });
        it('cannot create a widget with invalid data', () => {
            expect.assertions(1);
            expect(() => wwm.createWidget(null)).toThrowError('Web widget data must be an object');
        });
        it('cannot create a widget with invalid arguments', () => {
            expect.assertions(3);
            expect(() => wwm.createWidget({ arguments: null, hosts: [], name: '', type: '' })).toThrow();
            expect(() => wwm.createWidget({ arguments: [null], hosts: [], name: '', type: '' })).toThrow();
            expect(() =>
                wwm.createWidget({ arguments: [{ name: '', value: null }], hosts: [], name: '', type: '' })
            ).toThrowError(
                'Web widget arguments must be an array of objects with a `name` string and a `value` string|number|boolean'
            );
        });
        it('cannot create a widget with invalid hosts', () => {
            expect.assertions(2);
            expect(() =>
                wwm.createWidget({ arguments: [{ name: '', value: '' }], hosts: null, name: '', type: '' })
            ).toThrowError('Web widget hosts must be an array of strings');
            expect(() =>
                wwm.createWidget({ arguments: [{ name: '', value: '' }], hosts: [null], name: '', type: '' })
            ).toThrowError('Web widget hosts must be an array of strings');
        });
        it('cannot create a widget with invalid name', () => {
            expect.assertions(1);
            expect(() =>
                wwm.createWidget({ arguments: [{ name: '', value: '' }], hosts: [], name: null, type: '' })
            ).toThrowError('Web widget name must be a string');
        });
        it('cannot create a widget with invalid type', () => {
            expect.assertions(1);
            expect(() =>
                wwm.createWidget({ arguments: [{ name: '', value: '' }], hosts: [], name: '', type: null })
            ).toThrowError('Web widget type must be a string');
        });
        it('cannot update a widget with invalid data', () => {
            expect.assertions(1);
            expect(() => wwm.updateWidget(1, null)).toThrowError('Web widget data must be an object');
        });
        it('cannot create a subwidget with invalid parentId', () => {
            expect.assertions(1);
            expect(() =>
                wwm.createWidget({
                    arguments: [{ name: '', value: '' }],
                    hosts: [],
                    name: '',
                    type: '',
                    parentId: '09910a12c1b139dd90c848dca3b2a4a83f1a8ea426b0f410756547ccb4f75cd7'
                })
            ).toThrowError('Web widget parentId must be a number');
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('webWidgets API failure');
        const mockFailedResult = { message: 'webWidgets API failure' };
        let wwm = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            wwm = new WebWidgetsManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            wwm = null;
        });
        it('can fail getting active widgets', async () => {
            expect.assertions(1);
            await expect(wwm.getActiveWidgets()).rejects.toEqual(mockFailedResult);
        });
        it('can fail getting inactive widgets', async () => {
            expect.assertions(1);
            await expect(wwm.getInactiveWidgets()).rejects.toEqual(mockFailedResult);
        });
        it('can fail getting an individual widget', async () => {
            expect.assertions(1);
            await expect(wwm.getWidget(1)).rejects.toEqual(mockFailedResult);
        });
        it('can fail creating a widget', async () => {
            expect.assertions(1);
            await expect(
                wwm.createWidget({ arguments: [{ name: '', value: '' }], hosts: [], name: '', type: '' })
            ).rejects.toEqual(mockFailedResult);
        });
        it('can fail deleting a widget', async () => {
            expect.assertions(1);
            await expect(wwm.deleteWidget(1)).rejects.toEqual(mockFailedResult);
        });
        it('can fail updating a widget', async () => {
            expect.assertions(1);
            await expect(
                wwm.updateWidget(1, { arguments: [{ name: '', value: '' }], hosts: [], name: '', type: '' })
            ).rejects.toEqual(mockFailedResult);
        });
        it('can fail activating a widget', async () => {
            expect.assertions(1);
            await expect(wwm.activateWidget(1)).rejects.toEqual(mockFailedResult);
        });
        it('can fail deactivating a widget', async () => {
            expect.assertions(1);
            await expect(wwm.deactivateWidget(1)).rejects.toEqual(mockFailedResult);
        });
    });
});
