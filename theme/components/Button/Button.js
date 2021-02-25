import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    StyleSheet,
    Keyboard
} from 'react-native';
import Colors from "../../variables/Colors";
import Layout from "../../variables/Metrics";

class Button extends Component {
    static defaultProps = {
        TouchableComponent:  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity,
        title: 'Button',
        onPress: () => console.log('Please attach a method to this component'),
        disabled: false,
        loading: false,
        transparent: false
    };

    componentDidMount() {
        const { linearGradientProps, ViewComponent } = this.props;
        if (linearGradientProps && !global.Expo && !ViewComponent) {
            /* eslint-disable no-console */
            console.error(
                `You need to pass a ViewComponent to use linearGradientProps 
                !\nExample: ViewComponent={require('react-native-linear-gradient')}`
            );
        }
    }

    render() {
        const {
            TouchableComponent,
            containerStyle,
            buttonStyle,
            disabledStyle,
            title,
            titleStyle,
            titleProps,
            onPress,
            disabled,
            headerButton,
            disabledTitleStyle,
            loading,
            transparent,
            linearGradientProps,
            small,
            children,
            ViewComponent = !disabled && linearGradientProps && global.Expo
                ? global.Expo.LinearGradient
                : View,
        } = this.props;

        return (
            <View style={[containerStyle]}>
                <TouchableComponent
                    onPress={this.onButtonPress.bind(this)}
                    disabled={disabled}
                    underlayColor={transparent ? 'transparent' : Colors.buttonUnderlayColor}
                    activeOpacity={transparent ? 0.2 : undefined}
                >
                    <ViewComponent
                        style={[
                            styles.button,
                            small && {height: Layout.buttonSmallHeight},
                            buttonStyle,
                            disabled && styles.disabled,
                            disabled && disabledStyle,
                            headerButton && { backgroundColor: 'transparent', height: undefined },
                            transparent && { backgroundColor: 'transparent', elevation: 0 },
                        ]}
                    >
                        {children}
                        {loading && <ActivityIndicator color={Colors.white} style={styles.indicatorStyle}/>}
                    </ViewComponent>
                </TouchableComponent>
            </View>
        );
    }

    onButtonPress() {
        const {onPress} = this.props;
        if (onPress) {
            onPress();
            Keyboard.dismiss();
        }
    }
}

export default Button;


const styles = {
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: Layout.buttonHeight,
        alignItems: 'center',
        borderRadius: Layout.buttonBorderRadius,
        backgroundColor: Colors.primaryDark,
        position: 'relative'
    },
    disabled: {
        backgroundColor: Colors.primary,
    },
    transparentTitle: {
        color: Colors.buttonTransparentTitleColor
    },
    title: {
        backgroundColor: 'transparent',
        color: Colors.buttonTitleColor,
        fontSize: 16,
        textAlign: 'center',
        padding: 8
    },
    disabledTitle: {
        color: Colors.buttonDisabledColor,
    },
    iconContainer: {
        marginHorizontal: 5,
    },
    indicatorStyle: {
        position: 'absolute',
        right: 16,
        top: Layout.buttonHeight / 3.5
    }

};

