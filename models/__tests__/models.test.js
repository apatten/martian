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
import { workflowsModel } from '../workflows.model.js';

const contextIdModelParser = modelParser.createParser(contextIdModel);
const contextIdsModelParser = modelParser.createParser(contextIdsModel);
const contextMapModelParser = modelParser.createParser(contextMapModel);
const contextMapsModelParser = modelParser.createParser(contextMapsModel);
const fileModelParser = modelParser.createParser(fileModel);
const fileRevisionsModelParser = modelParser.createParser(fileRevisionsModel);
const groupModelParser = modelParser.createParser(groupModel);
const groupListModelParser = modelParser.createParser(groupListModel);
const learningPathModelParser = modelParser.createParser(learningPathModel);
const learningPathsModelParser = modelParser.createParser(learningPathsModel);
const pageModelParser = modelParser.createParser(pageModel);
const pageContentsModelParser = modelParser.createParser(pageContentsModel);
const pageEditModelParser = modelParser.createParser(pageEditModel);
const pageFilesModelParser = modelParser.createParser(pageFilesModel);
const pageMoveModelParser = modelParser.createParser(pageMoveModel);
const pagePropertyModelParser = modelParser.createParser(pagePropertyModel);
const pagePropertiesModelParser = modelParser.createParser(pagePropertiesModel);
const pageRatingModelParser = modelParser.createParser(pageRatingModel);
const pageRatingsModelParser = modelParser.createParser(pageRatingsModel);
const pageTagsModelParser = modelParser.createParser(pageTagsModel);
const searchModelParser = modelParser.createParser(searchModel);
const subpagesModelParser = modelParser.createParser(subpagesModel);
const userModelParser = modelParser.createParser(userModel);
const userListModelParser = modelParser.createParser(userListModel);
const userActivityModelParser = modelParser.createParser(userActivityModel);
const eventModelParser = modelParser.createParser(eventModel);
const userHistoryDetailModelParser = modelParser.createParser(userHistoryDetailModel);
const userHistoryModelParser = modelParser.createParser(userHistoryModel);
const relatedPagesModelParser = modelParser.createParser(relatedPagesModel);
const pageHistoryModelParser = modelParser.createParser(pageHistoryModel);
const pageHistoryDetailModelParser = modelParser.createParser(pageHistoryDetailModel);
const workflowsModelParser = modelParser.createParser(workflowsModel);

