import React, {Component} from 'react';
import {
    Modal,
    View,
    Keyboard
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Item from "../../theme/components/Item/Item";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import TransferAmountField from "../../components/TransferAmountField/TransferAmountField";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import {reduxForm, change as changeFieldValue } from "redux-form";
import Metrics from "../../theme/variables/Metrics";
import TransferCoinActions, {TransferCoinSelectors} from "../../screens/Ucoin/redux/TransferCoinRedux";
import {connect} from "react-redux";

class TransferInModal extends Component {
    render() {
        const {
            visible,
            t,
            profile,
            loading,
            handleSubmit
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
                                {t('dashboard:uCoin.availableBalance')}: {profile && profile.balance} USE
                            </Text>
                        </Item>

                        <Item noBorder containerStyle={{backgroundColor: 'transparent'}}>
                            <Button
                                disabled={loading}
                                loading={loading}
                                onPress={handleSubmit(this._transferAmount)}>
                                <Text style={TypographyStyles.textClear}>
                                    {
                                        t('dashboard:uCoin.transferIn')
                                    }
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
            profile,
            change
        } = this.props;
        change('amount', profile.balance.toString());
    };

    _onClose = () => {
        const {
            onModalClose,
            reset
        } = this.props;
        onModalClose('in');
        reset();
    };

    _transferAmount = ({amount}) => {
        const {
            transfer,
        } = this.props;
        transfer(amount, 'in');
        Keyboard.dismiss();
        this._onClose();
    }
}

const mapStateToProps = (state, ownProps) => ({
    loading: TransferCoinSelectors.selectLoading(state),
    form: ownProps.form
});

const mapDispatchToProps = (dispatch) => ({
    transfer: (amount, direction) => dispatch(TransferCoinActions.transferCoin(amount, direction))
});

export default reduxForm({
    form: 'coinTransferForm'
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(TransferInModal)));
