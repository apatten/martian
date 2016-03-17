import {modelHelper} from './modelHelper';
import {eventModel} from './event.model';
export let userActivityModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: modelHelper.getInt(obj['@count']),
            upto: obj['@upto'],
            since: obj['@since'],
            events: []
        };
        let events = modelHelper.getArray(obj.event);
        events.forEach((e) => {
            parsed.events.push(eventModel.parse(e));
        });
        return parsed;
    }
};
