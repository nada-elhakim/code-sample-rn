import React, {Component} from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Alert,
    Platform
} from 'react-native';
import { throttle } from 'lodash';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {RNCamera} from 'react-native-camera';


import Metrics from "../../theme/variables/Metrics";
import {withNamespaces} from "react-i18next";
import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import FullWidthImage from "react-native-fullwidth-image";
import Images from "../../theme/variables/Images";
import Button from "../../theme/components/Button/Button";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";

class QrCodeScannerModal extends Component {
    state = {
        cameraPermission: null,
        lastScannedUrl: null,
    };


    componentWillMount() {
        this._alertForCameraPermission();

    }

    render() {
        const {t, visible} = this.props;
        return (
            <Modal
                visible={visible}
                animationType="slide"
            >
                {this.state.cameraPermission && <Container>
                    {
                        this.state.cameraPermission === 'authorized' ?
                            <View style={{flex: 1}}>
                                <RNCamera
                                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                                    onBarCodeRead={this._onBarCodeRead}
                                    style={{
                                       flex:1
                                    }}
                                />
                                <View style={styles.focusContainer}>
                                    <View style={styles.focus}>
                                        <FullWidthImage source={Images.qrScanFocus} width={200} height={200} style={styles.focus} />
                                    </View>
                                </View>
                            </View> :
                            <View style={{flex: 1}}>
                                <View style={styles.header}>
                                    <ItemHeading noMargin>{t('common:interface:qrCodeScanner')}</ItemHeading>
                                </View>
                                <View style={{flex: 1, marginTop: 60}}>
                                    <Text style={{color: '#000', textAlign: 'center'}}>{t('common:interface:noCameraPermission')}</Text>
                                </View>
                            </View>
                    }

                    <View style={[styles.footer]}>
                        <Button
                            transparent
                            onPress={this._handlePressCancel}>
                            <Text style={[
                                TypographyStyles.textClear,
                                this.state.cameraPermission !== 'authorized' && TypographyStyles.textDark
                                ]}>
                                {t('common:interface.cancel')}
                            </Text>
                        </Button>
                    </View>
                </Container>}
            </Modal>
        );
    }


    _handlePressCancel = () => {
        this.props.dismissModal(null);
        // this._isMounted = false;
    };

    _onBarCodeRead = throttle(({ data: url }) => {
        this.props.dismissModal(url);
    }, 2000);

    _checkPermission = () => {
        return Permissions.check('camera')
    };

    _requestPermission = () => {
        Permissions.request('camera').then(response => {
            this.setState({ cameraPermission: response })
        })
    };

    _alertForCameraPermission = async () => {
        const {t} = this.props;
        const permission = await this._checkPermission();
        this.setState({ cameraPermission: permission });
        if (permission !== 'authorized') {
            Alert.alert(
                t('common:interface:noCameraPermission'),
                null,
                [
                    {
                        text: t('common:interface.cancel'),
                        onPress: () => console.log('Permission denied'),
                        style: 'cancel',
                    },
                    this.state.cameraPermission === 'undetermined'
                        ? { text: t('common:interface.ok'), onPress: this._requestPermission }
                        : { text: t('common:interface.openSettings'), onPress: () => {
                        if (Platform.OS === 'ios') {
                            Permissions.canOpenSettings() && Permissions.openSettings();
                        } else {
                            AndroidOpenSettings.appDetailsSettings()
                        }
                    } }
                ],
            )
        }

    }

}

export default withNamespaces()(QrCodeScannerModal);


const styles = StyleSheet.create({
    focusContainer: {
        width: Metrics.windowWidth,
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    focus: {
        width: '50%',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 6
    },
    header: {
        ...Platform.select({
            ios: {
                height: 90,
                paddingTop: 50,
            },
            android: {
                height: 60,
            },
        }),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'center', alignItems: 'center'
    }
});
