import React, {Component} from 'react';
import {required} from 'redux-form-validators'
import {Field} from 'redux-form';
import {withNamespaces} from "react-i18next";

import InputField from "../InputField/InputField";
import Colors from "../../theme/variables/Colors";
import {View} from "react-native";
import QrCodeScannerModal from "../../modals/QrCodeScannerModal/QrCodeScannerModal";

class AddressField extends Component {
    state = {
        qrCodeScannerModalVisible: false,
    };

    render() {
        const {
            name,
            style,
            t,
            placeholder = t('common:interface.enterWalletAddress'),
            buttonColor = Colors.highlight
        } = this.props;

        const addressRequiredMessage = t('common:interface.addressRequired');

        return (
            <View>
                <QrCodeScannerModal
                    visible={this.state.qrCodeScannerModalVisible}
                    dismissModal={this._onModalDismiss}
                />
                <Field
                    name={name}
                    style={style}
                    noBorder={true}
                    button={{
                        buttonIconProps: {
                            type: 'Ionicons',
                            name: 'ios-qr-scanner',
                            color: Colors.primaryDark,
                            size: 22
                        },
                        onPress: this._openQrCodeScanner
                    }}
                    errorTextStyle={{
                        paddingRight: 10
                    }}
                    placeholder={placeholder}
                    validate={[required({message: addressRequiredMessage})]}
                    component={InputField}/>
            </View>

        )
    }

    _openQrCodeScanner = () => {
        this._setModalVisible(true);
    };

    _onModalDismiss = (data) => {
        const {onAddressCodeScanned} = this.props;
        if (data) {
            onAddressCodeScanned && onAddressCodeScanned(data)
        }
        this.setState({qrCodeScannerModalVisible: false});
    };

    _setModalVisible(visible) {
        this.setState({qrCodeScannerModalVisible: visible});
    };
}
export default withNamespaces()(AddressField);