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
jest.unmock('../../lib/modelParser.js');
import { Mocks } from './mock/mocks.js';
import { modelParser } from '../../lib/modelParser.js';

const fs = require('fs');
const files = fs.readdirSync('./models');
let modelMap = {};
files.forEach((file) => {
    if(file.endsWith('.model.js')) {
        const module = require.requireActual(`../${file}`);
        modelMap = Object.assign(modelMap, module);
    }
});

describe('Models', () => {
    describe('Property checking', () => {
        it('only has valid properties', () => {
            const defaultProps = [ 'field', 'name', 'isArray', 'transform', 'constructTransform' ];
            const preProcessorProps = [ 'preProcessor', 'model' ];
            const allModels = Object.values(modelMap);
            function propsAreValid(obj, validProps) {
                return Object.keys(obj).every((prop) => validProps.includes(prop));
            }
            function testEntry(entry, validProps) {
                if(!propsAreValid(entry, validProps)) {

                    // eslint-disable-next-line
                    console.log(entry);
                    throw new Error('Invalid property found');
                }
                if(Array.isArray(entry.transform) && !allModels.includes(entry.transform)) {
                    entry.transform.forEach((subEntry) => testEntry(subEntry, validProps));
                }
            }

            allModels.forEach((model) => {
                if(!Array.isArray(model)) {
                    testEntry(model, preProcessorProps);
                    model = model.model;
                }
                model.forEach((entry) => testEntry(entry, defaultProps));
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
    describe('Workflows model', () => {
        it('can parse a workflow response', () => {
            expect(modelParser.createParser(modelMap.workflowsModel)(Mocks.workflows)).toBeDefined();
        });
    });
});
