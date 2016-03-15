import {contextIdModel} from 'models/contextId.model';
import {contextIdsModel} from 'models/contextIds.model';
import {contextMapModel} from 'models/contextMap.model';
import {contextMapsModel} from 'models/contextMaps.model';
import {draftModel} from 'models/draft.model';
import {fileModel} from 'models/file.model';
import {fileRevisionsModel} from 'models/fileRevisions.model';
import {groupModel} from 'models/group.model';
import {groupListModel} from 'models/groupList.model';
import {learningPathModel} from 'models/learningPath.model';
import {learningPathsModel} from 'models/learningPaths.model';
import {pageModel} from 'models/page.model';
import {pageContentsModel} from 'models/pageContents.model';
import {pageTreeModel} from 'models/pageTree.model';
import {pageEditModel} from 'models/pageEdit.model';
import {pageFilesModel} from 'models/pageFiles.model';
import {pageMoveModel} from 'models/pageMove.model';
import {pagePropertyModel} from 'models/pageProperty.model';
import {pagePropertiesModel} from 'models/pageProperties.model';
import {pageRatingModel} from 'models/pageRating.model';
import {pageRatingsModel} from 'models/pageRatings.model';
import {pageTagsModel} from 'models/pageTags.model';
import {searchModel} from 'models/search.model';
import {subpagesModel} from 'models/subpages.model';
import {userModel} from 'models/user.model';
import {userListModel} from 'models/userList.model';
describe('Models', () => {
    describe('Context ID models', () => {
        it('can parse a context ID', () => {
            expect(contextIdModel.parse(Mocks.contextIdDefinition)).toBeDefined();
            expect(contextIdModel.parse(Mocks.contextIdDefinitionsSingle)).toBeDefined();
        });
        it('can parse a list of context IDs', () => {
            expect(contextIdsModel.parse(Mocks.contextIdDefinitions)).toBeDefined();
            expect(contextIdsModel.parse(Mocks.contextIdDefinitionsSingle)).toBeDefined();
            expect(contextIdsModel.parse('')).toBeDefined();
        });
        it('can parse a context map', () => {
            expect(contextMapModel.parse(Mocks.contextMap)).toBeDefined();
            expect(contextMapModel.parse(Mocks.contextMapVerbose)).toBeDefined();
        });
        it('can parse a list of context maps', () => {
            expect(contextMapsModel.parse(Mocks.contextMaps)).toBeDefined();
            expect(contextMapsModel.parse(Mocks.contextMapsSingleLanguage)).toBeDefined();
            expect(contextMapsModel.parse(Mocks.contextMapSingleSingle)).toBeDefined();
            expect(contextMapsModel.parse(Mocks.contextMapsEmpty)).toBeDefined();
        });
    });
    describe('Draft model', () => {
        it('can parse draft info', () => {
            expect(draftModel.parse(Mocks.draft)).toBeDefined();
            expect(draftModel.parse(Mocks.draftBasic)).toBeDefined();
        });
    });
    describe('File model', () => {
        it('can parse file info', () => {
            expect(fileModel.parse(Mocks.file)).toBeDefined();
            expect(fileModel.parse(Mocks.fileReduced)).toBeDefined();
        });
        it('can parse a list of file revisions', () => {
            expect(fileRevisionsModel.parse(Mocks.fileRevisions)).toBeDefined();
            expect(fileRevisionsModel.parse(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(fileRevisionsModel.parse(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Group model', () => {
        it('can parse group info', () => {
            expect(groupModel.parse(Mocks.group)).toBeDefined();
        });
        it('can parse a list of groups', () => {
            expect(groupListModel.parse(Mocks.groupListing)).toBeDefined();
            expect(groupListModel.parse(Mocks.groupListingSingle)).toBeDefined();
            expect(groupListModel.parse(Mocks.groupListingEmpty)).toBeDefined();
        });
    });
    describe('Learning Path model', () => {
        it('can parse learning path', () => {
            expect(learningPathModel.parse(Mocks.learningPath)).toBeDefined();
            expect(learningPathModel.parse(Mocks.learningPathSinglePage)).toBeDefined();
            expect(learningPathModel.parse(Mocks.learningPathNoPages)).toBeDefined();
        });
        it('can parse multiple learning paths', () => {
            expect(learningPathsModel.parse(Mocks.learningPaths)).toBeDefined();
            expect(learningPathsModel.parse(Mocks.learningPathsSingular)).toBeDefined();
        });
    });
    describe('Page model', () => {
        it('can parse page info', () => {
            expect(pageModel.parse(Mocks.page)).toBeDefined();
            expect(pageModel.parse(Mocks.pageInfo)).toBeDefined();
            expect(pageModel.parse(Mocks.virtualPage)).toBeDefined();
        });
    });
    describe('Page contents model', () => {
        it('can parse page contents info', () => {
            expect(pageContentsModel.parse(Mocks.pageContent)).toBeDefined();
            expect(pageContentsModel.parse(Mocks.pageContentSimple)).toBeDefined();
            expect(pageContentsModel.parse(Mocks.draftContent)).toBeDefined();
        });
    });
    describe('Page tree model', () => {
        it('can parse page tree info', () => {
            expect(pageTreeModel.parse(Mocks.pageTree)).toBeDefined();
        });
    });
    describe('Page edit model', () => {
        it('can parse a page edit info', () => {
            expect(pageEditModel.parse(Mocks.pageSetContents)).toBeDefined();
            expect(pageEditModel.parse(Mocks.pageSetContentsConflict)).toBeDefined();
            expect(pageEditModel.parse(Mocks.draftSetContents)).toBeDefined();
        });
    });
    describe('Page files model', () => {
        it('can parse page files info', () => {
            expect(pageFilesModel.parse(Mocks.fileRevisions)).toBeDefined();
            expect(pageFilesModel.parse(Mocks.fileRevisionsSingle)).toBeDefined();
            expect(pageFilesModel.parse(Mocks.fileRevisionsEmpty)).toBeDefined();
        });
    });
    describe('Page move model', () => {
        it('can parse page move info', () => {
            expect(pageMoveModel.parse(Mocks.pageMove)).toBeDefined();
            expect(pageMoveModel.parse(Mocks.pageMoveSingle)).toBeDefined();
            expect(pageMoveModel.parse(Mocks.pageMoveEmpty)).toBeDefined();
        });
    });
    describe('Page properties model', () => {
        it('can parse page proerty info', () => {
            expect(pagePropertyModel.parse(Mocks.pageProperty)).toBeDefined();
            expect(pagePropertyModel.parse(Mocks.pagePropertyPage)).toBeDefined();
        });
        it('can parse a list of page properties', () => {
            expect(pagePropertiesModel.parse(Mocks.pageProperties)).toBeDefined();
            expect(pagePropertiesModel.parse(Mocks.pagePropertiesSingle)).toBeDefined();
            expect(pagePropertiesModel.parse(Mocks.pagePropertiesEmpty)).toBeDefined();
        });
    });
    describe('Page ratings model', () => {
        it('can parse page rating info', () => {
            expect(pageRatingModel.parse(Mocks.pageRating)).toBeDefined();
        });
        it('can parse a list of page ratings', () => {
            expect(pageRatingsModel.parse(Mocks.pageRatings)).toBeDefined();
            expect(pageRatingsModel.parse(Mocks.pageRatingsSingle)).toBeDefined();
            expect(pageRatingsModel.parse(Mocks.pageRatingsEmpty)).toBeDefined();
        });
    });
    describe('Page tags model', () => {
        it('can parse page tags info', () => {
            expect(pageTagsModel.parse(Mocks.pageTags)).toBeDefined();
            expect(pageTagsModel.parse(Mocks.pageTagsSingle)).toBeDefined();
            expect(pageTagsModel.parse(Mocks.pageTagsEmpty)).toBeDefined();
        });
    });
    describe('Search model', () => {
        it('can parse search result info', () => {
            expect(searchModel.parse(Mocks.search)).toBeDefined();
            expect(searchModel.parse(Mocks.searchSingle)).toBeDefined();
            expect(searchModel.parse(Mocks.searchEmpty)).toBeDefined();
            expect(searchModel.parse(Mocks.searchSingleNoResultSummary)).toBeDefined();
        });
    });
    describe('Subpages model', () => {
        it('can parse subpages info', () => {
            expect(subpagesModel.parse(Mocks.subpages)).toBeDefined();
            expect(subpagesModel.parse(Mocks.subpagesSingle)).toBeDefined();
            expect(subpagesModel.parse(Mocks.subpagesEmpty)).toBeDefined();
        });
    });
    describe('Users model', () => {
        it('can parse user info', () => {
            expect(userModel.parse(Mocks.user)).toBeDefined();
        });
        it('can parse a list of users', () => {
            expect(userListModel.parse(Mocks.users)).toBeDefined();
            expect(userListModel.parse(Mocks.usersSingle)).toBeDefined();
            expect(userListModel.parse(Mocks.userSearch)).toBeDefined();
            expect(userListModel.parse(Mocks.userSearchSingle)).toBeDefined();
            expect(userListModel.parse(Mocks.userSearchEmpty)).toBeDefined();
        });
    });
});
