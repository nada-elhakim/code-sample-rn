import React from 'react';
import { Field } from 'redux-form';

import InputField from "../InputField/InputField";
import {withNamespaces} from "react-i18next";

const InviteCodeField = (props) => {
    const {
        name,
        style,
        noIcon,
        noBorder,
        t
    } = props,
    placeholder = t('auth:inviteCodeField.placeholder'),
    codeRequired = t('auth:inviteCodeField.codeRequired');

    const iconProps = noIcon ? null : {
        name: 'user-plus',
        type: 'Feather',
        size: 28
    };

    return (
        <Field
            name={name}
            placeholder={placeholder}
            iconProps={iconProps}
            noBorder={noBorder}
            style={style}
            component={InputField}/>
    )
};
export default withNamespaces()(InviteCodeField);
