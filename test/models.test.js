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
import { modelParser } from '../lib/modelParser';
import { contextIdModel } from '../models/contextId.model';
import { contextIdsModel } from '../models/contextIds.model';
import { contextMapModel } from '../models/contextMap.model';
import { contextMapsModel } from '../models/contextMaps.model';
import { fileModel } from '../models/file.model';
import { fileRevisionsModel } from '../models/fileRevisions.model';
import { groupModel } from '../models/group.model';
import { groupListModel } from '../models/groupList.model';
import { learningPathModel } from '../models/learningPath.model';
import { learningPathsModel } from '../models/learningPaths.model';
import { pageModel } from '../models/page.model';
import { pageContentsModel } from '../models/pageContents.model';
import { pageTreeModel } from '../models/pageTree.model';
import { pageEditModel } from '../models/pageEdit.model';
import { pageFilesModel } from '../models/pageFiles.model';
import { pageMoveModel } from '../models/pageMove.model';
import { pagePropertyModel } from '../models/pageProperty.model';
import { pagePropertiesModel } from '../models/pageProperties.model';
import { pageRatingModel } from '../models/pageRating.model';
import { pageRatingsModel } from '../models/pageRatings.model';
import { pageTagsModel } from '../models/pageTags.model';
import { searchModel } from '../models/search.model';
import { subpagesModel } from '../models/subpages.model';
import { userModel } from '../models/user.model';
import { userListModel } from '../models/userList.model';
import { userActivityModel } from '../models/userActivity.model';
import { eventModel } from '../models/event.model';
import { eventDetailModel } from '../models/eventDetail.model';
import { eventListModel } from '../models/eventList.model';
import { relatedPagesModel } from '../models/relatedPages.model';

let contextIdModelParser = modelParser.createParser(contextIdModel);
let contextIdsModelParser = modelParser.createParser(contextIdsModel);
let contextMapModelParser = modelParser.createParser(contextMapModel);
let contextMapsModelParser = modelParser.createParser(contextMapsModel);
let fileModelParser = modelParser.createParser(fileModel);
let fileRevisionsModelParser = modelParser.createParser(fileRevisionsModel);
let groupModelParser = modelParser.createParser(groupModel);
let groupListModelParser = modelParser.createParser(groupListModel);
let learningPathModelParser = modelParser.createParser(learningPathModel);
let learningPathsModelParser = modelParser.createParser(learningPathsModel);
let pageModelParser = modelParser.createParser(pageModel);
let pageContentsModelParser = modelParser.createParser(pageContentsModel);
let pageTreeModelParser = modelParser.createParser(pageTreeModel);
let pageEditModelParser = modelParser.createParser(pageEditModel);
let pageFilesModelParser = modelParser.createParser(pageFilesModel);
let pageMoveModelParser = modelParser.createParser(pageMoveModel);
let pagePropertyModelParser = modelParser.createParser(pagePropertyModel);
let pagePropertiesModelParser = modelParser.createParser(pagePropertiesModel);
let pageRatingModelParser = modelParser.createParser(pageRatingModel);
let pageRatingsModelParser = modelParser.createParser(pageRatingsModel);
let pageTagsModelParser = modelParser.createParser(pageTagsModel);
let searchModelParser = modelParser.createParser(searchModel);
let subpagesModelParser = modelParser.createParser(subpagesModel);
let userModelParser = modelParser.createParser(userModel);
let userListModelParser = modelParser.createParser(userListModel);
let userActivityModelParser = modelParser.createParser(userActivityModel);
let eventModelParser = modelParser.createParser(eventModel);
let eventDetailModelParser = modelParser.createParser(eventDetailModel);
let eventListModelParser = modelParser.createParser(eventListModel);
let relatedPagesModelParser = modelParser.createParser(relatedPagesModel);

describe('Models', () => {
    describe('Context ID models', () => {
        it('can parse a context ID', () => {
            expect(contextIdModelParser(Mocks.contextIdDefinition)).toBeDefined();
            expect(contextIdModelParser(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a list of context IDs', () => {
            expect(contextIdsModelParser(Mocks.contextIdDefinitions)).toBeDefined();
            expect(contextIdsModelParser(Mocks.contextIdDefinitionsSingle)).toBeDefined();
            expect(contextIdsModelParser('')).toBeDefined();
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
            expect(pageTreeModelParser(Mocks.pageTree)).toBeDefined();
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
            expect(eventDetailModelParser(Mocks.eventDetail)).toBeDefined();
        });
    });
    describe('Event list model', () => {
        it('can parse an event list', () => {
            expect(eventListModelParser(Mocks.eventList)).toBeDefined();
        });
    });
    describe('Related pages model', () => {
        it('can parse a list of related pages', () => {
            expect(relatedPagesModelParser(Mocks.relatedPages)).toBeDefined();
            expect(relatedPagesModelParser(Mocks.relatedPagesSingle)).toBeDefined();
        });
    });
});
