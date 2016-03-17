import {Plug} from './lib/plug';
import {utility} from './lib/utility';
import {userActivityModel} from './models/userActivity.model';
import {eventListModel} from './models/eventList.model';
import {eventDetailModel} from './models/eventDetail.model';
export class UserEvents {
    constructor(settings) {
        this.settings = settings;
        this.plug = new Plug(settings).at('@api', 'deki', 'events');
    }
    getActivity(userToken) {
        return this.plug.at('support-agent', userToken).get().then(userActivityModel.parse);
    }
    getHistory(userId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current')).get().then(eventListModel.parse);
    }
    getHistoryDetail(userId, detailId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current'), detailId).get().then(eventDetailModel.parse);
    }
    logSearch(userId, eventData) {
        return this.plug.at('search', utility.getResourceId(userId, 'current')).post(JSON.stringify(eventData), utility.jsonRequestType);
    }
}
