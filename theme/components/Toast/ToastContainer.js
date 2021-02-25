import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Modal,
    Platform,
    Animated,
    StyleSheet,
    ViewPropTypes
} from "react-native";

import {Toast}  from "./Toast";
import Text from "../Text/Text";
import Button from "../Button/Button";
import Colors from "../../variables/Colors";

class ToastContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            fadeAnim: new Animated.Value(0)
        };
    }
    static toastInstance;
    static show({ ...config }) {
        this.toastInstance.showToast({ config });
    }
    static hide() {
        if (this.toastInstance.getModalState()) {
            this.toastInstance.closeToast("functionCall");
        }
    }
    getToastStyle() {
        return {
            position: "absolute",
            opacity: this.state.fadeAnim,
            width: "100%",
            elevation: 9,
            paddingHorizontal: Platform.OS === "ios" ? 20 : 0,
            top: this.state.position === "top" ? this.getTop() : undefined,
            bottom: this.state.position === "bottom" ? this.getTop() : undefined
        };
    }
    getTop() {
        if (Platform.OS === "ios") {
            return 30;
        } else {
            return 0;
        }
    }
    getButtonText(buttonText) {
        if (buttonText) {
            if (buttonText.trim().length === 0) {
                return undefined;
            } else return buttonText;
        }
        return undefined;
    }
    getModalState() {
        return this.state.modalVisible;
    }
    showToast({ config }) {
        this.setState({
            modalVisible: true,
            text: config.text,
            buttonText: this.getButtonText(config.buttonText),
            type: config.type,
            position: config.position ? config.position : "bottom",
            supportedOrientations: config.supportedOrientations,
            style: config.style,
            buttonTextStyle: config.buttonTextStyle,
            buttonStyle: config.buttonStyle,
            textStyle: config.textStyle,
            onClose: config.onClose
        });
        // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout)
        }
        // Set the toast to close after the duration.
        if (config.duration !== 0) {
            const duration = (config.duration > 0) ? config.duration : 1500;
            this.closeTimeout = setTimeout(this.closeToast.bind(this, 'timeout'), duration);
        }
        // Fade the toast in now.
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 200
        }).start();
    }
    closeModal(reason) {
        this.setState({
            modalVisible: false
        });
        const { onClose } = this.state;
        if (onClose && typeof onClose === "function") {
            onClose(reason);
        }
    }
    closeToast(reason) {
        clearTimeout(this.closeTimeout);
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 200
        }).start(this.closeModal.bind(this, reason));
    }

    getToastBgColor() {
        switch (this.state.type) {
            case 'danger':
                return Colors.danger;
            case 'success':
                return Colors.success;
            default:
                return 'orange';
        }
    }

    render() {
        if (this.state.modalVisible) {
            return (
                <Animated.View style={this.getToastStyle()}>
                    <Toast
                        style={[styles.toast, {backgroundColor: this.getToastBgColor()}]}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                flex: 1}}>
                            {this.state.text}
                        </Text>
                        {this.state.buttonText && (
                            <Button
                                transparent
                                buttonStyle={{
                                    height: 30,
                                    elevation: 0}}
                                onPress={() => this.closeToast('user')}
                            >
                                <Text style={{fontSize: 14, color: 'white'}}>
                                    {this.state.buttonText}
                                </Text>
                            </Button>
                        )}
                    </Toast>
                </Animated.View>
            );
        } else return null;
    }
}

ToastContainer.propTypes = {
    ...ViewPropTypes,
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.array
    ])
};

// const StyledToastContainer = connectStyle(
//     "NativeBase.ToastContainer",
//     {},
//     mapPropsToStyleNames
// )(ToastContainer);

export {ToastContainer};

const styles = StyleSheet.create({
    toast: {
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: Platform.OS === "ios" ? 5 : 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        minHeight: 50,
    }
});