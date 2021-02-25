import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ViewPropTypes,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    containerDefault: {

    },
    cellDefault: {
        borderColor: 'gray',
        borderWidth: 1,
    },
    cellFocusedDefault: {
        borderColor: 'black',
        borderWidth: 2,
    },
    textStyleDefault: {
        color: 'gray',
        fontSize: 24,
    },
    textStyleFocusedDefault: {
        color: 'black',
    },
});

class PinCodeInput extends Component {

    state = {
        maskDelay: false,
        focused: false,
    }
    ref = React.createRef();

    shake = () => {
        return this.ref.current.shake(650);
    }

    _inputCode = (code) => {
        const { password, codeLength = 4, onTextChange, onFulfill } = this.props;

        if (onTextChange) {
            onTextChange(code);
        }
        if (code.length === codeLength && onFulfill) {
            onFulfill(code);
        }

        // handle password mask
        const maskDelay = password
           && code.length - 1 > this.props.input.value.length; // only when input new char

        this.setState({ maskDelay });

        if (maskDelay) { // mask password after delay
            setTimeout(() => this.setState({ maskDelay: false }), 200);
        }
    }

    _keyPress = (event) => {
        if (event.nativeEvent.key === 'Backspace') {
            const { input, onBackspace } = this.props;
            if (input.value === '' && onBackspace) {
                onBackspace();
            }
        }
    }

    _onFocused = (focused) => {
        this.setState({ focused });
    }

    render() {
        const {
            value,
            cellWidth,
            cellHeight,
            codeLength,
            cellSize,
            cellSpacing,
            placeholder,
            password,
            mask,
            autoFocus,
            containerStyle,
            cellStyle,
            cellStyleFocused,
            textStyle,
            textStyleFocused,
            keyboardType,
            hasBorder,
            input
        } = this.props;

        const { maskDelay, focused } = this.state;
        return (
            <Animatable.View
                ref={this.ref}
                style={[{ alignItems: 'stretch', flexDirection: 'row', justifyContent: 'center', position: 'relative',
                    width: cellWidth * codeLength + cellSpacing * (codeLength - 1),
                    height: cellHeight,
                },
                    containerStyle,
                ]}>
                <View style={{
                    position: 'absolute', margin: 0, height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {
                        Array.apply(null, Array(codeLength)).map((_, idx) => {
                            const cellFocused = focused && idx === input.value.length;
                            const filled = idx < input.value.length;
                            const last = idx == input.value.length - 1;
                            const lastCell = idx === codeLength - 1;

                            return (
                                <Animatable.View key={idx}
                                                 style={[
                                                     !hasBorder && lastCell && {borderRightWidth: 0},
                                                     cellFocused ? cellStyleFocused : {},
                                                     cellStyle,
                                                     {
                                                         width: cellWidth,
                                                         height: cellHeight,
                                                         marginLeft: cellSpacing / 2,
                                                         marginRight: cellSpacing / 2,
                                                         flexDirection: 'row',
                                                         alignItems: 'center',
                                                         justifyContent: 'center',
                                                     }
                                                 ]}
                                                 animation={ idx === input.value.length && focused ? 'pulse' : null }
                                                 iterationCount="infinite"
                                                 duration={500}
                                >
                                    <Text
                                        style={[
                                            textStyle,
                                            cellFocused ? textStyleFocused : {},
                                        ]}>
                                        {filled &&
                                        (password && (!maskDelay || !last)) ? mask : input.value.charAt(idx)
                                        }
                                        {!filled &&
                                        placeholder
                                        }
                                    </Text>
                                </Animatable.View>
                            );
                        })
                    }
                </View>
                <TextInput
                    {...input}
                    {...this.props}
                    // value={value}
                    onChangeText={this._inputCode}
                    onKeyPress={this._keyPress}
                    onFocus={() => this._onFocused(true)}
                    onBlur={() => this._onFocused(false)}
                    spellCheck={false}
                    autoFocus={autoFocus}
                    keyboardType={keyboardType}
                    numberOfLines={1}
                    maxLength={codeLength}
                    style={{
                        flex: 1,
                        opacity: 0,
                        textAlign: 'center',
                    }}/>
            </Animatable.View>
        );
    }

//     selection={{
//     start: input.value ? input.value.length : 0,
//     end: input.value ? input.value.length : 0,
// }}
    static defaultProps = {
        // value: '',
        codeLength: 4,
        cellSize: 48,
        cellHeight: 42,
        cellWidth: 48,
        cellSpacing: 4,
        placeholder: '',
        password: false,
        mask: '*',
        keyboardType: 'numeric',
        autoFocus: false,
        containerStyle: styles.containerDefault,
        cellStyle: styles.cellDefault,
        cellStyleFocused: styles.cellFocusedDefault,
        textStyle: styles.textStyleDefault,
        textStyleFocused: styles.textStyleFocusedDefault,
    }
}

PinCodeInput.propTypes = {
    value: PropTypes.string,
    codeLength: PropTypes.number,
    cellSize: PropTypes.number,
    cellWidth: PropTypes.number,
    cellHeight: PropTypes.number,
    cellSpacing: PropTypes.number,

    placeholder: PropTypes.string,
    mask: PropTypes.string,
    password: PropTypes.bool,

    autoFocus: PropTypes.bool,

    containerStyle: ViewPropTypes.style,

    cellStyle: ViewPropTypes.style,
    cellStyleFocused: ViewPropTypes.style,

    textStyle: Text.propTypes.style,
    textStyleFocused: Text.propTypes.style,

    animationFocused: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),

    onFulfill: PropTypes.func,
    onChangeText: PropTypes.func,
    onBackspace: PropTypes.func,

    keyboardType: PropTypes.string,
};

export default PinCodeInput;