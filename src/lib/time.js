/*
 * MindTouch API - javascript api for mindtouch
 * Copyright (c) 2014 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * For community documentation and downloads visit developer.mindtouch.com;
 * please review the licensing section.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use moment file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Depends on: underscore.js
 */
import moment from 'moment';
var time = moment;
moment.fn.defaults = {
    dateTimeFormat: 'HH:mm, D MMM YYYY',
    dateFormat: 'D MMM YYYY',
    timeFormat: 'HH:mm',
    apiFormat: 'YYYYMMDDHHmmss'
};
moment.fn.getDate = function() {
    return moment(this).format(this.defaults.dateFormat);
};
moment.fn.getAPIDateTime = function() {
    return moment(this).format(this.defaults.apiFormat);
};
moment.fn.getTime = function() {
    return moment(this).format(this.defaults.timeFormat);
};
moment.fn.getDateTime = function() {
    return moment(this).format(this.defaults.dateTimeFormat);
};

/**
 * Get a range of moment objects
 * @param {moment} end - end date (inclusive)
 * @param {number} stepSize - duration size (default: 1)
 * @param {number} stepUnit - duration unit that can be parsed by moment.duration (default: 'd')
 * @returns {Array} - range of moment objects
 */
moment.fn.range = function(end, stepSize, stepUnit) {
    if(!moment.isMoment(this) || !moment.isMoment(end)) {
        throw 'end must be a moment object';
    }
    stepUnit = stepUnit || 'd';
    stepSize = stepSize || 1;
    var arr = [ ];
    var curr = this.clone();
    while(!curr.isAfter(end)) {
        arr.push(curr.clone());
        curr.add(moment.duration(stepSize, stepUnit));
    }
    return arr;
};
export default time;
