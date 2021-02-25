import React from 'react';
import {required, confirmation, format} from 'redux-form-validators'
import {Field} from 'redux-form';

import InputField from "../InputField/InputField";
import {withNamespaces} from "react-i18next";

const PasswordField = (props) => {
    const {
        name,
        style,
        noIcon,
        noBorder,
        placeholder,
        t,
        isFirstTime,
        isConfirmPassword
    } = props;

    const iconProps = noIcon ? null : {
        name: 'icon-lock',
        type: 'usechain',
        size: 24
    };

    const requireValidation = required({message: t('auth:passwordField.required')});
    const confirmValidation = confirmation({field: 'password', message: t('auth:passwordField.mismatch')});
    const alphaNumeric = format({ with: /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/, message: t('auth:passwordField.mustBeAlphanumeric')});
    let validations;
    if (isFirstTime) {
        if (isConfirmPassword) {
            validations = [requireValidation, confirmValidation, alphaNumeric];
        } else {
            validations = [requireValidation, alphaNumeric];
        }

    } else {
        validations = [requireValidation];
    }
    return (
        <Field
            name={name}
            secureTextEntry
            iconProps={iconProps}
            style={style}
            noBorder={noBorder}
            placeholder={placeholder ? placeholder : t('auth:passwordField.placeholder')}
            validate={validations}
            component={InputField}/>
    )
};
export default withNamespaces()(PasswordField);
