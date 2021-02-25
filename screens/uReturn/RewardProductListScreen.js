import React, {Component} from 'react';
import {FlatList, View} from "react-native";

import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import Item from "../../theme/components/Item/Item";
import RewardProductListActions, {RewardProductListSelectors} from "./redux/RewardProductListRedux";
import RewardProductCheckList from "./RewardProductCheckList";
import AppStyles from "../../theme/styles/AppStyles";
import Text from "../../theme/components/Text/Text";
import Button from "../../theme/components/Button/Button";
import {withNamespaces} from "react-i18next";
import TransferAmountField from "../../components/TransferAmountField/TransferAmountField";
import {reduxForm} from "redux-form";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";

class RewardProductListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:uReturn.title')
        }
    };

    componentWillMount() {
        this.props.getRewardProducts();
    }

    render() {
        const {
            t,
            products,
            handleSubmit,
            profile
        } = this.props;
        return (
            <Container style={{paddingBottom: 100}}>
                <Content>
                    {products && profile && <RewardProductCheckList
                        products={products}
                        profile={profile}
                        onProductSelected={this._onProductSelected}
                    />}
                </Content>
                <View style={[AppStyles.actionButtonsContainer, {flexDirection: 'column', alignItems: 'stretch', width: '100%'}]}>
                    <Item style={{paddingVertical: 6}}>
                        {profile && <TransferAmountField
                            onPress={this._copyEthBalance}
                            label=""
                            maxAmount={profile.eth_balance.toFixed(2)}
                            maxAmountErrorMessage={t('dashboard:uReturn.maxAmountEth', {balance: profile.eth_balance.toFixed(2)})}
                            placeholder={t('dashboard:uReturn.enterEthAmount')}
                            name="amount" />
                        }
                    </Item>
                    <Button
                        onPress={handleSubmit(this._onFormSubmit)}
                        buttonStyle={{height: 60, backgroundColor: Colors.dark, borderRadius: 0}}>
                        <Text style={{color: Colors.white}}>{t('dashboard:uReturn.buy')}</Text>
                    </Button>
                </View>
            </Container>
        )
    }

    _onProductSelected = (product) => {
        const {selectProduct, products} = this.props;
        selectProduct(product, products)
    };

    _onFormSubmit = ({amount}) => {
        const {
            navigation,
            selectedProduct
        } = this.props;

        navigation.navigate('ConfirmPurchaseScreen', {
            product: selectedProduct,
            amount
        })
    }

    _copyEthBalance = () => {
        const {
            profile,
            change
        } = this.props;
        change('amount', profile.eth_balance.toString());
    };


}

const mapStateToProps = (state) => ({
    products: RewardProductListSelectors.selectProducts(state),
    selectedProduct: RewardProductListSelectors.selectSelectedProduct(state),
    profile: ProfileSelectors.selectProfile(state)
});

const mapDispatchToProps = (dispatch) => ({
    getRewardProducts: (refreshing) => dispatch(RewardProductListActions.rewardProductListRequest(refreshing)),
    selectProduct: (product, products) => dispatch(RewardProductListActions.selectProduct(product, products))
});


export default reduxForm({
    form: 'buyRewardForm'
})(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(RewardProductListScreen)));