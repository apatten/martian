/* eslint-env jest, jasmine */
jest.unmock('../siteJob.js');
import { SiteJobManager, SiteJob } from '../siteJob.js';

describe('Site Jobs', () => {
    describe('Manager', () => {
        describe('constructor', () => {
            it('can create a new SiteJobs object', () => {
                const sj = new SiteJobManager();
                expect(sj).toBeDefined();
            });
        });
        describe('jobs operations', () => {
            let sj = null;
            beforeEach(() => {
                sj = new SiteJobManager();
            });
            afterEach(() => {
                sj = null;
            });
            it('can get the jobs status', () => {
                return sj.getJobsStatuses();
            });
        });
        describe('export scheduler', () => {
            let sj = null;
            beforeEach(() => {
                sj = new SiteJobManager();
            });
            afterEach(() => {
                sj = null;
            });
            it('can schedule an export job (all params)', () => {
                const exportParams = {
                    email: 'foo@bar.com',
                    url: 'http://www.example.com',
                    pages: [
                        { path: 'path/to/page/1', id: 1, includeSubpages: true },
                        { path: 'path/to/page/2', id: 2, includeSubpages: false }
                    ]
                };
                return sj.scheduleExport(exportParams);
            });
            it('can schedule an export job (page path only)', () => {
                const exportParams = {
                    url: 'http://www.example.com',
                    pages: [ { path: 'path/to/page/1' } ]
                };
                return sj.scheduleExport(exportParams);
            });
            it('can schedule an export job (page ID only)', () => {
                const exportParams = {
                    email: 'foo@bar.com',
                    pages: [ { id: 1 } ]
                };
                return sj.scheduleExport(exportParams);
            });
            it('can fail when scheduling an export with missing options', () => {
                const success = jest.fn();
                return sj.scheduleExport().then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an export with missing notification options', () => {
                const success = jest.fn();
                return sj.scheduleExport({}).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an export with missing pages option', () => {
                const success = jest.fn();
                return sj.scheduleExport({ email: 'foo@bar.com' }).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an export with a non-array pages option', () => {
                const success = jest.fn();
                return sj.scheduleExport({ email: 'foo@bar.com', pages: 'this is clearly a string' }).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
        describe('import scheduler', () => {
            let sj = null;
            beforeEach(() => {
                sj = new SiteJobManager();
            });
            afterEach(() => {
                sj = null;
            });
            it('can schedule an import job (all params)', () => {
                const importParams = {
                    email: 'foo@bar.com',
                    url: 'http://www.example.com',
                    archiveUrl: 'http://www.example.org',
                    dryRun: true
                };
                return sj.scheduleImport(importParams);
            });
            it('can schedule an import job (email only)', () => {
                const importParams = {
                    email: 'foo@bar.com',
                    archiveUrl: 'http://www.example.org'
                };
                return sj.scheduleImport(importParams);
            });
            it('can schedule an import job (url only)', () => {
                const importParams = {
                    url: 'http://bar.com',
                    archiveUrl: 'http://www.example.org'
                };
                return sj.scheduleImport(importParams);
            });
            it('can fail when scheduling an import with missing options', () => {
                const success = jest.fn();
                return sj.scheduleImport().then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an export with missing notification options', () => {
                const success = jest.fn();
                return sj.scheduleImport({}).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an import with missing archiveUrl option', () => {
                const success = jest.fn();
                return sj.scheduleImport({ email: 'foo@bar.com' }).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when scheduling an import with invalid archiveUrl option', () => {
                const success = jest.fn();
                return sj.scheduleImport({ email: 'foo@bar.com', archiveUrl: '' }).then(() => {
                    success();
                    throw new Error('Promise resolved');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
    });
    describe('Instance', () => {
        describe('constructor', () => {
            it('can construct a SiteJob', () => {
                const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
                expect(sj).toBeDefined();
            });
            it('can fail construction if the Job ID is invalid', () => {
                expect(() => new SiteJob()).toThrow();
                expect(() => new SiteJob(123456)).toThrow();
            });
        });
        describe('operations', () => {
            let sj;
            beforeEach(() => {
                sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
            });
            afterEach(() => {
                sj = null;
            });
            it('can get the status of a site job', () => {
                return sj.getStatus();
            });
            it('can cancel a job', () => {
                return sj.cancel();
            });
        });
    });
});
