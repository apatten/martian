/* eslint-env jasmine, jest */
jest.unmock('../site.js');
import { Site } from '../site.js';

describe('Site API', () => {
    describe('construction', () => {
        it('can attempt to construct a Site object', () => {
            let site1 = new Site();
            expect(site1).toBeDefined();
        });
    });
    describe('operations', () => {
        let site = null;
        beforeEach(() => {
            site = new Site();
        });
        afterEach(() => {
            site = null;
        });
        describe('resource string operations', () => {
            it('can fetch a translated string', () => {
                return site.getResourceString({ key: 'Test.Resource.key' });
            });
            it('can fetch a translated string with language supplied', () => {
                return site.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' });
            });
            it('can fetch a batch of resource strings (min params)', () => {
                return site.getResourceStrings({ keys: [] });
            });
            it('can fetch a batch of resource strings (all params)', () => {
                return site.getResourceStrings({ keys: [ 'foo.bar.baz' ], lang: 'en-us' });
            });
            describe('resource string fetching failures', () => {
                const failed = jest.fn();
                afterEach(() => {
                    failed.mockReset();
                });
                it('can fail if no resource key is supplied', () => {
                    return site.getResourceString().catch(failed).then(() => expect(failed).toBeDefined());
                });
                it('can fail batch fetching (no parameters)', () => {
                    return site.getResourceStrings().catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
                it('can fail batch fetching (invalid keys)', () => {
                    return site.getResourceStrings({ keys: '' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
                it('can fail batch fetching (invalid lang)', () => {
                    return site.getResourceStrings({ keys: [], lang: true }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
            });
        });
        describe('search operations', () => {
            it('can perform a default search', () => {
                return site.search();
            });
            it('can perform a search with some parameters', () => {
                return site.search({ tags: [ 'abc', '123' ], type: [ 'wiki', 'image' ] });
            });
            it('can perform a search with some other parameters', () => {
                return site.search({ path: 'foo/bar', q: 'search thing' });
            });
            it('can perform a search with a namespace param', () => {
                return site.search({ q: 'search term', namespaces: 'template' });
            });
            it('can perform a search with all parameters', () => {
                return site.search({ path: '/foo/bar', tags: 'abc', type: 'wiki', offset: 123, limit: 10, q: 'search term', namespaces: [ 'main', 'template' ], sessionid: 'foo' });
            });
        });
        describe('search index tests', () => {
            it('can search the site index with defaults', () => {
                return site.searchIndex();
            });
            it('can search the site index with all parameters sent', () => {
                const params = {
                    q: 'search query',
                    limit: 'all',
                    offset: 10,
                    sortBy: 'date',
                    verbose: false,
                    constraints: {
                        page: 'Category_1',
                        tags: [ 'foo', 'bar' ],
                        type: 'wiki',
                        namespaces: [ 'main' ]
                    }
                };
                return site.searchIndex(params);
            });
            it('can search the site index with a constraint string passed', () => {
                return site.searchIndex({ q: 'Foo', constraints: { type: 'wiki' }, constraintString: 'language:en-us AND type:wiki' });
            });
            it('can fail if an invalid `limit` parameter is passed in', () => {
                const success = jest.fn();
                return site.searchIndex({ limit: 'foo' }).then(() => {
                    success();
                    throw new Error('Promise was resolved.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
        describe('site tags operations', () => {
            it('can fetch all site tags', () => {
                return site.getTags();
            });
            it('can update batch site tags (add only)', () => {
                return site.setTags({ add: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
            });
            it('can update batch site tags (remove only)', () => {
                return site.setTags({ remove: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
            });
            it('can update batch site tags (add and remove)', () => {
                return site.setTags({ add: [ { name: 'foo', pageids: [ 123, 456 ] } ], remove: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
            });
            it('can update batch site tags (empty request)', () => {
                return site.setTags();
            });
        });
        describe('verify log endpoints', () => {
            it('get available site activity log list', () => {
                return site.getSiteActivityLogs();
            });
            it('get available search query log list', () => {
                return site.getSearchQueryLogs();
            });
            it('get search query log url with empty parameters', () => {
                const success = jest.fn();
                return site.getSearchQueryLogUrl().then(() => {
                    success();
                    throw new Error();
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('get site activity log url with empty parameters', () => {
                const success = jest.fn();
                return site.getSiteActivityLogUrl().then(() => {
                    success();
                    throw new Error();
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('get search query log url', () => {
                return site.getSearchQueryLogUrl('searchqueries-2016-10-000');
            });
            it('get site activity log url', () => {
                return site.getSiteActivityLogUrl('searchqueries-2016-10-000');
            });
        });
        describe('site activity', () => {
            it('can fetch site activity', () => {
                return site.getActivity();
            });
            it('can fetch site activity with supplied since date', () => {
                const date = new Date('Wed, 07 Dec 2016 00:00:00');
                return site.getActivity(date);
            });
            it('can fail if an invalid since date is supplied', () => {
                const success = jest.fn();
                return site.getActivity('').then(() => {
                    success();
                    throw new Error();
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
        describe('roles', () => {
            it('can get the site roles', () => {
                return site.getRoles();
            });
        });
        describe('feedback', () => {
            it('can send feedback (comment only)', () => {
                return site.sendFeedback({ comment: 'This site is awesome' });
            });
            it('can send feedback (all params)', () => {
                return site.sendFeedback({ comment: 'foo', title: 'bar', metadata: { dog: 'cat', asparagus: 'broccoli' } });
            });
            it('can send feedback with non-string metadata values', () => {
                return site.sendFeedback({ comment: 'foo', title: 'bar', metadata: { dog: 'cat', asparagus: 'broccoli', bool: true, num: 1234 } });
            });
            describe('feedback failures', () => {
                const failed = jest.fn();
                afterEach(() => {
                    failed.mockReset();
                });
                it('no comment', () => {
                    return site.sendFeedback().catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid title', () => {
                    return site.sendFeedback({ comment: 'foo', title: 1234 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid metadata', () => {
                    return site.sendFeedback({ comment: 'foo', metadata: 'dog' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
                });
            });
        });
    });
});
