export function string() {
    return value => (typeof value === 'string' ? [] : [`${value} is not a string`]);
}
export function number() {
    return value => (typeof value === 'number' ? [] : [`${value} is not a number`]);
}
export function array() {
    return value => (Array.isArray(value) ? [] : [`${value} is not an array`]);
}
export function bool() {
    return value => (typeof value === 'boolean' ? [] : [`${value} is not a Boolean value`]);
}
export function equals(expected) {
    return value => (value === expected ? [] : [`${value} does not equal ${expected}`]);
}
export function one(...validators) {
    return value => {
        let errors = [];
        for (let i = 0; i < validators.length; i++) {
            const validatorErrors = validators[i](value);
            if (validatorErrors.length === 0) {
                errors = [];
                break;
            }
            errors.push(...validatorErrors);
        }
        return errors;
    };
}
export function all(...validators) {
    return value => {
        let errors = [];
        validators.forEach(validator => {
            const valid = validator(value);
            if (valid.length > 0) {
                errors.push(...valid);
            }
        });
        return errors;
    };
}

export function optional(key, validator) {
    return obj => {
        if (typeof obj[key] === 'undefined') {
            return [];
        }
        if (validator) {
            return validator(obj[key]);
        }
        return [];
    };
}
export function required(key, validator) {
    return obj => {
        if (typeof obj[key] === 'undefined') {
            return [`The value of ${key} is not defined`];
        }
        if (validator) {
            return validator(obj[key]);
        }
        return [];
    };
}
export function validateObject(object, ...fieldValidators) {
    return fieldValidators.reduce((acc, fv) => [...acc, ...fv(object)], []);
}
export function validateValue(value, validator) {
    return validator(value);
}

export const valid = {
    get object() {
        return validateObject;
    },
    get value() {
        return validateValue;
    }
};