describe('Models', () => {
    describe('Context ID models', () => {
        it('can parse a context ID', () => {
            expect(contextIdModelParser(Mocks.contextIdDefinition)).toBeDefined();
            expect(contextIdModelParser(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a list of context IDs', () => {
            expect(contextIdsModelParser(Mocks.contextIdDefinitions)).toBeDefined();
            expect(contextIdsModelParser(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a context map', () => {
            expect(contextMapModelParser(Mocks.contextMap)).toBeDefined();
            expect(contextMapModelParser(Mocks.contextMapVerbose)).toBeDefined();
        });
        it('can parse a list of context maps', () => {
            expect(contextMapsModelParser(Mocks.contextMaps)).toBeDefined();
            expect(contextMapsModelParser(Mocks.contextMapsSingleLanguage)).toBeDefined();
            expect(contextMapsModelParser(Mocks.contextMapSingleSingle)).toBeDefined();
            expect(contextMapsModelParser(Mocks.contextMapsEmpty)).toBeDefined();
        });
    });
    describe('File model', () => {
        it('can parse file info', () => {
            expect(fileModelParser(Mocks.file)).toBeDefined();
            expect(fileModelParser(Mocks.fileReduced)).toBeDefined();
        });
        it('can parse a list of file revisions', () => {
            expect(fileRevisionsModelParser(Mocks.fileRevisions)).toBeDefined();
            expect(fileRevisionsModelParser(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(fileRevisionsModelParser(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Group model', () => {
        it('can parse group info', () => {
            expect(groupModelParser(Mocks.group)).toBeDefined();
        });
        it('can parse a list of groups', () => {
            expect(groupListModelParser(Mocks.groupListing)).toBeDefined();
            expect(groupListModelParser(Mocks.groupListingSingle)).toBeDefined();
            expect(groupListModelParser(Mocks.groupListingEmpty)).toBeDefined();
        });
    });
    describe('Learning Path model', () => {
        it('can parse learning path', () => {
            expect(learningPathModelParser(Mocks.learningPath)).toBeDefined();
            expect(learningPathModelParser(Mocks.learningPathSinglePage)).toBeDefined();
            expect(learningPathModelParser(Mocks.learningPathNoPages)).toBeDefined();
        });
        it('can parse multiple learning paths', () => {
            expect(learningPathsModelParser(Mocks.learningPaths)).toBeDefined();
            expect(learningPathsModelParser(Mocks.learningPathsSingular)).toBeDefined();
        });
    });
    describe('Page model', () => {
        it('can parse page info', () => {
            expect(pageModelParser(Mocks.page)).toBeDefined();
            expect(pageModelParser(Mocks.pageInfo)).toBeDefined();
            expect(pageModelParser(Mocks.virtualPage)).toBeDefined();
            expect(pageModelParser(Mocks.draft)).toBeDefined();
        });
    });
    describe('Page contents model', () => {
        it('can parse page contents info', () => {
            expect(pageContentsModelParser(Mocks.pageContent)).toBeDefined();
            expect(pageContentsModelParser(Mocks.pageContentSimple)).toBeDefined();
            expect(pageContentsModelParser(Mocks.draftContent)).toBeDefined();
        });
    });
    describe('Page tree model', () => {
        it('can parse page tree info', () => {
            expect(modelParser.createParser(pageTreeModel)(Mocks.pageTree)).toBeDefined();
        });
    });
    describe('Page edit model', () => {
        it('can parse a page edit info', () => {
            expect(pageEditModelParser(Mocks.pageSetContents)).toBeDefined();
            expect(pageEditModelParser(Mocks.pageSetContentsConflict)).toBeDefined();
            expect(pageEditModelParser(Mocks.draftSetContents)).toBeDefined();
        });
    });
    describe('Page files model', () => {
        it('can parse page files info', () => {
            expect(pageFilesModelParser(Mocks.fileRevisions)).toBeDefined();
            expect(pageFilesModelParser(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(pageFilesModelParser(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Page move model', () => {
        it('can parse page move info', () => {
            expect(pageMoveModelParser(Mocks.pageMove)).toBeDefined();
            expect(pageMoveModelParser(Mocks.pageMoveSingle)).toBeDefined();
            expect(pageMoveModelParser(Mocks.pageMoveEmpty)).toBeDefined();
        });
    });
    describe('Page properties model', () => {
        it('can parse page proerty info', () => {
            expect(pagePropertyModelParser(Mocks.pageProperty)).toBeDefined();
            expect(pagePropertyModelParser(Mocks.pagePropertyPage)).toBeDefined();
        });
        it('can parse a list of page properties', () => {
            expect(pagePropertiesModelParser(Mocks.pageProperties)).toBeDefined();
            expect(pagePropertiesModelParser(Mocks.pagePropertiesSingle)).toBeDefined();
            expect(pagePropertiesModelParser(Mocks.pagePropertiesEmpty)).toBeDefined();
        });
    });
    describe('Page ratings model', () => {
        it('can parse page rating info', () => {
            expect(pageRatingModelParser(Mocks.pageRating)).toBeDefined();
        });
        it('can parse a list of page ratings', () => {
            expect(pageRatingsModelParser(Mocks.pageRatings)).toBeDefined();
            expect(pageRatingsModelParser(Mocks.pageRatingsSingle)).toBeDefined();
            expect(pageRatingsModelParser(Mocks.pageRatingsEmpty)).toBeDefined();
        });
    });
    describe('Page tags model', () => {
        it('can parse page tags info', () => {
            expect(pageTagsModelParser(Mocks.pageTags)).toBeDefined();
            expect(pageTagsModelParser(Mocks.pageTagsSingle)).toBeDefined();
            expect(pageTagsModelParser(Mocks.pageTagsEmpty)).toBeDefined();
        });
    });
    describe('Page history model', () => {
        it('can parse a list of page history event summary', () => {
            expect(pageHistoryModelParser(Mocks.pageEventSummary)).toBeDefined();
        });
        it('can parse a single page history event summary', () => {
            expect(pageHistoryModelParser(Mocks.pageEventSummarySingle)).toBeDefined();
        });
    });
    describe('Page history detail model', () => {
        it('can parse a single page history event detail', () => {
            expect(pageHistoryDetailModelParser(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Search model', () => {
        it('can parse search result info', () => {
            expect(searchModelParser(Mocks.search)).toBeDefined();
            expect(searchModelParser(Mocks.searchSingle)).toBeDefined();
            expect(searchModelParser(Mocks.searchEmpty)).toBeDefined();
            expect(searchModelParser(Mocks.searchSingleNoResultSummary)).toBeDefined();
        });
    });
    describe('Subpages model', () => {
        it('can parse subpages info', () => {
            expect(subpagesModelParser(Mocks.subpages)).toBeDefined();
            expect(subpagesModelParser(Mocks.subpagesSingle)).toBeDefined();
            expect(subpagesModelParser(Mocks.subpagesEmpty)).toBeDefined();
        });
    });
    describe('Users model', () => {
        it('can parse user info', () => {
            expect(userModelParser(Mocks.user)).toBeDefined();
        });
        it('can parse a list of users', () => {
            expect(userListModelParser(Mocks.users)).toBeDefined();
            expect(userListModelParser(Mocks.usersSingle)).toBeDefined();
            expect(userListModelParser(Mocks.userSearch)).toBeDefined();
            expect(userListModelParser(Mocks.userSearchSingle)).toBeDefined();
            expect(userListModelParser(Mocks.userSearchEmpty)).toBeDefined();
        });
    });
    describe('User activity model', () => {
        it('can parse a list of user activity events', () => {
            expect(userActivityModelParser(Mocks.userActivity)).toBeDefined();
            expect(userActivityModelParser(Mocks.userActivitySingle)).toBeDefined();
            expect(userActivityModelParser(Mocks.userActivityEmpty)).toBeDefined();
        });
    });
    describe('Event model', () => {
        it('can parse an event', () => {
            expect(eventModelParser(Mocks.event)).toBeDefined();
            expect(eventModelParser(Mocks.eventUserName)).toBeDefined();
        });
    });
    describe('Event detail model', () => {
        it('can parse an event detail', () => {
            expect(userHistoryDetailModelParser(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Event list model', () => {
        it('can parse an event list', () => {
            expect(userHistoryModelParser(Mocks.eventList)).toBeDefined();
        });
    });
    describe('Related pages model', () => {
        it('can parse a list of related pages', () => {
            expect(relatedPagesModelParser(Mocks.relatedPages)).toBeDefined();
            expect(relatedPagesModelParser(Mocks.relatedPagesSingle)).toBeDefined();
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
            expect(workflowsModelParser(Mocks.workflows)).toBeDefined();
        });
    });
});
