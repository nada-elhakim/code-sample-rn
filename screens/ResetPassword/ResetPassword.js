import React, {Component} from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {Text, View, StyleSheet} from "react-native";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import AccountItem from "../../components/AccountItem/AccountItem";
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";
import Item from "../../theme/components/Item/Item";
import PasswordField from "../../components/PasswordField/PasswordField";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import ResetPasswordActions, {ResetPasswordSelectors} from './ResetPasswordRedux';
import ProfileActions, {ProfileSelectors} from '../../redux/common/Profile/ProfileRedux';
import MobileField from "../../components/MobileField/MobileField";

class ResetPassword extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: navigation.getParam('navTitle', t('auth:forgotPassword.title'))
        }
    };

    render() {
        const {
            handleSubmit,
            t,
            profile,
            phone,
            navigation,
            loading
        } = this.props;

        const captchaPhone = profile ? profile.phone : phone;
        const intent = navigation.getParam('intent');

        return (
            <Container>
                <Content>
                    {profile ?
                        <AccountItem profile={profile}/> :
                        <Item style={styles.formItem}>
                            <MobileField
                                name="phone"
                                noIcon
                                noBorder
                            />
                        </Item>
                    }
                    <View style={{marginTop: 16}}>
                        <Item style={styles.formItem}>
                            <VerificationCodeField
                                name="captcha"
                                intent={intent}
                                noIcon
                                noBorder
                                phone={captchaPhone}/>
                        </Item>

                        {intent === 'edit_pass' && <Item style={styles.formItem}>
                            <PasswordField
                                placeholder={t('auth:forgotPassword.enterOldPassword')}
                                name="old_password"
                                noIcon
                                noBorder/>
                        </Item>}

                        <Item style={styles.formItem}>
                            <PasswordField
                                isFirstTime
                                name="password"
                                noIcon
                                noBorder/>
                        </Item>

                        <Item noBorder style={styles.formItem}>
                            <PasswordField
                                isFirstTime
                                isConfirmPassword
                                name="repeat_password"
                                confirmPassword
                                placeholder={t('auth:passwordField.confirmPassword')}
                                noIcon
                                noBorder/>
                        </Item>

                        <Button
                            disabled={loading}
                            loading={loading}
                            onPress={handleSubmit(this._resetPassword)}
                            buttonStyle={{marginHorizontal: 16, marginTop: 30}}>
                            <Text style={{color: Colors.white}}>{t('common:interface.confirm')}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }

    _resetPassword = (values) => {
        const passwordParams = {
            ...values
        };
        delete passwordParams.repeat_password;
        this.props.resetPassword(passwordParams);
    }
}

const mapStateToProps = (state) => {
    const selector = formValueSelector('resetPasswordForm');
    const phone = selector(state, 'phone');
    return {
        profileLoading: ProfileSelectors.selectLoading(state),
        loading: ResetPasswordSelectors.selectLoading(state),
        profile: ProfileSelectors.selectProfile(state),
        phone
    }

};

const mapDispatchToProps = (dispatch) => ({
    getProfile: () => dispatch(ProfileActions.profileRequest({fromStorage: true})),
    resetPassword: (passwordParams) => dispatch(ResetPasswordActions.resetPasswordRequest(passwordParams))
});

export default reduxForm({
    // initialValues: {
    //     captcha: '129242',
    //     password: 'empty',
    //     repeat_password: 'empty'
    // },
    form: 'resetPasswordForm'
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(ResetPassword)));

const styles = StyleSheet.create({
    formItem: {
        paddingVertical: 12
    }
});