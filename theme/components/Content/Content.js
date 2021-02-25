import React, { Component } from "react";
import {
    StyleSheet,
    Platform
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from "../../variables/Colors";


class Content extends Component {
    render() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}
                keyboardShouldPersistTaps="handled"
                {...this.props}
                contentContainerStyle={[
                    styles.contentStyle,
                    this.props.contentContainerStyle
                ]}>
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}

export default Content;

const styles = StyleSheet.create({
    container: {
    },
    contentStyle: {
        backgroundColor: Colors.contentColor,
    }
});