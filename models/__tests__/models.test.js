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
import { contextIdModel } from '../contextId.model.js';
import { contextIdsModel } from '../contextIds.model.js';
import { contextMapModel } from '../contextMap.model.js';
import { contextMapsModel } from '../contextMaps.model.js';
import { fileModel } from '../file.model.js';
import { fileRevisionsModel } from '../fileRevisions.model.js';
import { groupModel } from '../group.model.js';
import { groupListModel } from '../groupList.model.js';
import { learningPathModel } from '../learningPath.model.js';
import { learningPathsModel } from '../learningPaths.model.js';
import { pageModel } from '../page.model.js';
import { pageContentsModel } from '../pageContents.model.js';
import { pageTreeModel } from '../pageTree.model.js';
import { pageEditModel } from '../pageEdit.model.js';
import { pageFilesModel } from '../pageFiles.model.js';
import { pageMoveModel } from '../pageMove.model.js';
import { pagePropertyModel } from '../pageProperty.model.js';
import { pagePropertiesModel } from '../pageProperties.model.js';
import { pageRatingModel } from '../pageRating.model.js';
import { pageRatingsModel } from '../pageRatings.model.js';
import { pageTagsModel } from '../pageTags.model.js';
import { searchModel } from '../search.model.js';
import { subpagesModel } from '../subpages.model.js';
import { userModel } from '../user.model.js';
import { userListModel } from '../userList.model.js';
import { userActivityModel } from '../userActivity.model.js';
import { eventModel } from '../event.model.js';
import { userHistoryDetailModel } from '../userHistoryDetail.model.js';
import { userHistoryModel } from '../userHistory.model.js';
import { pageHistoryModel } from '../pageHistory.model.js';
import { pageHistoryDetailModel } from '../pageHistoryDetail.model.js';
import { relatedPagesModel } from '../relatedPages.model.js';
import { siteTagsModelGet, siteTagsModelPost } from '../siteTags.model.js';
import { reportLogsModel } from '../reportLogs.model.js';
import { logUrlModel } from '../logUrl.model.js';
import { workflowsModel } from '../workflows.model.js';

// Add all imported models here for property checking
const allModels = [
    contextIdModel,
    contextIdsModel,
    contextMapModel,
    contextMapsModel,
    fileModel,
    fileRevisionsModel,
    groupModel,
    groupListModel,
    learningPathModel,
    learningPathsModel,
    pageModel,
    pageContentsModel,
    pageTreeModel,
    pageEditModel,
    pageFilesModel,
    pageMoveModel,
    pagePropertyModel,
    pagePropertiesModel,
    pageRatingModel,
    pageRatingsModel,
    pageTagsModel,
    searchModel,
    subpagesModel,
    userModel,
    userListModel,
    userActivityModel,
    eventModel,
    userHistoryDetailModel,
    userHistoryModel,
    pageHistoryModel,
    pageHistoryDetailModel,
    relatedPagesModel,
    siteTagsModelGet,
    siteTagsModelPost,
    reportLogsModel,
    logUrlModel,
    workflowsModel
];

