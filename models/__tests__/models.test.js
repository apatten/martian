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
                    const modelArr = 'model' in model ? model.model : model;
                    const fieldNames = modelArr.reduce(function getFieldNames(names, fieldObj) {
                        let fieldName = Array.isArray(fieldObj.field) ? fieldObj.field[0] : fieldObj.field;
                        if(fieldObj.hasOwnProperty('name')) {
                            fieldName = fieldObj.name;
                        }
                        names.push(fieldName);
                        if(fieldObj.transform && !allModels.includes(fieldObj.transform)) {
                            if(Array.isArray(fieldObj.transform)) {
                                names = fieldObj.transform.reduce(getFieldNames, names);
                            } else if(Array.isArray(fieldObj.transform.model)) {
                                names = fieldObj.transform.model.reduce(getFieldNames, names);
                            }
                        }
                        return names;
                    }, []);
                    mocks.forEach((mock) => {
                        const parsedData = modelParser.createParser(model)(mock);
                        expect(parsedData).toBeDefined();
                        (function removeFieldNames(obj, currentKey = '') {
                            const keyIndex = fieldNames.indexOf(currentKey);
                            if(keyIndex !== -1) {
                                fieldNames.splice(keyIndex, 1);
                            }
                            if(Array.isArray(obj)) {
                                obj.forEach((subObj) => {
                                    removeFieldNames(subObj);
                                });
                            } else if(obj && typeof obj === 'object') {
                                Object.entries(obj).forEach(([ key, value ]) => {
                                    removeFieldNames(value, key);
                                });
                            }
                        })(parsedData);
                    });
                    if(fieldNames.length) {

                        // eslint-disable-next-line
                        console.warn(`Untested ${modelName} fields:\n${fieldNames.join(', ')}`);
                    }
                });
            });
        });
    });
});

