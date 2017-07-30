/* eslint-env jasmine, jest */
const fs = require('fs');
const modelParser = require.requireActual('../../lib/modelParser.js').modelParser;

const modelsData = fs.readdirSync('./models').reduce((modelsObj, filename) => {
    if(filename.endsWith('.model.js')) {
        const keyName = filename.replace('.model.js', '');
        const mockDir = `./models/__mocks__/${keyName}`;
        const models = Object.values(require.requireActual(`../${filename}`));
        const mocks = fs.readdirSync(mockDir).reduce((modelMocks, mockFilename) => {
            if(mockFilename.endsWith('.mock.json')) {
                const mockObj = JSON.parse(fs.readFileSync(`${mockDir}/${mockFilename}`, { encoding: 'utf8' }));
                modelMocks.push(mockObj);
            }
            return modelMocks;
        }, []);
        modelsObj[keyName] = { models, mocks };
    }
    return modelsObj;
}, {});
const allModels = Object.values(modelsData).reduce((collection, { models }) => collection.concat(models), []);

describe('Models', () => {
    describe('Property checking', () => {
        it('has valid properties', () => {
            function testModelItem(modelItem, validProps) {
                const invalidProp = Object.keys(modelItem).find((prop) => !validProps.includes(prop) || typeof modelItem[prop] === 'undefined');
                if(invalidProp) {
                    throw new Error(`Invalid property found: '${invalidProp}'\n${JSON.stringify(modelItem)}`);
                }
                if(modelItem.transform && !allModels.includes(modelItem.transform)) {
                    if(Array.isArray(modelItem.transform)) {
                        modelItem.transform.forEach((subModelItem) => testModelItem(subModelItem, validProps));
                    } else if(Array.isArray(modelItem.transform.model)) {
                        modelItem.transform.model.forEach((subModelItem) => testModelItem(subModelItem, validProps));
                    }
                }
            }
            allModels.forEach((model) => {
                if(!Array.isArray(model)) {
                    testModelItem(model, [ 'preProcessor', 'model' ]);
                    model = model.model;
                }
                model.forEach((modelItem) => testModelItem(modelItem, [ 'field', 'name', 'isArray', 'transform', 'constructTransform' ]));
            });
        });
        it('can parse mock data', () => {
            Object.keys(modelsData).forEach((modelName) => {
                const { models, mocks } = modelsData[modelName];
                models.forEach((model) => {
                    const modelMap = (function modelToObj(currentModel) {
                        const modelArr = Array.isArray(currentModel) ? currentModel : currentModel.model;
                        return modelArr.reduce((modelMapping, fieldObj) => {
                            let fieldName = Array.isArray(fieldObj.field) ? fieldObj.field[0] : fieldObj.field;
                            if(fieldObj.hasOwnProperty('name')) {
                                fieldName = fieldObj.name;
                            }
                            modelMapping[fieldName] = '';
                            if(fieldObj.transform && typeof fieldObj.transform === 'object' && !allModels.includes(fieldObj.transform)) {
                                modelMapping[fieldName] = modelToObj(fieldObj.transform);
                            }
                            return modelMapping;
                        }, {});
                    })(model);
                    mocks.forEach((mock) => {
                        const parsedData = modelParser.createParser(model)(mock);
                        expect(parsedData).toBeDefined();
                        (function removeFieldNames(currentData, currentMap) {
                            Object.keys(currentData).forEach((dataKey) => {
                                const mapValue = currentMap[dataKey];
                                if(mapValue === '') {
                                    delete currentMap[dataKey];
                                } else if(mapValue && typeof mapValue === 'object') {
                                    const dataValue = currentData[dataKey];
                                    if(dataValue && typeof dataValue === 'object') {
                                        if(Array.isArray(dataValue)) {
                                            dataValue.forEach((value) => {
                                                if(value && typeof value === 'object') {
                                                    removeFieldNames(value, mapValue);
                                                }
                                            });
                                        } else {
                                            removeFieldNames(dataValue, mapValue);
                                        }
                                    }
                                    if(Object.keys(mapValue).length === 0) {
                                        delete currentMap[dataKey];
                                    }
                                }
                            });
                        })(parsedData, modelMap);
                    });
                    if(Object.keys(modelMap).length) {

                        // eslint-disable-next-line
                        console.warn(`Untested model fields\n${modelName}: ${JSON.stringify(modelMap, null, 2)}`);
                    }
                });
            });
        });
    });
});
