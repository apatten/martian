import {modelHelper} from './modelHelper';
import {userActivityModel} from './userActivity.model';
export let userActivityListModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: modelHelper.getInt(obj['@count']),
            since: obj['@since'],
            upto: obj['@upto'],
            events: []
        };
        if('event' in obj) {
            let events = Array.isArray(obj.event) ? obj.event : [ obj.event ];
            events.forEach((event) => {
                parsed.events.push(userActivityModel.parse(event));
            });
        }
        return parsed;
    }
};
