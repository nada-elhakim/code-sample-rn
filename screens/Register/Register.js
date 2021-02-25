import React, {Component} from 'react';
import {Text, View, Platform, StyleSheet} from "react-native";
import {reduxForm, formValueSelector, Field} from 'redux-form';
import {connect} from 'react-redux';
import {withNamespaces} from "react-i18next";

import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import PasswordField from "../../components/PasswordField/PasswordField";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import MobileField from "../../components/MobileField/MobileField";
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";
import RegisterActions, {RegisterSelectors} from './RegisterRedux';
import InviteCodeField from "../../components/InviteCodeField/InviteCodeField";


class Register extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
    render() {
        const {t} = this.props;
        return(
            <AuthScreenLayout linkTitle={t('auth:login.title')} linkRoute="Login">
                {this.renderRegisterForm()}
            </AuthScreenLayout>
        )
    }

    renderRegisterForm() {
        const {
            t,
            handleSubmit,
            loading,
            phone
        } = this.props;

        return (
            <View style={styles.container}>
                <MobileField
                    name="phone"
                    style={{marginBottom: 20}}/>


                <VerificationCodeField
                    name="captcha"
                    phone={phone}
                    style={{marginBottom: 20}} />

                <PasswordField
                    isFirstTime
                    name="password"
                    style={{marginBottom: 20}}/>

                <PasswordField
                    isFirstTime
                    isConfirmPassword
                    name="pass_repeat"
                    placeholder={t('auth:passwordField.confirmPassword')}
                    confirmPassword
                    style={{marginBottom: 20}}/>


                <InviteCodeField
                    name="invite_code"
                    style={{marginBottom: 30}}
                />

                <Button
                    disabled={loading}
                    loading={loading}
                    onPress={handleSubmit(this.register)}>

                    <Text style={{color: Colors.white}}>{t('common:interface.next')}</Text>
                </Button>
            </View>
        )
    }

    register(user) {
        const {register} = this.props;
        delete user.pass_repeat;
        register(user);
    }

}

const mapStateToProps = (state) => {
    const selector = formValueSelector('registerForm');
    const phone = selector(state, 'phone');
    return {
        loading: RegisterSelectors.selectLoading(state),
        phone
    };
};

const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(RegisterActions.registerRequest(user))
});

export default reduxForm({
    form: 'registerForm',
    asyncValidate: (values, dispatch) => {
        return new Promise((resolve, reject) =>
            dispatch({ type: 'CHECK_USER_EXISTENCE', values, resolve, reject}))
    },
    asyncBlurFields: ['phone']
})(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Register)));

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            android: {
                paddingBottom: 60
            }
        })
    },
});