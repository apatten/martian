import {Plug} from 'lib/plug';
import {userActivityModel} from 'models/userActivity.model';
import {eventListModel} from 'models/eventList.model';
import {eventDetailModel} from 'models/eventDetail.model';
import {UserEvents} from 'userEvents';
describe('User Events', () => {
    describe('constructor', () => {
        it('can construct a user events object', () => {
            let ue = new UserEvents();
            expect(ue).toBeDefined();
            expect(() => UserEventManager()).toThrow();
        });
    });
    describe('functionality', () => {
        let ue = null;
        beforeEach(() => {
            ue = new UserEvents();
        });
        afterEach(() => {
            ue = null;
        });
        it('can fetch activity for a user', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(userActivityModel, 'parse').and.returnValue({});
            ue.getActivity('viewer').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can log a search event', (done) => {
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve());
            ue.logSearch('viewer', {}).then(() => {
                done();
            });
        });
        it('can fetch a user\'s history listing', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(eventListModel, 'parse').and.returnValue({});
            ue.getHistory(20).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a specific user history event detail', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(eventDetailModel, 'parse').and.returnValue({});
            ue.getHistoryDetail(20, '1682aa2a-8165-bca3-3033-1176848a90b2').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
