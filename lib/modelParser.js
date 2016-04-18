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

let modelHelper = {
    to: {
        boolean(value) {
            if(value !== 'true' && value !== 'false') {
                throw new Error('Failed converting to boolean');
            }
            return value === 'true';
        },
        date(value) {
            let dateValue = new Date(value);
            if(Number.isNaN(dateValue.getTime())) {
                throw new Error('Failed converting to date');
            }
            return dateValue;
        },
        integer(value) {
            let intValue = parseInt(value, 10);
            if(String(intValue) !== value) {
                throw new Error('Failed converting to integer');
            }
            return intValue;
        }
    },
    isValid(value) {
        return value === 0 || Boolean(value);
    },
    forceArray(value) {
        if(!modelHelper.isValid(value)) {
            return [];
        }
        return Array.isArray(value) ? value : [ value ];
    },
    getValue(obj, ...fields) {
        if(!obj || typeof obj !== 'object') {
            return;
        }
        let currentField = fields.shift();
        if(currentField in obj) {

            // Special '#text' logic to return parent field if it's a string
            let textParentIsString = fields.length === 1 && fields[0] === '#text' && typeof obj[currentField] === 'string';
            if(fields.length === 0 || textParentIsString) {
                return obj[currentField];
            }
            return modelHelper.getValue(obj[currentField], ...fields);
        }
    },
    transformValue(value, transform) {
        if(typeof transform === 'function') {
            return transform(value);
        }
        if(Array.isArray(transform)) {
            let parser = modelHelper.createParser(transform);
            return parser(value);
        }
        if(typeof transform === 'string') {
            return modelHelper.to[transform](value);
        }
    },
    parseProperty(data, parsedObj, { field, name, isArray, transform }) {
        let fields = modelHelper.forceArray(field);
        let value = modelHelper.getValue(data, ...fields);
        if(isArray) {
            value = modelHelper.forceArray(value);
        }
        if(transform && modelHelper.isValid(value) || typeof transform === 'function') {
            if(isArray) {
                value = value.map((val) => modelHelper.transformValue(val, transform));
            } else {
                value = modelHelper.transformValue(value, transform);
            }
        }
        name = name || fields[0];
        if(name in parsedObj) {
            throw new Error(`Duplicate "${name}" in parsing model`);
        }
        if(modelHelper.isValid(value)) {
            parsedObj[name] = value;
        }
    },
    createParser(model) {
        return (data) => {
            let parsedObj = {};
            model.forEach((propertyModel) => modelHelper.parseProperty(data, parsedObj, propertyModel));
            return parsedObj;
        };
    }
};
export let { createParser } = modelHelper;
