import { dataMock } from './data.mock';
import { contextIdMock } from './contextId.mock';
import { draftsMock } from './drafts.mock';
import { eventsMock } from './events.mock';
import { fileMock } from './file.mock';
import { groupMock } from './group.mock';
import { learningPathMock } from './learningPath.mock';
import { pageMock } from './page.mock';
import { pagePropertyMock } from './pageProperty.mock';
import { searchMock } from './search.mock';
import { userMock } from './user.mock';

let mockLibs = [
    dataMock,
    contextIdMock,
    draftsMock,
    eventsMock,
    fileMock,
    groupMock,
    learningPathMock,
    pageMock,
    pagePropertyMock,
    searchMock,
    userMock
];
let Mocks = {};
mockLibs.forEach((lib) => {
    Object.keys(lib).forEach((libKey) => {
        Mocks[libKey] = lib[libKey];
    });
});
export { Mocks };
