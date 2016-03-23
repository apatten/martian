/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
