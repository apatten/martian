import User from 'api/user';
describe('User API', () => {
    describe('static operations', () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can fetch the current user', (done) => {
            let currentUri = '/@api/deki/users/current?';
            jasmine.Ajax.stubRequest(new RegExp(currentUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.user });
            User.getCurrentUser().then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
    });
});
