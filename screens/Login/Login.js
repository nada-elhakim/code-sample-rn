import React, {Component} from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import {
    View,
    Dimensions,
    Text
} from "react-native";
import {withNamespaces} from "react-i18next";


import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import PasswordField from "../../components/PasswordField/PasswordField";
import MobileField from "../../components/MobileField/MobileField";
import LoginActions, {LoginSelectors} from './LoginRedux';
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return(
            <AuthScreenLayout linkTitle={t('auth:register.title')} linkRoute="Register">
                {this.renderLoginForm()}
            </AuthScreenLayout>
        )
    }

    renderLoginForm() {
        const {
            t,
            handleSubmit,
            phone,
            loading
        } = this.props;

        console.log('props', this.props);

        return (
            <View>
                <MobileField style={{marginBottom: 20}} name="phone"/>

                {/*<VerificationCodeField*/}
                    {/*name="captcha"*/}
                    {/*phone={phone}*/}
                    {/*intent="login_2fa"*/}
                    {/*style={{marginBottom: 20}} />*/}

                <PasswordField name="password"/>

                <Button
                    onPress={this._goToResetPasswordScreen}
                    transparent
                    small
                    buttonStyle={{alignSelf: 'flex-end', marginBottom: 30}}>
                    <Text style={{color: Colors.primary}}>{t('auth:login.forgotPassword')}</Text>
                </Button>

                <Button
                    disabled={loading}
                    loading={loading}
                    onPress={handleSubmit(this._login)}>
                    <Text style={{color: Colors.white}}>{t('auth:login.login')}</Text>
                </Button>
            </View>
        )
    }


    _goToResetPasswordScreen = () => {
        this.props.navigation.navigate('ResetPassword');
    };

    _login = (values) => {
        console.log('login values', values);
        const credentials = {
            ...values,
            // captcha: '999999'
        };
        this.props.login(credentials);
    }



}

const mapStateToProps = (state) => {
    const selector = formValueSelector('loginForm');
    const phone = selector(state, 'phone');
    return {
        loading: LoginSelectors.selectLoading(state),
        phone
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(LoginActions.loginRequest(credentials))
    };
};

export default reduxForm({
    // initialValues: {
    //     phone: '13438131906',
    //     password: 'q111111',
    // },
    form: 'loginForm'
})(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(LoginScreen)));