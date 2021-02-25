import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {withNamespaces} from 'react-i18next';
import i18n from '../i18n/i18n.config';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from "./AuthNavigator";
import AuthLoading from "../screens/AuthLoading/AuthLoading";
import NavigationService from "./NavigationService";

const RootNavigation = createSwitchNavigator({
  AuthLoading: AuthLoading,
  Main: MainTabNavigator,
  Auth: AuthNavigator
}, {
    initialRouteName: 'AuthLoading',
    headerMode: 'auto'
});


const AppNavigator = () => {
    return <RootNavigation ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
    }} screenProps={{ t: i18n.getFixedT() }} />;
};

export default withNamespaces('defaultNamespace', {
    wait: false,
    withRef: false,
    nsMode: 'default',
    bindStore: false,
    bindI18n: 'languageChanged'
})(AppNavigator);
