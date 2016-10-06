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
/* eslint-env node, browser */

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
            if(String(intValue) !== value) {
                throw new Error('Failed converting to integer');
            }
            return intValue;
        },
        json(data) {
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            return data;
        }
    },
    isValid(value) {
        return value === 0 || value === false || Boolean(value);
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
            let parser = modelParser.createParser(transform);
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
    createParser(model) {
        return (data) => {
            data = modelParser.to.json(data);

            const loggingEnabled =
                (typeof window !== 'undefined' && window._martianLogging === true) ||
                (typeof process !== 'undefined' && process.env.MARTIAN_LOGGING);
            let accessedPropPaths = null;
            let allPropPaths = null;
            if(loggingEnabled) {
                accessedPropPaths = [];

                // eslint-disable-next-line no-use-before-define
                allPropPaths = setRecursivePropGetter(data, (propPath) => {
                    accessedPropPaths.push(propPath);
                });
            }

            let parsedObj = {};
            model.forEach((propertyModel) => modelParser.parseProperty(data, parsedObj, propertyModel));

            if(loggingEnabled) {
                allPropPaths.forEach((propPath) => {
                    if(!accessedPropPaths.includes(propPath)) {

                        // eslint-disable-next-line no-console
                        console.log(`martian - unparsed data: ${propPath}`);
                    }
                });
            }

            return parsedObj;
        };
    }
};

function setRecursivePropGetter(obj, fn, prefixes = [], allPrefixes = []) {
    Object.keys(obj).forEach((key) => {
        const prefixesCopy = [ ...prefixes ];
        prefixesCopy.push(key);
        allPrefixes.push(prefixesCopy.join('.'));
        let value = obj[key];
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                fn(prefixesCopy.join('.'));
                return value;
            },
            set(newValue) {
                value = newValue;
            }
        });
        if(value && typeof value === 'object') {
            setRecursivePropGetter(value, fn, prefixesCopy, allPrefixes);
        }
    });
    return allPrefixes;
}
