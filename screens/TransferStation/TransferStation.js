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
import CurrencyListModal from "../../modals/CurrencyListModal/CurrencyListModal";
import CurrencyActions, {CurrencySelectors} from "../../redux/common/Currency/CurrencyRedux";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import SelectedCurrencyItem from "../SelectedCurrencyItem/SelectedCurrencyItem";
import VerificationCodeField from "../../components/VerificationCodeField/VerificationCodeField";
import TradePasswordModal from "../../modals/TradePasswordModal/TradePasswordModal";
import TransferActions, {TransferSelectors} from "./TransferStationRedux";
import InputField from "../../components/InputField/InputField";

class TransferStation extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:transferStation.title')
        }
    };

    state = {
        currencyModalVisible: false,
        selectedCurrency: null,
        tradePasswordModalVisible: false,
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
        const {tradePasswordModalVisible} = this.state;

        const maxTransferAmount = selectedCurrency && profile && profile[selectedCurrency.balance_field];

        console.log('transfer station currencies', currencies);

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
                          visible={this.state.currencyModalVisible}/>}

                      <TextInput
                          name="currency_id"
                          style={{display: 'none'}}/>

                      <View style={{marginBottom: Metrics.defaultMargin}}>
                          {profile && selectedCurrency && <Balance
                              selectedCurrency={selectedCurrency}
                              profile={profile}
                              color={Colors.primaryDark}/>}
                      </View>

                      {
                          selectedCurrency &&
                          <SelectedCurrencyItem
                          onCurrencySelect={() => this._setCurrencyModalVisible(true)}
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
                              placeholder={t('dashboard:transferStation.enterAddress')}
                              name="address"
                              onAddressCodeScanned={this._onAddressCodeScanned}/>
                      </Item>

                      {selectedCurrency && <Item
                          style={{paddingVertical: 10}}>
                          {profile &&
                          <TransferAmountField
                              label={selectedCurrency.symbol}
                              placeholder={t('dashboard:transferStation.enterAmount')}
                              name="amount"
                              maxAmount={maxTransferAmount}
                              maxAmountErrorMessage={t('dashboard:transferStation.maxTransferAmount', {balance: maxTransferAmount})}
                              onPress={this._copyBalance}
                              buttonColor={Colors.primaryDark}
                          />}
                      </Item>}

                  </View>

                  {/*<Item*/}
                      {/*containerStyle={{*/}
                          {/*marginTop: Metrics.defaultMargin*/}
                      {/*}}*/}
                      {/*style={{paddingVertical: 6}}>*/}
                      {/*{profile && <VerificationCodeField*/}
                          {/*name="captcha"*/}
                          {/*noIcon*/}
                          {/*noBorder*/}
                          {/*phone={profile.phone}*/}
                          {/*intent="transfer_currency"/>}*/}
                  {/*</Item>*/}

                  <Item
                      containerStyle={{
                          marginTop: Metrics.defaultMargin
                      }}
                      style={{paddingVertical: 6}}>
                      <Field
                          noBorder
                          multiline
                          numberOfLines={2}
                          name="memo"
                          placeholder={t('dashboard:transferStation:memo')}
                          component={InputField}
                      />
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
                              {t('dashboard:transferStation.transfer')}
                          </Text>
                      </Button>
                  </Item>
              </Content>
          </Container>
      );
    }


    _openQrCodeScanner = () => {
        this.props.navigation.navigate('QrCodeScanner')
    };

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
       this._setCurrencyModalVisible(true);
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
        this._setCurrencyModalVisible(!this.state.currencyModalVisible)
    };

    _setCurrencyModalVisible(visible) {
        this.setState({currencyModalVisible: visible});
    };

    _closeTradePasswordModal = () => {
        console.log('modal closed');
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
            transfer
        } = this.props;

        const transferParams = {
            ...this.state.formValues,
            trade_password
        };

        console.log('transfer values', this.state.formValues);
        transfer(transferParams);
        this._closeTradePasswordModal();

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

    _onAddressCodeScanned = (data) => {
        const {
            change
        } = this.props;
        change('address', data);
    };
}

const mapStateToProps = (state) => {
    return {
        loading: TransferSelectors.selectLoading(state),
        currencies: CurrencySelectors.selectFilteredCurrencies(state, 'transferable'),
        profile: ProfileSelectors.selectProfile(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencies: () => dispatch(CurrencyActions.currencyRequest()),
        transfer: (transferParams) => dispatch(TransferActions.transferRequest(transferParams)),
        resetTradePassword: () => dispatch(reset('tradePasswordModalForm')),
        changeFieldValue: function(field, value) {
            dispatch(change('transferStationForm', field, value))
        }
    }
};

export default reduxForm({
    form: 'transferStationForm',
    initialValues: {
        currency_id: '1',
        memo: '',
        // amount: '1',
        // captcha: '999999',
        // address: '0xFc76bFBB7A24AD45C06D22D6f2492504f22Ac517'
    }
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(TransferStation)));