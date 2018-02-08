/* eslint-env jasmine, jest */
jest.unmock('../pageSecurity.js');
import { PageSecurity } from '../pageSecurity';

describe('Page Security', () => {
    describe('constructor', () => {
        it('can create a new PageSecurity', () => {
            const sec = new PageSecurity();
            expect(sec instanceof PageSecurity).toBe(true);
            const sec2 = new PageSecurity(123);
            expect(sec2 instanceof PageSecurity).toBe(true);
        });
    });
    describe('operations', () => {
        let ps;
        beforeEach(() => {
            ps = new PageSecurity(123);
        });
        afterEach(() => {
            ps = null;
        });
        it('can fetch the security info', () => {
            return ps.get();
        });
        it('can reset the security info', () => {
            return ps.reset();
        });
        describe('setting', () => {
            it('can set the security info (minimum parameters)', () => {
                return ps.set({ pageRestriction: 'Public' });
            });
            it('can set the security info (all parameters)', () => {
                const info = {
                    cascade: 'delta',
                    pageRestriction: 'Private',
                    grants: [
                        { user: 1, role: 'Manager' },
                        { user: 'editor', role: 'Contributor' },
                        { group: 5, role: 'Viewer' },
                        { group: 'foo', role: 'None' }
                    ]
                };
                return ps.set(info);
            });
            describe('failures', () => {
                const failed = jest.fn();
                afterEach(() => {
                    failed.mockReset();
                });
                it('missing pageRestriction', () => {
                    return ps
                        .set()
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid pageRestriction', () => {
                    return ps
                        .set({ pageRestriction: 13 })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (bad type)', () => {
                    const badGrants = {};
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (user and group defined)', () => {
                    const badGrants = [{ user: 1, group: 2 }];
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (no user or group defined)', () => {
                    const badGrants = [{ role: 'foo' }];
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (invalid user)', () => {
                    const badGrants = [{ user: true }];
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (invalid group)', () => {
                    const badGrants = [{ group: [] }];
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grants (invalid role)', () => {
                    const badGrants = [{ user: 'foo', role: 123 }];
                    return ps
                        .set({ pageRestriction: 'Public', grants: badGrants })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
            });
        });
        describe('updating', () => {
            it('can update security info (no params)', () => {
                return ps.update();
            });
            it('can update security info (all params)', () => {
                const info = {
                    cascade: 'delta',
                    pageRestriction: 'Private',
                    grantsAdded: [{ user: 1, role: 'Manager' }],
                    grantsRemoved: [{ group: 'foo', role: 'Contributor' }]
                };
                return ps.update(info);
            });
            describe('failures', () => {
                const failed = jest.fn();
                afterEach(() => {
                    failed.mockReset();
                });
                it('invalid grantsAdded', () => {
                    return ps
                        .update({ grantsAdded: 'foo' })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
                it('invalid grantsRemoved', () => {
                    return ps
                        .update({ grantsRemoved: {} })
                        .catch(failed)
                        .then(() => expect(failed).toHaveBeenCalled());
                });
            });
        });
    });
});
