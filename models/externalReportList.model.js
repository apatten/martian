import { externalReportModel } from './externalReport.model.js';

export const externalReportListModel = [
    { field: 'external-report', name: 'external-reports', isArray: true, transform: externalReportModel }
];