describe('Models', () => {
    describe('Property checking', () => {
        it('only has valid properties', () => {
            const defaultProps = [ 'field', 'name', 'isArray', 'transform', 'constructTransform' ];
            const preProcessorProps = [ 'preProcessor', 'model' ];
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
            expect(modelParser.createParser(contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
        });
    });
    describe('Log URL model', () => {
        it('can parse a log URL', () => {
            expect(modelParser.createParser(contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
        });
    });
    describe('Context ID models', () => {
        it('can parse a context ID', () => {
            expect(modelParser.createParser(contextIdModel)(Mocks.contextIdDefinition)).toBeDefined();
            expect(modelParser.createParser(contextIdModel)(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a list of context IDs', () => {
            expect(modelParser.createParser(contextIdsModel)(Mocks.contextIdDefinitions)).toBeDefined();
            expect(modelParser.createParser(contextIdsModel)(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a context map', () => {
            expect(modelParser.createParser(contextMapModel)(Mocks.contextMap)).toBeDefined();
            expect(modelParser.createParser(contextMapModel)(Mocks.contextMapVerbose)).toBeDefined();
        });
        it('can parse a list of context maps', () => {
            expect(modelParser.createParser(contextMapsModel)(Mocks.contextMaps)).toBeDefined();
            expect(modelParser.createParser(contextMapsModel)(Mocks.contextMapsSingleLanguage)).toBeDefined();
            expect(modelParser.createParser(contextMapsModel)(Mocks.contextMapSingleSingle)).toBeDefined();
            expect(modelParser.createParser(contextMapsModel)(Mocks.contextMapsEmpty)).toBeDefined();
        });
    });
    describe('File model', () => {
        it('can parse file info', () => {
            expect(modelParser.createParser(fileModel)(Mocks.file)).toBeDefined();
            expect(modelParser.createParser(fileModel)(Mocks.fileReduced)).toBeDefined();
        });
        it('can parse a list of file revisions', () => {
            expect(modelParser.createParser(fileRevisionsModel)(Mocks.fileRevisions)).toBeDefined();
            expect(modelParser.createParser(fileRevisionsModel)(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(modelParser.createParser(fileRevisionsModel)(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Group model', () => {
        it('can parse group info', () => {
            expect(modelParser.createParser(groupModel)(Mocks.group)).toBeDefined();
        });
        it('can parse a list of groups', () => {
            expect(modelParser.createParser(groupListModel)(Mocks.groupListing)).toBeDefined();
            expect(modelParser.createParser(groupListModel)(Mocks.groupListingSingle)).toBeDefined();
            expect(modelParser.createParser(groupListModel)(Mocks.groupListingEmpty)).toBeDefined();
        });
    });
    describe('Learning Path model', () => {
        it('can parse learning path', () => {
            expect(modelParser.createParser(learningPathModel)(Mocks.learningPath)).toBeDefined();
            expect(modelParser.createParser(learningPathModel)(Mocks.learningPathSinglePage)).toBeDefined();
            expect(modelParser.createParser(learningPathModel)(Mocks.learningPathNoPages)).toBeDefined();
        });
        it('can parse multiple learning paths', () => {
            expect(modelParser.createParser(learningPathsModel)(Mocks.learningPaths)).toBeDefined();
            expect(modelParser.createParser(learningPathsModel)(Mocks.learningPathsSingular)).toBeDefined();
        });
    });
    describe('Page model', () => {
        it('can parse page info', () => {
            expect(modelParser.createParser(pageModel)(Mocks.page)).toBeDefined();
            expect(modelParser.createParser(pageModel)(Mocks.pageInfo)).toBeDefined();
            expect(modelParser.createParser(pageModel)(Mocks.virtualPage)).toBeDefined();
            expect(modelParser.createParser(pageModel)(Mocks.draft)).toBeDefined();
        });
    });
    describe('Page contents model', () => {
        it('can parse page contents info', () => {
            expect(modelParser.createParser(pageContentsModel)(Mocks.pageContent)).toBeDefined();
            expect(modelParser.createParser(pageContentsModel)(Mocks.pageContentSimple)).toBeDefined();
            expect(modelParser.createParser(pageContentsModel)(Mocks.draftContent)).toBeDefined();
        });
    });
    describe('Page tree model', () => {
        it('can parse page tree info', () => {
            expect(modelParser.createParser(pageTreeModel)(Mocks.pageTree)).toBeDefined();
        });
    });
    describe('Page edit model', () => {
        it('can parse a page edit info', () => {
            expect(modelParser.createParser(pageEditModel)(Mocks.pageSetContents)).toBeDefined();
            expect(modelParser.createParser(pageEditModel)(Mocks.pageSetContentsConflict)).toBeDefined();
            expect(modelParser.createParser(pageEditModel)(Mocks.draftSetContents)).toBeDefined();
        });
    });
    describe('Page files model', () => {
        it('can parse page files info', () => {
            expect(modelParser.createParser(pageFilesModel)(Mocks.fileRevisions)).toBeDefined();
            expect(modelParser.createParser(pageFilesModel)(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(modelParser.createParser(pageFilesModel)(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Page move model', () => {
        it('can parse page move info', () => {
            expect(modelParser.createParser(pageMoveModel)(Mocks.pageMove)).toBeDefined();
            expect(modelParser.createParser(pageMoveModel)(Mocks.pageMoveSingle)).toBeDefined();
            expect(modelParser.createParser(pageMoveModel)(Mocks.pageMoveEmpty)).toBeDefined();
        });
    });
    describe('Page properties model', () => {
        it('can parse page proerty info', () => {
            expect(modelParser.createParser(pagePropertyModel)(Mocks.pageProperty)).toBeDefined();
            expect(modelParser.createParser(pagePropertyModel)(Mocks.pagePropertyPage)).toBeDefined();
        });
        it('can parse a list of page properties', () => {
            expect(modelParser.createParser(pagePropertiesModel)(Mocks.pageProperties)).toBeDefined();
            expect(modelParser.createParser(pagePropertiesModel)(Mocks.pagePropertiesSingle)).toBeDefined();
            expect(modelParser.createParser(pagePropertiesModel)(Mocks.pagePropertiesEmpty)).toBeDefined();
        });
    });
    describe('Page ratings model', () => {
        it('can parse page rating info', () => {
            expect(modelParser.createParser(pageRatingModel)(Mocks.pageRating)).toBeDefined();
        });
        it('can parse a list of page ratings', () => {
            expect(modelParser.createParser(pageRatingsModel)(Mocks.pageRatings)).toBeDefined();
            expect(modelParser.createParser(pageRatingsModel)(Mocks.pageRatingsSingle)).toBeDefined();
            expect(modelParser.createParser(pageRatingsModel)(Mocks.pageRatingsEmpty)).toBeDefined();
        });
    });
    describe('Page tags model', () => {
        it('can parse page tags info', () => {
            expect(modelParser.createParser(pageTagsModel)(Mocks.pageTags)).toBeDefined();
            expect(modelParser.createParser(pageTagsModel)(Mocks.pageTagsSingle)).toBeDefined();
            expect(modelParser.createParser(pageTagsModel)(Mocks.pageTagsEmpty)).toBeDefined();
        });
    });
    describe('Page history model', () => {
        it('can parse a list of page history event summary', () => {
            expect(modelParser.createParser(pageHistoryModel)(Mocks.pageEventSummary)).toBeDefined();
        });
        it('can parse a single page history event summary', () => {
            expect(modelParser.createParser(pageHistoryModel)(Mocks.pageEventSummarySingle)).toBeDefined();
        });
    });
    describe('Page history detail model', () => {
        it('can parse a single page history event detail', () => {
            expect(modelParser.createParser(pageHistoryDetailModel)(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Search model', () => {
        it('can parse search result info', () => {
            expect(modelParser.createParser(searchModel)(Mocks.search)).toBeDefined();
            expect(modelParser.createParser(searchModel)(Mocks.searchSingle)).toBeDefined();
            expect(modelParser.createParser(searchModel)(Mocks.searchEmpty)).toBeDefined();
            expect(modelParser.createParser(searchModel)(Mocks.searchSingleNoResultSummary)).toBeDefined();
        });
    });
    describe('Subpages model', () => {
        it('can parse subpages info', () => {
            expect(modelParser.createParser(subpagesModel)(Mocks.subpages)).toBeDefined();
            expect(modelParser.createParser(subpagesModel)(Mocks.subpagesSingle)).toBeDefined();
            expect(modelParser.createParser(subpagesModel)(Mocks.subpagesEmpty)).toBeDefined();
        });
    });
    describe('Users model', () => {
        it('can parse user info', () => {
            expect(modelParser.createParser(userModel)(Mocks.user)).toBeDefined();
        });
        it('can parse a list of users', () => {
            expect(modelParser.createParser(userListModel)(Mocks.users)).toBeDefined();
            expect(modelParser.createParser(userListModel)(Mocks.usersSingle)).toBeDefined();
            expect(modelParser.createParser(userListModel)(Mocks.userSearch)).toBeDefined();
            expect(modelParser.createParser(userListModel)(Mocks.userSearchSingle)).toBeDefined();
            expect(modelParser.createParser(userListModel)(Mocks.userSearchEmpty)).toBeDefined();
        });
    });
    describe('User activity model', () => {
        it('can parse a list of user activity events', () => {
            expect(modelParser.createParser(userActivityModel)(Mocks.userActivity)).toBeDefined();
            expect(modelParser.createParser(userActivityModel)(Mocks.userActivitySingle)).toBeDefined();
            expect(modelParser.createParser(userActivityModel)(Mocks.userActivityEmpty)).toBeDefined();
        });
    });
    describe('Event model', () => {
        it('can parse an event', () => {
            expect(modelParser.createParser(eventModel)(Mocks.event)).toBeDefined();
            expect(modelParser.createParser(eventModel)(Mocks.eventUserName)).toBeDefined();
        });
    });
    describe('Event detail model', () => {
        it('can parse an event detail', () => {
            expect(modelParser.createParser(userHistoryDetailModel)(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Event list model', () => {
        it('can parse an event list', () => {
            expect(modelParser.createParser(userHistoryModel)(Mocks.eventList)).toBeDefined();
        });
    });
    describe('Related pages model', () => {
        it('can parse a list of related pages', () => {
            expect(modelParser.createParser(relatedPagesModel)(Mocks.relatedPages)).toBeDefined();
            expect(modelParser.createParser(relatedPagesModel)(Mocks.relatedPagesSingle)).toBeDefined();
        });
    });
    describe('Site Tags model', () => {
        it('can parse a list of site tags', () => {
            expect(modelParser.createParser(siteTagsModelGet)(Mocks.siteTagsGet)).toBeDefined();
            expect(modelParser.createParser(siteTagsModelPost)(Mocks.siteTagsPost)).toBeDefined();
            expect(modelParser.createParser(siteTagsModelPost)('')).toBeDefined();
        });
    });
    describe('Workflows model', () => {
        it('can parse a workflow response', () => {
            expect(modelParser.createParser(workflowsModel)(Mocks.workflows)).toBeDefined();
        });
    });
});
