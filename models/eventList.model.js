import {modelHelper} from './modelHelper';
import {eventModel} from './event.model';
export let eventListModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: modelHelper.getInt(obj['@count']),
            upto: obj['@upto'],
            since: obj['@since'],
            summary: []
        };
        let events = modelHelper.getArray(obj.summary);
        events.forEach((e) => {
            let parsedEvent = {
                id: e['@id'],
                datetime: modelHelper.getDate(e['@datetime']),
                count: modelHelper.getInt(e['@count']),
                detailid: e['@detailid'],
                uriDetail: e['@uri.detail'],
                event: eventModel.parse(e.event)
            };
            parsed.summary.push(parsedEvent);
        });
        return parsed;
    }
};
