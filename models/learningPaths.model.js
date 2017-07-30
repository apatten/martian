import { learningPathModel } from './learningPath.model.js';

export const learningPathsModel = [
    { field: 'learningpath', name: 'learningPaths', isArray: true, transform: learningPathModel }
];
