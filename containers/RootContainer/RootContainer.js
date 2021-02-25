import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from '../../redux';
import AppNavigator from "../../navigation/AppNavigator";
import {Root} from "../../theme/components/Root/Root";
import Notifications from "../../services/Notifications";
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from "react-native-popup-menu";

const { store } = createStore();

class RootContainer extends Component {
    constructor(props) {
        super(props);
        this.notifications = new Notifications();
        this.notifications.initPush();

    }

    componentDidMount() {
        SplashScreen.hide();
        this.notifications.onXGAddEvent();
    }

    componentWillUnmount() {
        this.notifications.onXGAddEvent();
    }

    render () {
        return (
            <Root>
                <Provider store={store}>
                    <MenuProvider>
                        <AppNavigator />
                    </MenuProvider>
                </Provider>
            </Root>
        )
    }
}

export default RootContainer;
