
export const required = (value) => {
    return !value;
};

// export const email = (value, message) => {
//     if (value) {
//         return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) ?  undefined : message;
//     }
// };
//
// export const matchField = (value, matchedValue, message) => {
//     if (value && matchedValue) {
//         return value !== matchedValue ? message : undefined;
//     }
// };


export const minLength = (value, prop, message) => {
    return prop && value ? value.length < prop ? undefined : message : undefined;
};

export const maxLength = (value, prop) => {
    return prop && value ? value.length > prop ? undefined : message : undefined;
};


export const lengthBetween = (value, range, message) => {
    if (value && range.min && range.max) {
        return !(value.length > range.min && value.length < range.max) ? message : undefined;
    }
};

export const isEmail = (value) => {
    if (value) {
        return !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value));
    }
};


export const mapValidatorTypeToValidator = () => {

}

export const validateFields = (validateArray) => {
    let error = {};
    validateArray.map(validate => {
        const {fieldName, fieldValue, validators} = validate;
        console.log('validate', validate);
        error[fieldName] = {};
        validators.map(validator => {
            switch (validator) {
                case 'required':
                    return error[fieldName]['required'] = required(fieldValue);
                    break;
                case 'email':
                    return error[fieldName]['email'] = email(fieldValue);
                    break;
            }
        });
        error[fieldName]['invalid'] = required(fieldValue);

    });
    return error;
};

