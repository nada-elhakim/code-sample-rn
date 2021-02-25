import React, {Component} from 'react';
import {connect} from "react-redux";
import {View} from "react-native";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Balance from "../../components/Balance/Balance";
import Colors from "../../theme/variables/Colors";
import Metrics from "../../theme/variables/Metrics";
import WalletAddress from "../../components/WalletAddress/WalletAddress";
import CurrencyActions, {CurrencySelectors} from "../../redux/common/Currency/CurrencyRedux";
import CurrencySegment from "../../components/CurrencySegment/CurrencySegment";
import Images from "../../theme/variables/Images";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import SelectedCurrencyItem from "../SelectedCurrencyItem/SelectedCurrencyItem";
import CurrencyListModal from "../../modals/CurrencyListModal/CurrencyListModal";
import {reduxForm, change} from "redux-form";

class Recharge extends Component {
    static navigationOptions = ({screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:recharge.title')
        }
    };

    state = {
        modalVisible: false,
        selectedCurrency: null
    };

    componentWillMount() {
        // this.props.selectCurrencyAddress(this.currencies[0]);
        this.props.getCurrencies();
    }

    render() {
        return (
            <Container>
                <Content>
                    {/*<View style={{marginBottom: Metrics.defaultMargin}}>*/}
                        {/*<Balance profile={this.props.profile} color={Colors.primaryDark}/>*/}
                    {/*</View>*/}

                    {this.renderWalletAddress()}

                </Content>
            </Container>
        )
    }

    renderWalletAddress() {
        const {
            qrCode,
            address,
            currencies
        } = this.props;

        const selectedCurrency = this._getSelectedCurrency();
        this.props.selectCurrencyAddress(selectedCurrency);

        if (selectedCurrency) {
            return (
                <View>
                    {currencies && <CurrencyListModal
                        onCurrencySelected={this._onCurrencySelected}
                        onModalClose={this._closeCurrencyModal}
                        currencies={currencies}
                        selectedCurrency={this.state.selectedCurrency || currencies[0]}
                        visible={this.state.modalVisible}/>}

                    {/*<CurrencySegment*/}
                        {/*selectedCurrency={selectedCurrency}*/}
                        {/*currencies={this.currencies}*/}
                        {/*onCurrencySelected={this._onCurrencySelected}/>*/}

                    {/*{*/}
                        {/*<SelectedCurrencyItem*/}
                            {/*onCurrencySelect={() => this._setModalVisible(true)}*/}
                            {/*selectedCurrency={selectedCurrency}/>*/}
                    {/*}*/}

                    {
                        address && <WalletAddress
                            withQrCode
                            qrCode={qrCode}
                            address={address}
                        />
                    }
                </View>
            )

        }

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
        console.log('selected currency', selectedCurrency);
        this.setState({selectedCurrency});
        this._setFieldCurrencyId(selectedCurrency);
        this.props.selectCurrencyAddress(selectedCurrency);
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

}

const mapStateToProps = (state) => ({
    currencies: CurrencySelectors.selectCurrencies(state),
    qrCode: CurrencySelectors.selectedQrCode(state),
    address: CurrencySelectors.selectedAddress(state),
    selectedCurrency: CurrencySelectors.selectSelectedCurrency(state),
    profile: ProfileSelectors.selectProfile(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencies: () => dispatch(CurrencyActions.currencyRequest()),
        selectCurrencyAddress: (currency) => dispatch(CurrencyActions.selectCurrencyAddress(currency)),
        changeFieldValue: function(field, value) {
            dispatch(change('withdrawForm', field, value))
        }
    }
};

export default reduxForm({
    form: 'withdrawForm'
})(connect(mapStateToProps, mapDispatchToProps)(Recharge));