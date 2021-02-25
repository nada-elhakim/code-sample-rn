import React, {Component} from 'react';
import { Field } from 'redux-form';
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import {required} from 'redux-form-validators'

import InputField from "../InputField/InputField";
import CaptchaActions, {CaptchaSelectors} from '../../redux/common/Captcha/CaptchaRedux';

class VerificationCodeField extends Component {
    render() {
        const {
            name,
            style,
            noIcon,
            noBorder,
            t,
            validate,
            counter,
            phone
        } = this.props;

        let iconProps = !noIcon ? {
            name: 'icon-lock',
            type: 'usechain',
            size: 24
        } : null;

        const requiredMessage = t('auth:verificationCodeField.codeRequired');
        const validations = validate ?
            [required({message: requiredMessage}), ...validate] :
            [required({message: requiredMessage})];

        return (
            <Field
                name={name}
                iconProps={iconProps}
                style={style}
                noBorder={noBorder}
                keyboardType="numeric"
                button={{
                    title: counter === 0 ? t('auth:verificationCodeField.getCode') : counter,
                    onPress: this.onButtonPress,
                    disabled: counter > 0 || !phone
                }}
                placeholder={t('auth:verificationCodeField.placeholder')}
                validate={validations}
                component={InputField}/>
        )
    }

    onButtonPress = () => {
        const {
            phone,
            intent = 'register',
            sendCaptcha
        } = this.props;

        if (phone && phone !== '') {
            sendCaptcha(phone, intent);
        }
    }
}

const mapStateToProps = (state) => ({
    counter: CaptchaSelectors.selectCounter(state)
});

const mapDispatchToProps = (dispatch) => ({
    sendCaptcha: (phone, intent) => dispatch(CaptchaActions.captchaRequest(phone, intent)),
    resetCaptchaCounter: () => dispatch(CaptchaActions.resetCaptchaCounter()),
});

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(VerificationCodeField));
