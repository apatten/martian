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
jest.unmock('../pageBase.js');
jest.unmock('../page.js');
import { Page, PageManager } from '../page.js';

describe('Page', () => {
    describe('constructor tests', () => {
        it('can construct a new Page object using page ID', () => {
            var page = new Page(123);
            expect(page).toBeDefined();
        });
        it('can construct a new Page object using page path', () => {
            var page = new Page('foo/bar');
            expect(page).toBeDefined();
        });
        it('can construct a new Page object using \'home\'', () => {
            var page = new Page('home');
            expect(page).toBeDefined();
        });
        it('can construct a new Page object defaulting to \'home\'', () => {
            var page = new Page();
            expect(page).toBeDefined();
        });
        it('can fail if the constructor is not called correctly', () => {
            expect(() => Page()).toThrow();
        });
    });
    describe('get stuff tests', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
        });
        afterEach(() => {
            page = null;
        });
        it('can get the simple page info', () => {
            return page.getInfo();
        });
        it('can get the simple page info with params', () => {
            return page.getInfo({ exclude: 'revision' });
        });
        it('can get the page info', () => {
            return page.getFullInfo();
        });
        it('can get the page info with params', () => {
            return page.getFullInfo({ t: Date.now() });
        });
        it('can get the page contents', () => {
            return page.getContents();
        });
        it('can get the subpages', () => {
            return page.getSubpages();
        });
        it('can get the page tree', () => {
            return page.getTree();
        });
        it('can get the tags', () => {
            return page.getTags();
        });
        it('can get the user rating', () => {
            return page.getRating();
        });
        it('can fetch a template rendered in the context of the Page', () => {
            return page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage');
        });
        it('can fetch a template rendered in the context of the Page with supplied options', () => {
            return page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage', { includes: 'overview' });
        });
        it('can fetch the page\'s files with default options', () => {
            return page.getFiles();
        });
        it('can fetch the page\'s files with supplied options', () => {
            return page.getFiles({ limit: 200 });
        });
        it('can get the related pages', () => {
            return page.getRelated();
        });
        it('can get the related pages (with params)', () => {
            return page.getRelated({ overview: true });
        });
        it('can get the page overview', () => {
            return page.getOverview();
        });
        it('can get the page export information', () => {
            return page.getExportInformation();
        });
        it('can get the diff for a page', () => {
            return page.getDiff({ previous: 'b5f8fd4e-d84e-11e6-8e3d-54e94a010000' });
        });
        it('can get the diff for a page ("all" format)', () => {
            return page.getDiff({ previous: 'b5f8fd4e-d84e-11e6-8e3d-54e94a010000', includeVersions: true });
        });
        describe('getDiff failures', () => {
            const failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('no params', () => {
                return page.getDiff().catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid previous', () => {
                return page.getDiff({ previous: [] }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid revision', () => {
                return page.getDiff({ previous: 21, revision: true }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid format', () => {
                return page.getDiff({ previous: 21, format: 100 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid includeVersions', () => {
                return page.getDiff({ previous: 21, includeVersions: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
        it('can export the page as a PDF (no params)', () => {
            return page.exportPdf();
        });
        it('can export the page as a PDF (all params)', () => {
            return page.exportPdf({ fileName: 'foo.pdf', format: 'html', stylesheet: 'foo.css', deep: true, showToc: true, dryRun: true });
        });
        describe('PDF export failures', () => {
            const failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('invalid fileName', () => {
                return page.exportPdf({ fileName: 132 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid stylesheet', () => {
                return page.exportPdf({ stylesheet: [ 132 ] }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid format', () => {
                return page.exportPdf({ format: 'peedeeeff' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid deep', () => {
                return page.exportPdf({ deep: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid showToc', () => {
                return page.exportPdf({ showToc: {} }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid dryRun', () => {
                return page.exportPdf({ dryRun: [] }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
        it('can get link details (no params)', () => {
            return page.getLinkDetails();
        });
        it('can get link details (all params)', () => {
            return page.getLinkDetails({ includeSubpages: true, linkTypes: [ 'foo', 'bar' ], broken: false, redirect: true, limit: 99, offset: 98 });
        });
        describe('link details failures', () => {
            const failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('invalid includeSubpages', () => {
                return page.getLinkDetails({ includeSubpages: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid linkTypes', () => {
                return page.getLinkDetails({ linkTypes: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid broken', () => {
                return page.getLinkDetails({ broken: 123 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid redirect', () => {
                return page.getLinkDetails({ redirect: 123 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid limit', () => {
                return page.getLinkDetails({ limit: true }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid offset', () => {
                return page.getLinkDetails({ offset: {} }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
        it('can get the health inspections (no parameters)', () => {
            return page.getHealthInspections();
        });
        it('can get the health inspections (all parameters)', () => {
            return page.getHealthInspections({ analyzers: [ 'foo', 'bar' ], severities: [ 'foo', 'bar' ], includeSubpages: true, limit: 400, offset: 100 });
        });
        describe('link details failures', () => {
            const failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('invalid includeSubpages', () => {
                return page.getHealthInspections({ includeSubpages: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid analyzers', () => {
                return page.getHealthInspections({ analyzers: 'true' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid severities', () => {
                return page.getHealthInspections({ severities: 123 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid limit', () => {
                return page.getHealthInspections({ limit: true }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid offset', () => {
                return page.getHealthInspections({ offset: {} }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
    });
    describe('page rating', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
        });
        afterEach(() => {
            page = null;
        });
        it('can rate a page', () => {
            return page.rate(1);
        });
        it('can rate a page; sending in the old rating', () => {
            return page.rate(1, 0);
        });
        it('can reset a page rating implicitly', () => {
            return page.rate();
        });
        it('can fail for invalid page rating values', () => {
            expect(() => page.rate('foo')).toThrow();
            expect(() => page.rate(10)).toThrow();
            expect(() => page.rate({ score: 1 })).toThrow();
            expect(() => page.rate(1, 'foo')).toThrow();
            expect(() => page.rate(1, 10)).toThrow();
            expect(() => page.rate(1, { score: 1 })).toThrow();
        });
    });
    describe('Pro functions', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
        });
        afterEach(() => {
            page = null;
        });
        it('can set the page overview', () => {
            return page.setOverview({ body: 'FOO' });
        });
        it('can fail if no arguments are sent when setting the page overview', () => {
            return page.setOverview().then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
        });
        it('can move a page', () => {
            return page.move({ to: 'foo/bar' });
        });
        it('can move a page with no options provided', () => {
            return page.move();
        });
        it('can set the page contents', () => {
            return page.setContents('Sample contents');
        });
        it('can fail when setting invalid page contents', () => {
            return page.setContents({}).then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
        });
        it('can handle setting the page contents conflict', () => {
            return page.setContents('Sample contents', { edittime: 'now', abort: 'never' });
        });
        it('can activate a draft for the page', () => {
            return page.activateDraft();
        });
        it('can delete a page', () => {
            return page.delete();
        });
        it('can delete pages recursively', () => {
            return page.delete(true);
        });
        it('can set the tags', () => {
            return page.setTags([ 'foo', 'bar' ]);
        });
        it('can set the tags (empty request)', () => {
            return page.setTags();
        });
        it('can attach a file to a page (no progress)', () => {
            return page.attachFile({}, { name: 'test.jpg', type: 'image/jpg', size: 1000 });
        });
        it('can attach a file to a page (no added info)', () => {
            return page.attachFile({ name: 'test.jpg', type: 'image/jpg', size: 1000 });
        });
        it('can attach a file to a page (with progress)', () => {
            return page.attachFile({}, { name: 'test.jpg', type: 'image/jpg', size: 1000, progress: () => {} });
        });
        it('can import an archive (no progress)', () => {
            return page.importArchive({}, { name: 'test.mtarc', size: 1000 }, { foo: 'bar' });
        });
        it('can import an archive (empty added info)', () => {
            return page.importArchive({ name: 'test.mtarc', size: 1000 }, {}, { foo: 'bar' });
        });
        it('can import an archive (no added info, no params)', () => {
            return page.importArchive({ name: 'test.mtarc', size: 1000 });
        });
        it('can import an archive with progress', () => {
            return page.importArchive({}, { name: 'test.mtarc', size: 1000, progress: () => {} }, { foo: 'bar' });
        });
        it('can import an archive with progress (no params)', () => {
            return page.importArchive({}, { name: 'test.mtarc', size: 1000, progress: () => {} });
        });
        it('can copy a page', () => {
            return page.copy({ to: 'foo/bar' });
        });
        it('can copy a page with `allow` specified', () => {
            return page.copy({ to: 'foo/bar', allow: 'deleteredirects' });
        });
        it('can fail if the `to` parameter is not sent to copy()', () => {
            const success = jest.fn();
            return page.copy().then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail if the `abort` parameter is set to an invalid value', () => {
            const success = jest.fn();
            return page.copy({ to: 'foo/bar', abort: 'invalid' }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail if the `allow` parameter is set to an invalid value', () => {
            const success = jest.fn();
            return page.copy({ to: 'foo/bar', allow: 'invalid' }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can revert a page (minimum options)', () => {
            return page.revert({ fromRevision: 5 });
        });
        it('can revert a page (all options)', () => {
            return page.revert({ fromRevision: 5, abort: 'never', verbose: true });
        });
        it('can revert a page (alternate options)', () => {
            return page.revert({ fromRevision: 5, abort: 'conflict', verbose: false });
        });
        it('can fail while trying to revert a page (no options)', () => {
            const success = jest.fn();
            return page.revert().then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail while trying to revert a page (no `fromRevision`)', () => {
            const success = jest.fn();
            return page.revert({}).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail while trying to revert a page (invalid `abort` type)', () => {
            const success = jest.fn();
            return page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', abort: true }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail while trying to revert a page (invalid `abort` value)', () => {
            const success = jest.fn();
            return page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', abort: 'YES' }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail while trying to revert a page (invalid `verbose` value)', () => {
            const success = jest.fn();
            return page.revert({ fromRevision: '1682aa2a-8165-bca3-3033-1176848a90b2', verbose: 'YES' }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can set reorder the page (no params)', () => {
            return page.setOrder();
        });
        it('can set reorder the page (with after ID)', () => {
            return page.setOrder(111);
        });
        it('can fail setting the page order (invalid after ID)', () => {
            const failed = jest.fn();
            return page.setOrder('13').catch(failed).then(() => expect(failed).toHaveBeenCalled());
        });
    });
    describe('Page manager', () => {
        describe('functional tests', () => {
            let pm = null;
            beforeEach(() => {
                pm = new PageManager();
            });
            afterEach(() => {
                pm = null;
            });
            it('can fetch the ratings for a set of pages', () => {
                return pm.getRatings([ 440, 441 ]);
            });
            it('can find pages', () => {
                return pm.findPages({
                    parentId: 1,
                    tags: [ 'foo' ],
                    missingClassifications: [ 'article:topic' ],
                    since: new Date(1999, 12, 31),
                    upTo: new Date(Date.now())
                });
            });
            it('can find pages with missig optional parameters', () => {
                return pm.findPages({
                    tags: [],
                    missingClassifications: [ 'article:topic' ],
                    since: new Date(1999, 12, 31),
                    upTo: new Date(Date.now())
                });
            });
            it('can find pages with missig optional parameters (different ones)', () => {
                return pm.findPages({ parentId: 1, tags: [ 'foo' ], missingClassifications: [] });
            });
            it('can fail when no parameters are sent to find pages', () => {
                const success = jest.fn();
                return pm.findPages().then(() => {
                    success();
                    throw new Error('success was called');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when an invalid `tags` parameter is sent to find pages', () => {
                const success = jest.fn();
                return pm.findPages({ tags: 'foo' }).then(() => {
                    success();
                    throw new Error('success was called');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when an invalid `missingClassifications` parameter is sent to find pages', () => {
                const success = jest.fn();
                return pm.findPages({ missingClassifications: 'foo' }).then(() => {
                    success();
                    throw new Error('success was called');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when an invalid `since` parameter is sent to find pages', () => {
                const success = jest.fn();
                return pm.findPages({ since: 'foo' }).then(() => {
                    success();
                    throw new Error('success was called');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail when an invalid `upTo` parameter is sent to find pages', () => {
                const success = jest.fn();
                return pm.findPages({ upTo: 'foo' }).then(() => {
                    success();
                    throw new Error('success was called');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
    });
});
