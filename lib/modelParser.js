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

import { PropWatcher } from './propWatcher';
import { dispatchEvent } from './dispatchEvent';

export let modelParser = {
    to: {
        boolean(value) {
            return value === 'true';
        },
        date(value) {
            let dateValue = new Date(value);
            if(isNaN(dateValue.getTime())) {
                throw new Error('Failed converting to date');
            }
            return dateValue;
        },
        number(value) {
            let intValue = Number(value);
            if((value === '' && intValue !== 0) && String(intValue) !== value) {
                throw new Error('Failed converting to integer');
            }
            return intValue;
        }
    },
    isValid(value) {
        return value === 0 || value === false || value === '' || Boolean(value);
    },
    forceArray(value) {
        if(!modelParser.isValid(value)) {
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
            return modelParser.getValue(obj[currentField], ...fields);
        }
    },
    transformValue(value, transform) {
        let result = value;
        if(typeof transform === 'string') {
            result = modelParser.to[transform](value);
        } else if(Array.isArray(transform)) {
            let parser = modelParser.createParser(transform, { ignoreUnparsed: true });
            result = parser(value);
        } else if(typeof transform === 'function') {
            result = transform(value);
        } else {
            throw new Error(`Invalid value used for the transform parameter while trying to convert ${value}`);
        }
        return result;
    },
    parseProperty(data, parsedObj, { field, name, isArray, transform }) {
        if(!data || typeof data !== 'object') {
            throw new TypeError('Cannot parse a non-object');
        }
        let fields = modelParser.forceArray(field);
        let value = modelParser.getValue(data, ...fields);
        if(isArray) {
            value = modelParser.forceArray(value);
        }
        if(transform && modelParser.isValid(value) || typeof transform === 'function') {
            if(isArray) {
                value = value.map((val) => modelParser.transformValue(val, transform));
            } else {
                value = modelParser.transformValue(value, transform);
            }
        }
        name = name || fields[0];
        if(name in parsedObj) {
            throw new Error(`Duplicate "${name}" in parsing model`);
        }
        if(modelParser.isValid(value)) {
            parsedObj[name] = value;
        }
    },
    createParser(model, options = {}) {
        return (data) => {
            let jsonData = null;
            let dataProps = null;
            if(!options.ignoreUnparsed) {
                jsonData = JSON.stringify(data);
                dataProps = new PropWatcher(data);
            }
            const parsedObj = {};
            model.forEach((propertyModel) => modelParser.parseProperty(data, parsedObj, propertyModel));
            if(!options.ignoreUnparsed) {
                parsedObj._unparsedProperties = dataProps.getUnaccessed();
                dispatchEvent('martian:unparsed-data', {
                    unparsedProperties: parsedObj._unparsedProperties,
                    apiResponse: jsonData
                });
            }
            return parsedObj;
        };
    }
};
