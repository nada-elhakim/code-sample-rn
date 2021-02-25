import React from 'react';
import {required, numericality} from 'redux-form-validators'
import {Field} from 'redux-form';
import {withNamespaces} from "react-i18next";

import InputField from "../InputField/InputField";
import Colors from "../../theme/variables/Colors";

const TransferAmountField = (props) => {
    const {
        name,
        style,
        t,
        label = "USE",
        onPress,
        minAmount,
        maxAmount,
        maxAmountErrorMessage,
        focusOnError,
        onlyIntegers,
        minAmountErrorMessage = t('common:transferAmountField.minThresholdError', {min: minAmount}),
        placeholder = t('common:interface.enterTransferAmount'),
        buttonColor = Colors.highlight} = props;

    let validations;
    const requiredMessage = t('common:interface.amountRequired');
    const onlyIntegersMessage = t('common:transferAmountField.decimalsNotAllowed')
    const requiredValidation = required({message: requiredMessage});
    const minAmountValidation = minAmount && numericality({'>=': minAmount, message: minAmountErrorMessage});
    const maxAmountValidation = maxAmount && numericality({'<=': maxAmount, message: maxAmountErrorMessage});
    const integerValidation = onlyIntegers && numericality({int: true, message: onlyIntegersMessage});

    if (minAmount) {
        if (onlyIntegers) {
            validations = [requiredValidation, minAmountValidation, integerValidation]
        } else {
            validations = [requiredValidation, minAmountValidation]

        }
    }
    else if (maxAmount) {
        validations = [requiredValidation, maxAmountValidation]
    }
    else {
        validations = [requiredValidation];
    }

    return (
        <Field
            label={label && label}
            name={name}
            style={style}
            noBorder={true}
            button={{
                title: t('common:interface.copyAll'),
                buttonTextStyle: {
                  color: buttonColor
                },
                onPress
            }}
            focusOnError={focusOnError}
            keyboardType="numeric"
            placeholder={placeholder}
            validate={validations}
            component={InputField}/>
    )
};
export default withNamespaces()(TransferAmountField);
