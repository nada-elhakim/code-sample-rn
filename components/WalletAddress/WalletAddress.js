import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';
import {withNamespaces} from "react-i18next";
import {
    View,
    StyleSheet,
    Clipboard
} from "react-native";

import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Text from "../../theme/components/Text/Text";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import {ToastContainer as Toast} from '../../theme/components/Toast/ToastContainer';

class WalletAddress extends Component {
    state = {
        copiedToClipboard: false
    };

    render() {
        const {t, withQrCode} = this.props;
        return withQrCode ? this.renderAddressItemWithQrCode(t) : this.renderAddressItem(t);
    }

    renderAddressItem(t) {
        const {
            address
        } = this.props;
        return (
            <Item noBorder>
                <ItemHeading>{t('common:interface.walletAddress')}</ItemHeading>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.address} numberOfLines={1}>{address && address}</Text>
                    <Button
                        headerButton
                        onPress={this._copyAddressToClipboard}
                    >
                        <Text style={styles.buttonText}>{t('common:interface.copy')}</Text>
                    </Button>
                </View>
            </Item>
        )
    }

    renderAddressItemWithQrCode(t) {
        const {
            address
        } = this.props;
        return (
            <Item noBorder style={{alignItems: 'center', paddingHorizontal: 26}}>
                {address && <QRCode
                    value={address}
                    size={160}
                    bgColor='black'
                    fgColor='white'/>}
                <Text
                    style={[styles.address, {marginVertical: 20}]}
                    numberOfLines={1}>
                    {address}
                </Text>
                <Text style={{marginBottom: 20}}>
                    {t('common:interface.walletAddressTips')}
                </Text>
                <Button
                    onPress={this._copyAddressToClipboard}
                    containerStyle={{alignSelf: 'stretch'}}
                    buttonStyle={{backgroundColor: '#ECF1F8'}}>
                    <Text style={TypographyStyles.textDark}>{t('common:interface.copy')}</Text>
                </Button>
            </Item>
        )
    }

    _copyAddressToClipboard = () => {
        const {
            t,
            address
        } = this.props;
        Clipboard.setString(address);
        Toast.show({
            text: t('common:interface.addressCopied'),
            buttonText: t('common:interface.ok'),
            duration: 2000,
            type: 'success'
        });
    }


}

export default withNamespaces()(WalletAddress);

const styles = StyleSheet.create({
    buttonText: {
        color: Colors.primaryDark
    },
    address: {
        flex: 1,
        color: '#242E5B',
        fontSize: 12
    }
});