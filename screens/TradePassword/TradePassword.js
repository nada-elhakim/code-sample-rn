import React, {Component} from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {View, StyleSheet} from "react-native";
import {withNamespaces} from "react-i18next";
import {length, numericality, required} from 'redux-form-validators';
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import AccountItem from "../../components/AccountItem/AccountItem";
import Item from "../../theme/components/Item/Item";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import PinCodeField from "../../components/PinCodeField/PinCodeField";
import Text from "../../theme/components/Text/Text";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import ProfileActions, {ProfileSelectors} from '../../redux/common/Profile/ProfileRedux';
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";


class TradePassword extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: navigation.getParam('navTitle', t('dashboard:tradePassword.title'))
        }
    };

    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const {
            handleSubmit,
            t,
            profile,
            navigation
        } = this.props;

        const editTradePassword = !!navigation.getParam('intent');
        const tradePasswordRequiredMsg = t('dashboard:tradePassword.errors.tradePasswordRequired');

        return (
            <Container>
                <Content>
                    <AccountItem profile={profile}/>
                    <View style={{marginTop: 16}}>
                        {
                            editTradePassword &&
                            <View>
                                <Item
                                    containerStyle={{
                                        paddingHorizontal: 12,
                                        paddingRight: 16
                                    }}
                                    style={{paddingVertical: 8}}>
                                    <VerificationCodeField
                                        name="captcha"
                                        noBorder
                                        noIcon
                                        intent="edit_trade_pass"
                                        phone={profile && profile.phone} />
                                </Item>
                                <Item containerStyle={{backgroundColor: 'transparent'}}>
                                    <ItemHeading>
                                        {t('dashboard:tradePassword.enterOldTradePassword')}
                                    </ItemHeading>

                                    <Field
                                        validate={[
                                            required({message: tradePasswordRequiredMsg}),
                                            numericality({
                                                int: true,
                                                message: t('dashboard:tradePassword.errors.tradePasswordOnlyNumbers')
                                            }),
                                            length({min: 6, message: t('dashboard:tradePassword.errors.tradePasswordLength')})
                                        ]}
                                        name="old_trade_password"
                                        component={PinCodeField}
                                    />
                                </Item>
                            </View>

                        }
                        <Item containerStyle={{backgroundColor: 'transparent'}}>
                            <ItemHeading>
                                {t('dashboard:tradePassword.enterTradePassword')}
                            </ItemHeading>

                            <Field
                                validate={[
                                    required({message: tradePasswordRequiredMsg}),
                                    numericality({
                                        int: true,
                                        message: t('dashboard:tradePassword.errors.tradePasswordOnlyNumbers')
                                    }),
                                    length({min: 6, message: t('dashboard:tradePassword.errors.tradePasswordLength')})
                                ]}
                                name="trade_password"
                                component={PinCodeField}
                            />
                        </Item>
                        <Button
                            onPress={handleSubmit(this.confirmTradePassword)}
                            buttonStyle={{marginHorizontal: 16, marginTop: 80}}>
                            <Text style={{color: Colors.white}}>{t('common:interface.next')}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }

    confirmTradePassword = (values) => {
        console.log('values', values);
        const {navigation, profile} = this.props;
        const {trade_password, old_trade_password, captcha} = values, intent = navigation.getParam('intent', 'set');
        if (trade_password) {
            navigation
                .navigate('ConfirmTradePassword', {
                    trade_password,
                    old_trade_password,
                    intent,
                    profile,
                    captcha
                });
        }


    };
}

const mapStateToProps = (state) => {
    return {
        profileLoading:  ProfileSelectors.selectLoading(state),
        profile: ProfileSelectors.selectProfile(state),
    }
};

const mapDispatchToProps = (dispatch) => ({
    getProfile: () => dispatch(ProfileActions.profileRequest({fromStorage: true})),
});

export default reduxForm({
    form: 'tradePasswordForm'
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(TradePassword)));

