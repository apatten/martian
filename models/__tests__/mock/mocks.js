import { dataMock } from './data.mock.js';
import { contextIdMock } from './contextId.mock.js';
import { draftsMock } from './drafts.mock.js';
import { eventsMock } from './events.mock.js';
import { fileMock } from './file.mock.js';
import { groupMock } from './group.mock.js';
import { learningPathMock } from './learningPath.mock.js';
import { pageMock } from './page.mock.js';
import { pagePropertyMock } from './pageProperty.mock.js';
import { searchMock } from './search.mock.js';
import { siteMock } from './site.mock.js';
import { userMock } from './user.mock.js';
import { workflowsMock } from './workflows.mock.js';

const mockLibs = [
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
    siteMock,
    userMock,
    workflowsMock
];
const Mocks = {};
mockLibs.forEach((lib) => {
    Object.keys(lib).forEach((libKey) => {
        Mocks[libKey] = lib[libKey];
    });
});
export { Mocks };
