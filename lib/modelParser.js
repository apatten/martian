export const modelParser = {
    to: {
        boolean(value) {
            return value === true || value === 'true' || value === 'True';
        },
        date(value) {
            const dateValue = new Date(value);
            if(isNaN(dateValue.getTime())) {
                throw new Error('Failed converting to date');
            }
            return dateValue;
        },
        apiDate(value) {
            if(!(/^\d{8}$|^\d{14}$/).test(value)) {
                throw new Error('Failed converting an API date: The raw value must be a string of digits and of length 8 or 14');
            }
            const parts = [
                value.slice(0, 4),
                value.slice(4, 6),
                value.slice(6, 8),
                value.slice(8, 10),
                value.slice(10, 12),
                value.slice(12)
            ].map((p) => parseInt(p, 10)).filter((p) => !isNaN(p));

            // The month parameter is zero-based, so we'll need to decrement it before constructing the Date.
            parts[1]--;
            return new Date(...parts);
        },
        number(value) {
            if(typeof value === 'number') {
                return value;
            }
            if(value === '') {
                return null;
            }
            const intValue = Number(value);
            if(String(intValue) !== value) {
                throw new Error('Failed converting to integer');
            }
            return intValue;
        }
    },
    isValid(value) {
        return typeof value !== 'undefined';
    },
    forceArray(value) {
        if(!modelParser.isValid(value) || value === '') {
            return [];
        }
        return Array.isArray(value) ? value : [ value ];
    },
    getValue(obj, ...fields) {
        if(!obj || typeof obj !== 'object') {
            return;
        }
        const currentField = fields.shift();
        if(currentField in obj) {

            // Special '#text' logic to return parent field if it's a string
            const textParentIsString = fields.length === 1 && fields[0] === '#text' && typeof obj[currentField] === 'string';
            if(fields.length === 0 || textParentIsString) {
                return obj[currentField];
            }
            return modelParser.getValue(obj[currentField], ...fields);
        }
    },
    processModelAndData(model, data) {
        let preProcessor = null;
        let dataModel = null;
        if(model && model.model) {
            preProcessor = model.preProcessor;
            dataModel = model.model;
        } else {
            dataModel = model;
        }
        if(typeof preProcessor === 'function') {
            data = preProcessor(data);
        }
        return [ dataModel, data ];
    },
    transformValue(value, transform) {
        let result = value;
        if(typeof transform === 'string') {
            result = modelParser.to[transform](value);
        } else if(Array.isArray(transform) || transform.model) {
            const [ processedModel, processedData ] = modelParser.processModelAndData(transform, value);
            let parser = modelParser.createParser(processedModel);
            result = parser(processedData);
        } else if(typeof transform === 'function') {
            result = transform(value);
        } else {
            throw new Error(`Invalid value used for the transform parameter while trying to convert ${value}`);
        }
        return result;
    },
    parseProperty(data, parsedObj, { field, name, isArray, transform, constructTransform }) {
        if(!data || typeof data !== 'object') {
            throw new TypeError('Cannot parse a non-object');
        }
        if(typeof field === 'undefined') {
            throw new TypeError('The \'field\' property must be included in every model entry');
        }
        const fields = modelParser.forceArray(field);
        let value = modelParser.getValue(data, ...fields);
        if(constructTransform && typeof constructTransform === 'function') {
            transform = constructTransform(value);
            [ transform, value ] = modelParser.processModelAndData(transform, value);
        }
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

            // If the response is an empty string, parse the response as an empty object.
            if(data === '') {
                data = {};
            }
            const [ processedModel, processedData ] = modelParser.processModelAndData(model, data);
            const parsedObj = {};
            processedModel.forEach((propertyModel) => modelParser.parseProperty(processedData, parsedObj, propertyModel));
            return parsedObj;
        };
    }
};
