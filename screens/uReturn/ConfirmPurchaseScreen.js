import React, {Component} from 'react';
import {FlatList, View} from "react-native";
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import Item from "../../theme/components/Item/Item";
import AppStyles from "../../theme/styles/AppStyles";
import Text from "../../theme/components/Text/Text";
import Button from "../../theme/components/Button/Button";
import {withNamespaces} from "react-i18next";
import PurchaseTermsCard from "./PurchaseTermsCard";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import BuyRewardProductActions, {BuyRewardProductSelectors} from "./redux/BuyRewardRedux";
import TradePasswordModal from "../../modals/TradePasswordModal/TradePasswordModal";

class ConfirmPurchaseScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:uReturn.title')
        }
    };

    state = {
        tradePasswordModalVisible: false
    };

    render() {
        const {
            t,
            loading,
            navigation
        } = this.props;

        const {tradePasswordModalVisible} = this.state;
        const product = navigation.getParam('product'),
            amount = navigation.getParam('amount');

        return (
            <Container style={{paddingBottom: 60}}>
                <TradePasswordModal
                    visible={tradePasswordModalVisible}
                    onTradePasswordEntered={this._onTradePasswordEntered}
                    onModalClose={this._closeTradePasswordModal}/>

                <Content style={{backgroundColor: Colors.contentColor}}>

                    <PurchaseTermsCard />

                    <Item style={LayoutStyles.spaceBetween}>
                       <Text style={[
                           TypographyStyles.textDark,
                           {fontSize: 18}
                       ]}>
                           {t('dashboard:uReturn.numberOfPeriods')}
                       </Text>
                       <Text style={[TypographyStyles.textDark, {fontSize: 18}]}>
                           12期
                       </Text>
                    </Item>

                    {/*<Item style={LayoutStyles.spaceBetween}>*/}
                        {/*<Text*/}
                            {/*style={[*/}
                                {/*TypographyStyles.textDark,*/}
                                {/*{fontSize: 18}*/}
                        {/*]}>*/}
                            {/*{t('dashboard:uReturn.purchaseAmount')}*/}
                        {/*</Text>*/}
                        {/*<Text style={[TypographyStyles.textDark, {fontSize: 18}]}>*/}
                            {/*1000份*/}
                        {/*</Text>*/}
                    {/*</Item>*/}

                    <Item style={LayoutStyles.spaceBetween}>
                        <Text style={[TypographyStyles.textDark, {fontSize: 18}]}>
                            {t('dashboard:uReturn.purchaseTotalCost')}
                        </Text>
                        <Text style={[TypographyStyles.textDark, {fontSize: 18}]}>
                            {amount} ETH
                        </Text>
                    </Item>
                </Content>

                <View style={[
                    AppStyles.actionButtonsContainer,
                    {
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        width: '100%'
                    }]}>
                    <Button
                        disabled={loading}
                        loading={loading}
                        onPress={this._openTradePasswordModal}
                        buttonStyle={{height: 60, borderRadius: 0}}>
                        <Text style={{color: Colors.white}}>
                            {t('dashboard:uReturn.confirmPurchase')}
                        </Text>
                    </Button>
                </View>

            </Container>
        )
    }

    _closeTradePasswordModal = () => {
        this.setState({tradePasswordModalVisible:  !this.state.tradePasswordModalVisible})
    };

    _setModalVisible(tradePasswordModalVisible) {
        this.setState({tradePasswordModalVisible})
    };

    _openTradePasswordModal = () => {
        this._setModalVisible(true);
    };

    _onTradePasswordEntered = ({trade_password}) => {
        console.log('password', trade_password);
        const {
            t,
            navigation,
            buyRewardProduct,
            loading
        } = this.props;
        const product = navigation.getParam('product'),
            amount = navigation.getParam('amount');
        buyRewardProduct(product.id, amount, trade_password);
        this._closeTradePasswordModal();

    };


}


const mapStateToProps = (state) => ({
    loading: BuyRewardProductSelectors.selectLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    buyRewardProduct: (product, amount, trade_password) =>
        dispatch(BuyRewardProductActions.buyRewardProduct(product, amount, trade_password))
});


export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(ConfirmPurchaseScreen));