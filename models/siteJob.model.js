import { userModel } from './user.model.js';

const siteJobModel = [
    { field: '@id', name: 'id' },
    { field: '@type', name: 'type' },
    { field: '@status', name: 'status' },
    { field: 'lastmodified', name: 'lastModified', transform: 'date' },
    { field: 'submitted', transform: 'date' },
    { field: 'started', transform: 'date' },
    { field: 'user', transform: userModel },
    { field: 'completeditems', name: 'completedItems', transform: 'number' },
    { field: 'totalitems', name: 'totalItems', transform: 'number' }
];
const siteJobsModel = [{ field: 'job', name: 'jobs', isArray: true, transform: siteJobModel }];

export { siteJobModel, siteJobsModel };
