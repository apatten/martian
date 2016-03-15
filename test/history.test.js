import {Plug} from 'lib/plug';
import {userActivityListModel} from 'models/userActivityList.model';
import {History} from 'history';
describe('History', () => {
    describe('constructor', () => {
        it('can construct a History object', () => {
            let h = new History();
            expect(h).toBeDefined();
            expect(() => History()).toThrow();
        });
    });
    describe('User activity', () => {
        it('can fetch activity for a user', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(userActivityListModel, 'parse').and.returnValue({});
            let history = new History();
            history.getUserActivity('viewer').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
