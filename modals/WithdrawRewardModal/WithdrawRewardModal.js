import React, {Component} from 'react';
import {
    FlatList,
    Modal,
    View,
    Image,
    Keyboard
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from "../../theme/components/Item/Item";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import TransferAmountField from "../../components/TransferAmountField/TransferAmountField";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import {reduxForm} from "redux-form";
import Metrics from "../../theme/variables/Metrics";

class WithdrawRewardModal extends Component {
    render() {
        const {
            visible,
            t,
            loading,
            handleSubmit,
            rewardBalance
        } = this.props;

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
                        <Item style={{alignItems: 'flex-end'}}>
                            <Button
                                containerStyle={{
                                    width: 40
                                }}
                                onPress={this._onClose}
                                headerButton
                                transparent>
                                <Ionicons
                                    size={30}
                                    name="ios-close-circle-outline"/>
                            </Button>
                        </Item>
                        <Item noBorder style={{paddingVertical: 10}}>
                            <TransferAmountField
                                onPress={this._copyBalance}
                                name="amount"/>
                        </Item>

                        <Item>
                            <Text>
                                {t('dashboard:uCoin.availableBalance')}: {rewardBalance}
                            </Text>
                        </Item>

                        <Item noBorder containerStyle={{backgroundColor: 'transparent'}}>
                            <Button
                                disabled={loading || rewardBalance <= 0}
                                loading={loading}
                                onPress={handleSubmit(this._onSubmit)}>
                                <Text style={TypographyStyles.textClear}>
                                    {t('dashboard:uReturn.withdraw')}
                                </Text>
                            </Button>
                        </Item>
                    </View>
                </View>
            </Modal>
        )
    }


    _copyBalance = () => {
        const {
            change,
            rewardBalance
        } = this.props;
        rewardBalance && change('amount', rewardBalance);
    };

    _onClose = () => {
        const {
            onModalClose,
            reset
        } = this.props;
        onModalClose();
        reset();
    };

    _onSubmit = ({amount}) => {
        const {
            onSubmit,
        } = this.props;
        onSubmit(amount);
        Keyboard.dismiss();
        this._onClose();
    }
}

export default reduxForm({
    form: 'withdrawReward',
})(withNamespaces()(WithdrawRewardModal));