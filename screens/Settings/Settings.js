import React, {Component} from 'react';
import {FlatList} from "react-native";
import {withNamespaces} from "react-i18next";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";
import {connect} from "react-redux";
import LoginActions from "../Login/LoginRedux";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";

class Settings extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        const title =
            navigation.getParam('isForgotPasswordSettings') ?
                t('dashboard:settings.options.changePassword'):
                t('dashboard:settings.title');
        return {
            title
        }
    };

    render() {
        const {
            t,
            navigation,
            profile
        } = this.props;
        const isForgotPasswordSettings = navigation.getParam('isForgotPasswordSettings');
        const settings = this._getSettingsOptions();
        return (
            <Container style={{backgroundColor: Colors.contentColor}}>
                <Content contentContainerStyle={{flex: 1}}>
                    <FlatList
                        data={settings}
                        renderItem={this.renderSettings}
                        keyExtractor={item => item.id.toString()}/>

                    {!isForgotPasswordSettings && <Button
                        onPress={this._logout}
                        containerStyle={{alignSelf: 'flex-end', marginBottom: 40, width: '100%'}}
                        buttonStyle={{
                            backgroundColor: '#ECF1F8',
                            marginHorizontal: Metrics.defaultMargin}}>
                        <ItemHeading
                            style={{color: Colors.dangerDark}}>
                            {profile && t('common:interface.logout', {account: profile.phone})}
                        </ItemHeading>
                    </Button>}
                </Content>
            </Container>
        )
    }

    renderSettings = ({item}) => {
        const {navigation} = this.props;
        // console.log('navigation', navigation);
        let onPress;
        if (item.link) {
            if (item.pushScreen) {
                onPress = navigation.push.bind(this, item.link, item.linkParams);
            } else {
                onPress = navigation.navigate.bind(this, item.link, item.linkParams);
            }
        }
        return (
            <Item showArrow onPress={onPress}>
                <ItemHeading style={[TypographyStyles.textDark, {marginBottom: 0}]}>{item.title}</ItemHeading>
            </Item>
        )
    };

    _logout = () => {
        this.props.logout();
    };

    _getSettingsOptions = () => {
        const {t, navigation} = this.props;
        const isForgotPasswordSettings = navigation.getParam('isForgotPasswordSettings');
        let settings;
        if (isForgotPasswordSettings) {
            settings = [
                {
                    id: 1,
                    title: t('dashboard:settings.options.changeLoginPassword'),
                    link: 'ResetPassword',
                    linkParams: {
                        intent: 'edit_pass',
                        navTitle: t('dashboard:settings.options.changeLoginPassword')
                    }
                },
                {
                    id: 2,
                    title: t('dashboard:settings.options.changeTradePassword'),
                    link: 'TradePassword',
                    linkParams: {
                        navTitle: t('dashboard:settings.options.changeTradePassword'),
                        intent: 'edit'
                    }
                },
            ]
        } else {
            settings = [
                {
                    id: 1,
                    title: t('dashboard:settings.options.changePassword'),
                    link: 'Settings',
                    pushScreen: true,
                    linkParams: {
                        isForgotPasswordSettings: true
                    }
                },
                {
                    id: 6,
                    title: 'KYC',
                    link: 'KYC',
                },
                {
                    id: 4,
                    title: t('dashboard:settings.options.changeLanguage'),
                    link: 'Language',
                    linkParams: {}
                },
                {
                    id: 5,
                    title: t('dashboard:settings.options.joinCommunity'),
                    link: 'JoinCommunity',
                },
                // {
                //     id: 3,
                //     title: t('dashboard:settings.options.invite')
                // },
            ];
        }
        return settings;
    }
}

const mapStateToProps = (state) => ({
    profile: ProfileSelectors.selectProfile(state)
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(LoginActions.logoutRequest())
});

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Settings));