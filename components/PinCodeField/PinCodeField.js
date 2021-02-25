import React, {Component} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Colors from "../../theme/variables/Colors";
import PinCodeInput from "../../theme/components/PinCodeInput/PinCodeInput";
import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";


class PinCodeField extends Component {
    pinInput = React.createRef();
    state = {
        code: '',
        showError: false
    };
    render() {
        let hasError;
        const {showError} = this.state;
        const width = (Metrics.windowWidth - 32) / 6;
        const {
            cellStyle,
            cellStyleFocused,
            input,
            hasBorder,
            meta: { pristine, error, touched},
            cellWidth = width,
            cellHeight = 36,
            cellSpacing = 0
        } = this.props;

        if(touched && error){
            hasError = true;
        }

        return (
            <View style={{position: 'relative', paddingTop: 18}}>
                <View style={styles.containerStyle}>
                    <PinCodeInput
                        {...this.props}
                        autoFocus
                        ref={this.pinInput}
                        value={input.value}
                        password
                        mask="●"
                        cellWidth={cellWidth}
                        cellHeight={cellHeight}
                        textStyle={styles.textStyle}
                        hasBorder={hasBorder}
                        cellSpacing={cellSpacing}
                        cellStyle={[
                            styles.cellStyle,
                            cellStyle
                        ]}
                        keyboardType={Platform.OS === 'ios' ? 'numeric' : 'phone-pad'}
                        cellStyleFocused={[
                            styles.cellStyleFocused,
                            cellStyleFocused
                        ]}
                        codeLength={6}
                        onTextChange={code => input.value = code}
                        onFulfill={this._checkCode}
                        onBackspace={() => console.log('No more back.')}
                    />
                </View>
                {(showError || hasError) && error && <Text style={{color: Colors.danger, position: 'absolute', fontSize: 12}}>{error}</Text>}
            </View>

        );
    }

    _checkCode = (code) => {
        const {confirmCode, comparedCode, input} = this.props;
        input.value = code;
        if (confirmCode) {
            if (code !== comparedCode) {
                this.pinInput.current.shake()
                    .then(() => input.value = null);
            }
        }
        this.setState({showError: true});

    };

    _focusPrevInput() {

    }
}

export default PinCodeField;

const styles = StyleSheet.create({
    cellStyle: {
        borderWidth: 0,
        borderRightWidth: 1,
        borderRightColor: Colors.inputBorderColor,
    },
    cellStyleFocused: {
        borderWidth: 0,
    },
    containerStyle: {
        backgroundColor: Colors.inputBackgroundColor,
        paddingVertical: 12
    },
    textStyle: {
        fontSize: 16
    },
    withBorder: {

    }
});
