import React, {Component} from 'react';
import {
    Modal,
    View,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from "../../theme/components/Item/Item";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import {Field, reduxForm} from "redux-form";
import Metrics from "../../theme/variables/Metrics";
import PinCodeField from "../../components/PinCodeField/PinCodeField";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Colors from "../../theme/variables/Colors";

class TradePasswordModal extends Component {
    render() {
        const {
            visible,
            onModalClose,
            t,
            loading,
            handleSubmit,
            onTradePasswordEntered
        } = this.props;

        const pinCodeCellWidth = (Metrics.windowWidth * 0.8 - 66) / 6;
        return (
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                presentationStyle="overFullScreen"
            >
                <View style={{
                    width: Metrics.windowWidth,
                    height: Metrics.windowHeight,
                    backgroundColor: 'rgba(0,0,0,.4)'}}>
                    <View style={{
                        marginTop: 100,
                        width: '80%',
                        alignSelf: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Item style={{flexDirection: 'row'}}>
                            <ItemHeading center style={{
                                flex: 1,
                                alignSelf: 'center',
                                marginLeft: 30,
                                color: Colors.textDark,
                                justifyContent: 'center'
                            }}>
                                {t('common:interface.tradePassword')}
                            </ItemHeading>
                            <Button
                                containerStyle={{
                                    width: 40
                                }}
                                onPress={onModalClose}
                                headerButton
                                transparent>
                                <Ionicons
                                    size={30}
                                    name="ios-close-circle-outline"/>
                            </Button>
                        </Item>
                        <Item noBorder style={{paddingVertical: 10}}>
                            <Field
                                cellWidth={pinCodeCellWidth}
                                cellHeight={pinCodeCellWidth + 2}
                                cellStyleFocused={{borderWidth: 1}}
                                name="trade_password"
                                hasBorder={true}
                                cellSpacing={6}
                                cellStyle={{
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    borderColor: '#eee'
                                }}
                                component={PinCodeField}
                            />
                        </Item>
                        <Item noBorder containerStyle={{backgroundColor: 'transparent'}}>
                            <Button
                                disabled={loading}
                                loading={loading}
                                onPress={handleSubmit(onTradePasswordEntered)}>
                                <Text style={TypographyStyles.textClear}>
                                    {t('common:interface.confirm')}
                                </Text>
                            </Button>
                        </Item>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default reduxForm({
    form: 'tradePasswordModalForm'
})(withNamespaces()(withNamespaces()(TradePasswordModal)));
