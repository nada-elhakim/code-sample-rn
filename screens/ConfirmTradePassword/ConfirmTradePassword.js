import React, {Component} from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {View, StyleSheet} from "react-native";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import {required, format} from 'redux-form-validators';

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import AccountItem from "../../components/AccountItem/AccountItem";
import Item from "../../theme/components/Item/Item";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import PinCodeField from "../../components/PinCodeField/PinCodeField";
import Text from "../../theme/components/Text/Text";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import TradePasswordActions from '../TradePassword/TradePasswordRedux';

class ConfirmTradePassword extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:tradePassword.confirmTradePassword')
        }
    };

    render() {
        const {
            handleSubmit,
            t,
            navigation
        } = this.props;

        const tradePassword = navigation.getParam('trade_password', '123456');
        const profile = navigation.getParam('profile');
        const passwordMismatchError = t('dashboard:tradePassword.errors.tradePasswordMismatch');

        return (
            <Container>
                <Content>
                    <AccountItem profile={profile}/>
                    <View style={{marginTop: 16}}>
                        <Item containerStyle={{backgroundColor: 'transparent'}}>
                            <ItemHeading>
                                {t('dashboard:tradePassword.confirmTradePassword')}
                            </ItemHeading>

                            <Field
                                validate={[
                                    required(),
                                    format({ with: tradePassword, message: passwordMismatchError }),
                                ]}
                                name="trade_password"
                                confirmCode
                                comparedCode={tradePassword}
                                component={PinCodeField}
                            />
                        </Item>
                        <Button
                            onPress={handleSubmit(this.setTradePassword)}
                            buttonStyle={{marginHorizontal: 16, marginTop: 80}}>
                            <Text style={{color: Colors.white}}>{t('common:interface.next')}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }

    setTradePassword = (values) => {
        console.log('values', values);
        const {trade_password} = values,
            {navigation, setTradePassword} = this.props,
            intent = navigation.getParam('intent', 'set'),
            oldTradePassword = navigation.getParam('old_trade_password'),
            profile = navigation.getParam('profile'),
            captcha = navigation.getParam('captcha');

        setTradePassword(trade_password, oldTradePassword, captcha);
    }
}

const mapStateToProps = (state) => {
    return {
        loading: false
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTradePassword:
            (password, oldPassword, captcha) => {
                return dispatch(TradePasswordActions.tradePasswordRequest(
                    password,
                    oldPassword,
                    captcha
                ))
            }
    }
};

export default reduxForm({
    form: 'confirmTradePasswordForm'
})(withNamespaces()(connect(null, mapDispatchToProps)(ConfirmTradePassword)));

