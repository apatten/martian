import {modelHelper} from './modelHelper';
import {eventModel} from './event.model';
export let eventDetailModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: modelHelper.getInt(obj['@count']),
            summary: {
                id: obj.summary['@id'],
                datetime: modelHelper.getDate(obj.summary['@datetime']),
                count: modelHelper.getInt(obj.summary['@count']),
                journaled: modelHelper.getBool(obj.summary['@journaled']),
                diffable: modelHelper.getBool(obj.summary['@diffable']),
                event: eventModel.parse(obj.summary.event)
            }
        };
        return parsed;
    }
};