/* describe('Models', () => {
    describe('Property checking', () => {
        it('has valid properties', () => {
            const allModels = Object.values(modelMap);
            function testModelItem(modelItem, validProps) {
                const invalidProp = Object.keys(modelItem).find((prop) => !validProps.includes(prop) || typeof modelItem[prop] === 'undefined');
                if(invalidProp) {
                    throw new Error(`Invalid property found: '${invalidProp}'\n${JSON.stringify(modelItem)}`);
                }
                if(Array.isArray(modelItem.transform) && !allModels.includes(modelItem.transform)) {
                    modelItem.transform.forEach((subModelItem) => testModelItem(subModelItem, validProps));
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
    });
    describe('Available logs model', () => {
        it('can parse a list of logs', () => {
            expect(modelParser.createParser(modelMap.contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
        });
    });
    describe('Log URL model', () => {
        it('can parse a log URL', () => {
            expect(modelParser.createParser(modelMap.contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
        });
    });
    describe('Context ID models', () => {
        it('can parse a context ID', () => {
            expect(modelParser.createParser(modelMap.contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextIdModel)(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a list of context IDs', () => {
            expect(modelParser.createParser(modelMap.contextIdsModel)(Mocks.contextIdDefinitions)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextIdsModel)(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a context map', () => {
            expect(modelParser.createParser(modelMap.contextMapModel)(Mocks.contextMap)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextMapModel)(Mocks.contextMapVerbose)).toBeDefined();
        });
        it('can parse a list of context maps', () => {
            expect(modelParser.createParser(modelMap.contextMapsModel)(Mocks.contextMaps)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextMapsModel)(Mocks.contextMapsSingleLanguage)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextMapsModel)(Mocks.contextMapSingleSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.contextMapsModel)(Mocks.contextMapsEmpty)).toBeDefined();
        });
    });
    describe('File model', () => {
        it('can parse file info', () => {
            expect(modelParser.createParser(modelMap.fileModel)(Mocks.file)).toBeDefined();
            expect(modelParser.createParser(modelMap.fileModel)(Mocks.fileReduced)).toBeDefined();
        });
        it('can parse a list of file revisions', () => {
            expect(modelParser.createParser(modelMap.fileRevisionsModel)(Mocks.fileRevisions)).toBeDefined();
            expect(modelParser.createParser(modelMap.fileRevisionsModel)(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.fileRevisionsModel)(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Group model', () => {
        it('can parse group info', () => {
            expect(modelParser.createParser(modelMap.groupModel)(Mocks.group)).toBeDefined();
        });
        it('can parse a list of groups', () => {
            expect(modelParser.createParser(modelMap.groupListModel)(Mocks.groupListing)).toBeDefined();
            expect(modelParser.createParser(modelMap.groupListModel)(Mocks.groupListingSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.groupListModel)(Mocks.groupListingEmpty)).toBeDefined();
        });
    });
    describe('Learning Path model', () => {
        it('can parse learning path', () => {
            expect(modelParser.createParser(modelMap.learningPathModel)(Mocks.learningPath)).toBeDefined();
            expect(modelParser.createParser(modelMap.learningPathModel)(Mocks.learningPathSinglePage)).toBeDefined();
            expect(modelParser.createParser(modelMap.learningPathModel)(Mocks.learningPathNoPages)).toBeDefined();
        });
        it('can parse multiple learning paths', () => {
            expect(modelParser.createParser(modelMap.learningPathsModel)(Mocks.learningPaths)).toBeDefined();
            expect(modelParser.createParser(modelMap.learningPathsModel)(Mocks.learningPathsSingular)).toBeDefined();
        });
    });
    describe('Page model', () => {
        it('can parse page info', () => {
            expect(modelParser.createParser(modelMap.pageModel)(Mocks.page)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageModel)(Mocks.pageInfo)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageModel)(Mocks.virtualPage)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageModel)(Mocks.draft)).toBeDefined();
        });
    });
    describe('Page contents model', () => {
        it('can parse page contents info', () => {
            expect(modelParser.createParser(modelMap.pageContentsModel)(Mocks.pageContent)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageContentsModel)(Mocks.pageContentSimple)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageContentsModel)(Mocks.draftContent)).toBeDefined();
        });
    });
    describe('Page tree model', () => {
        it('can parse page tree info', () => {
            expect(modelParser.createParser(modelMap.pageTreeModel)(Mocks.pageTree)).toBeDefined();
        });
    });
    describe('Page edit model', () => {
        it('can parse a page edit info', () => {
            expect(modelParser.createParser(modelMap.pageEditModel)(Mocks.pageSetContents)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageEditModel)(Mocks.pageSetContentsConflict)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageEditModel)(Mocks.draftSetContents)).toBeDefined();
        });
    });
    describe('Page files model', () => {
        it('can parse page files info', () => {
            expect(modelParser.createParser(modelMap.pageFilesModel)(Mocks.fileRevisions)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageFilesModel)(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageFilesModel)(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Page move model', () => {
        it('can parse page move info', () => {
            expect(modelParser.createParser(modelMap.pageMoveModel)(Mocks.pageMove)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageMoveModel)(Mocks.pageMoveSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageMoveModel)(Mocks.pageMoveEmpty)).toBeDefined();
        });
    });
    describe('Page properties model', () => {
        it('can parse page proerty info', () => {
            expect(modelParser.createParser(modelMap.pagePropertyModel)(Mocks.pageProperty)).toBeDefined();
            expect(modelParser.createParser(modelMap.pagePropertyModel)(Mocks.pagePropertyPage)).toBeDefined();
        });
        it('can parse a list of page properties', () => {
            expect(modelParser.createParser(modelMap.pagePropertiesModel)(Mocks.pageProperties)).toBeDefined();
            expect(modelParser.createParser(modelMap.pagePropertiesModel)(Mocks.pagePropertiesSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.pagePropertiesModel)(Mocks.pagePropertiesEmpty)).toBeDefined();
        });
    });
    describe('Page ratings model', () => {
        it('can parse page rating info', () => {
            expect(modelParser.createParser(modelMap.pageRatingModel)(Mocks.pageRating)).toBeDefined();
        });
        it('can parse a list of page ratings', () => {
            expect(modelParser.createParser(modelMap.pageRatingsModel)(Mocks.pageRatings)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageRatingsModel)(Mocks.pageRatingsSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageRatingsModel)(Mocks.pageRatingsEmpty)).toBeDefined();
        });
    });
    describe('Page tags model', () => {
        it('can parse page tags info', () => {
            expect(modelParser.createParser(modelMap.pageTagsModel)(Mocks.pageTags)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageTagsModel)(Mocks.pageTagsSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.pageTagsModel)(Mocks.pageTagsEmpty)).toBeDefined();
        });
    });
    describe('Page history model', () => {
        it('can parse a list of page history event summary', () => {
            expect(modelParser.createParser(modelMap.pageHistoryModel)(Mocks.pageEventSummary)).toBeDefined();
        });
        it('can parse a single page history event summary', () => {
            expect(modelParser.createParser(modelMap.pageHistoryModel)(Mocks.pageEventSummarySingle)).toBeDefined();
        });
    });
    describe('Page history detail model', () => {
        it('can parse a single page history event detail', () => {
            expect(modelParser.createParser(modelMap.pageHistoryDetailModel)(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Search model', () => {
        it('can parse search result info', () => {
            expect(modelParser.createParser(modelMap.searchModel)(Mocks.search)).toBeDefined();
            expect(modelParser.createParser(modelMap.searchModel)(Mocks.searchSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.searchModel)(Mocks.searchEmpty)).toBeDefined();
            expect(modelParser.createParser(modelMap.searchModel)(Mocks.searchSingleNoResultSummary)).toBeDefined();
        });
    });
    describe('Subpages model', () => {
        it('can parse subpages info', () => {
            expect(modelParser.createParser(modelMap.subpagesModel)(Mocks.subpages)).toBeDefined();
            expect(modelParser.createParser(modelMap.subpagesModel)(Mocks.subpagesSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.subpagesModel)(Mocks.subpagesEmpty)).toBeDefined();
        });
    });
    describe('Users model', () => {
        it('can parse user info', () => {
            expect(modelParser.createParser(modelMap.userModel)(Mocks.user)).toBeDefined();
        });
        it('can parse a list of users', () => {
            expect(modelParser.createParser(modelMap.userListModel)(Mocks.users)).toBeDefined();
            expect(modelParser.createParser(modelMap.userListModel)(Mocks.usersSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.userListModel)(Mocks.userSearch)).toBeDefined();
            expect(modelParser.createParser(modelMap.userListModel)(Mocks.userSearchSingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.userListModel)(Mocks.userSearchEmpty)).toBeDefined();
        });
    });
    describe('User activity model', () => {
        it('can parse a list of user activity events', () => {
            expect(modelParser.createParser(modelMap.userActivityModel)(Mocks.userActivity)).toBeDefined();
            expect(modelParser.createParser(modelMap.userActivityModel)(Mocks.userActivitySingle)).toBeDefined();
            expect(modelParser.createParser(modelMap.userActivityModel)(Mocks.userActivityEmpty)).toBeDefined();
        });
    });
    describe('Event model', () => {
        it('can parse an event', () => {
            expect(modelParser.createParser(modelMap.eventModel)(Mocks.event)).toBeDefined();
            expect(modelParser.createParser(modelMap.eventModel)(Mocks.eventUserName)).toBeDefined();
        });
    });
    describe('Event detail model', () => {
        it('can parse an event detail', () => {
            expect(modelParser.createParser(modelMap.userHistoryDetailModel)(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Event list model', () => {
        it('can parse an event list', () => {
            expect(modelParser.createParser(modelMap.userHistoryModel)(Mocks.eventList)).toBeDefined();
        });
    });
    describe('Related pages model', () => {
        it('can parse a list of related pages', () => {
            expect(modelParser.createParser(modelMap.relatedPagesModel)(Mocks.relatedPages)).toBeDefined();
            expect(modelParser.createParser(modelMap.relatedPagesModel)(Mocks.relatedPagesSingle)).toBeDefined();
        });
    });
    describe('Site Tags model', () => {
        it('can parse a list of site tags', () => {
            expect(modelParser.createParser(modelMap.siteTagsModelGet)(Mocks.siteTagsGet)).toBeDefined();
            expect(modelParser.createParser(modelMap.siteTagsModelPost)(Mocks.siteTagsPost)).toBeDefined();
            expect(modelParser.createParser(modelMap.siteTagsModelPost)('')).toBeDefined();
        });
    });
    describe('WebWidgets model', () => {
        it('can parse a web-widget list', () => {
            expect(modelParser.createParser(modelMap.webWidgetsListModel)(Mocks.webWidgetsList)).toBeDefined();
        });
    });
    describe('Workflows model', () => {
        it('can parse a workflow response', () => {
            expect(modelParser.createParser(modelMap.workflowsModel)(Mocks.workflows)).toBeDefined();
        });
    });
});*/
