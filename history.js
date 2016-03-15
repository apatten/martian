import {Plug} from './lib/plug';
import {userActivityListModel} from './models/userActivityList.model';
export class History {
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki', 'events');
    }
    getUserActivity(userToken) {
        return this.plug.at('support-agent', userToken).get().then(userActivityListModel.parse);
    }
}
