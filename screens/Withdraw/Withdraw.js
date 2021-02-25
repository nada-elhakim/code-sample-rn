import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, TextInput, Image} from "react-native";
import {reduxForm, change, Field, reset} from "redux-form";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Balance from "../../components/Balance/Balance";
import Colors from "../../theme/variables/Colors";
import Metrics from "../../theme/variables/Metrics";
import Item from "../../theme/components/Item/Item";
import Text from "../../theme/components/Text/Text";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import TransferAmountField from "../../components/TransferAmountField/TransferAmountField";
import Button from "../../theme/components/Button/Button";
import {withNamespaces} from "react-i18next";
import AddressField from "../../components/AddressField/AddressField";
import WithdrawActions, {WithdrawSelectors} from "./WithdrawRedux";
import CurrencyListModal from "../../modals/CurrencyListModal/CurrencyListModal";
import CurrencyActions, {CurrencySelectors} from "../../redux/common/Currency/CurrencyRedux";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import SelectedCurrencyItem from "../SelectedCurrencyItem/SelectedCurrencyItem";
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";
import TradePasswordModal from "../../modals/TradePasswordModal/TradePasswordModal";

class Withdraw extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:withdraw.title')
        }
    };

    state = {
        modalVisible: false,
        selectedCurrency: null,
        tradePasswordModalVisible: false,
        qrCodeScannerModalVisible: false,
        formValues: null
    };

    render() {
        const {
            t,
            handleSubmit,
            loading,
            currencies,
            profile
        } = this.props;

        const selectedCurrency = this._getSelectedCurrency();

        const minWithdrawalAmount =
            selectedCurrency && selectedCurrency.min_withdraw_amount &&
            parseFloat(selectedCurrency.min_withdraw_amount).toFixed(2);

        const {
            tradePasswordModalVisible,
            qrCodeScannerModalVisible
        } = this.state;

        return(
          <Container>
              <Content style={{backgroundColor: Colors.contentColor}}>
                  <TradePasswordModal
                      visible={tradePasswordModalVisible}
                      onTradePasswordEntered={this._onTradePasswordEntered}
                      onModalClose={this._closeTradePasswordModal}/>

                  <View>
                      {currencies && <CurrencyListModal
                          onCurrencySelected={this._onCurrencySelected}
                          onModalClose={this._closeCurrencyModal}
                          currencies={currencies}
                          selectedCurrency={this.state.selectedCurrency || currencies[0]}
                          visible={this.state.modalVisible}/>}

                      <TextInput
                          name="currency_id"
                          style={{display: 'none'}}/>

                      <View style={{marginBottom: Metrics.defaultMargin}}>
                          <Balance
                              selectedCurrency={selectedCurrency}
                              profile={profile}
                              color={Colors.primaryDark}/>
                      </View>

                      {
                          selectedCurrency &&
                          <SelectedCurrencyItem
                          onCurrencySelect={() => this._setModalVisible(true)}
                          selectedCurrency={selectedCurrency}/>
                      }

                      <Item
                          style={{paddingVertical: 10}}
                          containerStyle={{
                              // paddingHorizontal: 0,
                              paddingRight: 20,
                              paddingLeft: 12
                          }}>
                          <AddressField
                              placeholder={t('dashboard:withdraw.enterAddress')}
                              name="address"
                              onAddressCodeScanned={this._onAddressCodeScanned}/>
                      </Item>

                      <Item
                          style={{paddingVertical: 10}}>
                          {selectedCurrency && <TransferAmountField
                              label={selectedCurrency.symbol}
                              placeholder={t('dashboard:withdraw.minAmount', {amount: minWithdrawalAmount})}
                              name="amount"
                              minAmount={selectedCurrency.min_withdraw_amount}
                              minAmountErrorMessage={t('common:transferAmountField.minThresholdError',
                                  {min: minWithdrawalAmount})}
                              onPress={this._copyBalance}
                              buttonColor={Colors.primaryDark}
                          />}
                      </Item>


                      <Item style={{flexDirection: 'row'}}>
                          <Text>{t('dashboard:withdraw.withdrawFee')}</Text>
                          {selectedCurrency && <Text style={TypographyStyles.textPrimary}>
                              {selectedCurrency.withdraw_fee } {selectedCurrency.symbol }
                          </Text>}
                      </Item>
                  </View>

                  <Item
                      containerStyle={{
                          marginTop: Metrics.defaultMargin
                      }}
                      style={{paddingVertical: 6}}>
                      {profile && <VerificationCodeField
                          name="captcha"
                          noIcon
                          noBorder
                          phone={profile.phone}
                          intent="withdraw"/>}
                  </Item>

                  <Item
                      containerStyle={{
                          backgroundColor: 'transparent',
                          paddingVertical: 10
                      }}>
                      <Button
                          onPress={handleSubmit(this._openTradePasswordModal)}
                          loading={loading}
                          disabled={loading}>
                          <Text style={TypographyStyles.textClear}>
                              {t('dashboard:withdraw.withdraw')}
                          </Text>
                      </Button>
                  </Item>
              </Content>
          </Container>
      );
    }

    _getSelectedCurrency() {
        const {currencies} = this.props;
        const {selectedCurrency} = this.state;
        if (selectedCurrency) {
            return selectedCurrency;
        } else {
            if (currencies && currencies.length > 0) {
                return currencies[0]
            }
        }
    }

    _selectCurrency = () => {
       this.props.getCurrencies();
       this._setModalVisible(true);
    };

    _onCurrencySelected = (selectedCurrency) => {
        const {
            change
        } = this.props;
        change('amount', '');
        this.setState({selectedCurrency});
        this._setFieldCurrencyId(selectedCurrency);
        this._closeCurrencyModal();
    };

    _setFieldCurrencyId = (selectedCurrency) => {
        this.props.changeFieldValue('currency_id', selectedCurrency.id);

    };

    _closeCurrencyModal = () => {
        this._setModalVisible(!this.state.modalVisible)
    };

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    _closeTradePasswordModal = () => {
        this.setState({tradePasswordModalVisible:  !this.state.tradePasswordModalVisible});
        this.props.resetTradePassword();
    };

    _setTradePasswordModalVisible(tradePasswordModalVisible) {
        this.setState({tradePasswordModalVisible})
    };

    _openTradePasswordModal = (formValues) => {
        this.setState({formValues})
        this._setTradePasswordModalVisible(true);
    };

    _onTradePasswordEntered = ({trade_password}) => {
        const {
            withdraw
        } = this.props;

        const withdrawParams = {
            ...this.state.formValues,
            trade_password
        };
        withdraw(withdrawParams);
        this._closeTradePasswordModal();
    };

    _onAddressCodeScanned = (data) => {
        const {
            change
        } = this.props;
        change('address', data);
    };

    _copyBalance = () => {
        const {
            profile,
            change
        } = this.props;

        const selectedCurrency = this._getSelectedCurrency();

        if (selectedCurrency && profile) {
            const balance = profile[selectedCurrency.balance_field].toString();
            change('amount', balance);
        }
    };
}

const mapStateToProps = (state) => {
    return {
        loading: WithdrawSelectors.selectLoading(state),
        currencies: CurrencySelectors.selectFilteredCurrencies(state, 'withdrawable'),
        profile: ProfileSelectors.selectProfile(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        withdraw: (withdrawParams) => dispatch(WithdrawActions.withdrawRequest(withdrawParams)),
        getCurrencies: () => dispatch(CurrencyActions.currencyRequest()),
        resetTradePassword: () => dispatch(reset('tradePasswordModalForm')),
        changeFieldValue: function(field, value) {
            dispatch(change('withdrawForm', field, value))
        }
    }
};

export default reduxForm({
    form: 'withdrawForm',
    initialValues: {
        currency_id: '1',
        // address: '0xFc76bFBB7A24AD45C06D22D6f2492504f22Ac517',
        // amount: '1'
    }
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Withdraw)));