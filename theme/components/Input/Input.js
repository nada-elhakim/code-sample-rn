import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Platform,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Text,
} from "react-native";

import variables from "../../variables/platform";
import Colors from "../../variables/Colors";
import getIconType from "../../utils/getIconType";
import Button from "../Button/Button";

class Input extends Component {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            isInputFocused: false
        };
    }


    onFocus() {
        this.setState({isInputFocused: true });
    }

    onBlur() {
        this.setState({isInputFocused: false });
        const {input} = this.props;
        input.onBlur(input.value);
    }

    render() {
        const {
            iconProps,
            noBorder,
            button,
            error,
            errorMessage,
            style,
            label,
            errorTextStyle,
            focusOnError,
            meta
        } = this.props;

        const inputGroupStyles = [styles.container, noBorder ? styles.inputGroupNoBorder : styles.inputGroupBorder, style];
        let Icon, ButtonIcon;

        if (iconProps) {
            Icon = getIconType(iconProps.type);
        }

        if (button && button.buttonIconProps) {
            ButtonIcon = getIconType(button.buttonIconProps.type);
        }

        let iconColor  = this.state.isInputFocused ? Colors.inputFocusIconColor : Colors.inputIconColor;

        if (this.state.isInputFocused && !noBorder) {
            inputGroupStyles.push(styles.inputGroupActive);
        }

        if (error) {
            !noBorder && inputGroupStyles.push(styles.inputGroupError);
            iconColor = Colors.danger;
        }
        //
        // if (meta.error && meta.pristine) {
        //     focusOnError && this.input.focus();
        // }

        return (
            <View style={{position: 'relative', paddingTop: 4}}>
                {error && <Text style={[styles.errorText, errorTextStyle]}>{errorMessage}</Text>}
                <View style={inputGroupStyles}>
                    <View style={[styles.container, {flex:1}]}>
                        {Icon &&
                        <Icon
                            {...iconProps} style={[iconProps.style && iconProps.style, {width: 40}]} color={iconColor} />}
                        {label && label !== '' ? <Text uppercase>{label}</Text> : null}
                        <TextInput
                            {...this.props}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            ref={ref => this.input = ref}
                            style={styles.input}/>
                    </View>
                    {
                        button &&
                        <Button
                            buttonStyles={[styles.inputButton, button.buttonStyle]}
                            onPress={button.onPress && button.onPress}
                            disabled={button.disabled && button.disabled}
                            transparent
                            small>
                            {button.buttonIconProps ?
                                <ButtonIcon
                                    name={button.buttonIconProps.name}
                                    size={button.buttonIconProps.size}
                                    color={button.buttonIconProps.color} /> :
                                <Text style={[styles.inputButtonText, button.buttonTextStyle]}>{button.title}</Text>
                            }
                        </Button>}
                </View>
            </View>

        );
    }

}

export default Input;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGroupBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.inputBorderColor
    },
    inputGroupNoBorder: {
        borderBottomWidth: 0,
    },
    inputGroupError: {
        borderBottomColor: Colors.danger
    },
    inputGroupActive: {
        borderBottomColor: Colors.inputFocusBorderColor
    },
    input: {
        height: variables.inputHeight,
        flex: 1,
        marginHorizontal: 8
    },
    errorText: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 12,
        color: Colors.danger
    },
    inputButton: {
        flex: 1,
    },
    inputButtonText: {
        color: Colors.primary
    }
});
