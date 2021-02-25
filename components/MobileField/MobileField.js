import React from 'react';
import { required } from 'redux-form-validators'
import { Field } from 'redux-form';

import InputField from "../InputField/InputField";
import {withNamespaces} from "react-i18next";

const MobileField = (props) => {
    const {
        name,
        style,
        noIcon,
        noBorder,
        t
    } = props,
    placeholder = t('auth:mobileField.placeholder'),
    mobileRequired = t('auth:mobileField.mobileRequired');

    const iconProps = noIcon ? null : {
        name: 'icon-phone',
        type: 'usechain',
        size: 38,
        style: {
            left: -6,
            position: 'relative',
            justifyContent: 'flex-start'
        }
    };

    return (
        <Field
            name={name}
            placeholder={placeholder}
            iconProps={iconProps}
            noBorder={noBorder}
            style={style}
            keyboardType="phone-pad"
            validate={[required({message: mobileRequired})]}
            component={InputField}/>
    )
};
export default withNamespaces()(MobileField);