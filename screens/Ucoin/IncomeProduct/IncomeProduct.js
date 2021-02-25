import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Container from "../../../theme/components/Container/Container";
import Content from "../../../theme/components/Content/Content";
import {withNamespaces} from "react-i18next";
import Colors from "../../../theme/variables/Colors";
import Item from "../../../theme/components/Item/Item";
import Text from "../../../theme/components/Text/Text";
import {Image, View, StyleSheet} from "react-native";
import Metrics from "../../../theme/variables/Metrics";
import TypographyStyles from "../../../theme/styles/TypographyStyles";
import AppStyles from "../../../theme/styles/AppStyles";
import Button from "../../../theme/components/Button/Button";
import TransferAmountField from "../../../components/TransferAmountField/TransferAmountField";
import {reduxForm} from "redux-form";
import BuyCoinActions, {BuyCoinSelectors} from "../redux/BuyCoinRedux";
import {connect} from "react-redux";
import CoinProductActions, {CoinProductSelectors} from "./CoinProductRedux";
import Images from "../../../theme/variables/Images";
import LayoutStyles from "../../../theme/styles/LayoutStyles";


class IncomeProduct extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:uCoin.title')
        }
    };

    componentWillMount() {
        const product = this.getIncomeProduct();
        this.props.getProduct(product.id);
    }

    render() {
        const {
            t,
            buyCoinLoading,
            product,
            handleSubmit
        } = this.props;

        const incomeProduct = this.getIncomeProduct();
        return (
            <Container style={{paddingBottom: 60}}>
                <Content
                    style={{backgroundColor: Colors.contentColor}}
                    enableOnAndroid={false}
                    innerRef={ref => {
                    this.scroll = ref;
                }}>
                    <View style={{marginBottom: Metrics.defaultMargin}}>
                        <Item style={styles.containerStyle} onPress={() => showDetail && navigateToProductDetail(product)}>
                            <View style={[styles.itemStyle, styles.iconContainer]}>
                                {product && <Image
                                    defaultSource={Images.iconUSE}
                                    source={product.icon !== '' ? {uri: product && product.icon} : Images.iconUSE}
                                    style={{
                                        width: 34,
                                        height: 34
                                    }}/>}
                            </View>

                            <View style={[LayoutStyles.spaceBetween, {alignItems: 'center'}]}>
                                <View style={[styles.itemStyle]}>
                                    <Text style={styles.rate}>{product && product.profit_ratio_fyi}%</Text>
                                </View>

                                <View style={{position: 'relative', top: 3}}>
                                    <Text
                                        center
                                        style={[
                                            TypographyStyles.textDark,
                                            {
                                                marginBottom: 3,
                                                marginTop: 3,
                                                fontSize: 18
                                            }
                                        ]}>
                                        {product && product.period} {t('dashboard:uCoin.day')}
                                    </Text>

                                    <Text center>
                                        {t('dashboard:uCoin.productTerm')}
                                    </Text>
                                </View>
                            </View>

                        </Item>

                        <Item style={{flex: 1, flexDirection: 'row', alignItem: 'center'}}>
                            <Text
                                center
                                style={{flex: 1}}>
                                {product && product.min_threshold} {t('dashboard:uCoin.usePurchase')}
                            </Text>
                            <Text
                                center
                                style={{flex: 1}}>
                                {product && product.holder_cnt} {t('dashboard:uCoin.holderCount')}
                            </Text>
                        </Item>
                        <Item noBorder>
                            <Text>{incomeProduct.intro}</Text>
                        </Item>
                    </View>

                    <View style={{
                        paddingHorizontal: 18,
                        paddingVertical: 18,
                        backgroundColor: Colors.white,
                        marginBottom: Metrics.defaultMargin
                    }}>
                        <Text>
                            {t('dashboard:uCoin.tradeTerms')}:
                        </Text>
                        <Text>
                            {t('dashboard:uCoin.tradeTermsText1')}
                        </Text>
                        <Text>
                            {t('dashboard:uCoin.tradeTermsText2')}
                        </Text>
                        <Text>
                            {t('dashboard:uCoin.tradeTermsText3')}
                        </Text>
                        <Text>
                            {t('dashboard:uCoin.tradeTermsText4')}
                        </Text>
                    </View>

                    <View>
                        <Item>
                            <LinearGradient
                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
                                location={[0.25, 0.4]}
                                colors={['#D0AC6C', '#EED29D']}
                                style={{ padding: 15, borderRadius: 5, marginBottom: 16 }}>
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: 15,
                                        color: '#fff',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'baseline'
                                    }}>
                                    <Text
                                        style={[TypographyStyles.textClear]}>
                                        {t('dashboard:uCoin.affordableShare')}:

                                    </Text>
                                    <Text
                                        style={[
                                            TypographyStyles.numberBig,
                                            TypographyStyles.textClear,
                                            {marginHorizontal: 5}
                                        ]}>
                                        {product && Math.floor(product.affordable_share_cnt)}
                                    </Text>
                                    <Text style={[TypographyStyles.textClear]}>
                                        {t('dashboard:uCoin.share')}
                                    </Text>
                                </View>
                            </LinearGradient>

                            { product &&
                            <TransferAmountField
                                placeholder={t('dashboard:uCoin.enterPurchaseAmount')}
                                onlyIntegers
                                focusOnError={true}
                                minAmount={product.min_threshold}
                                onPress={this._copyBalance}
                                name="amount"/>}
                        </Item>
                    </View>
                </Content>
                <View style={[AppStyles.actionButtonsContainer]}>
                    <Button
                        onPress={this.scrollToAmountInput.bind(this)}
                        disabled={buyCoinLoading}
                        loading={buyCoinLoading}
                        buttonStyle={{height: 60, backgroundColor: Colors.highlight, borderRadius: 0}}
                        containerStyle={AppStyles.actionButtonWrapper}>
                        <Text style={{color: Colors.white}}>{t('dashboard:uCoin.buy')}</Text>
                    </Button>
                </View>
            </Container>
        )
    }

    getIncomeProduct() {
        const {navigation} = this.props;
        return navigation.getParam('product');
    }

    scrollToAmountInput() {
        const {handleSubmit, invalid} = this.props;
        const submitter = handleSubmit(this._buyCoin);
        if (invalid) {
            this.scroll.scrollToEnd();
        } else {
            submitter();
        }
    }

    _buyCoin = ({amount}) => {
        const {buyCoin} = this.props;
        const product = this.getIncomeProduct();
        buyCoin(product, amount);
    };

    _copyBalance = () => {
        const {
            product,
            change
        } = this.props;
        product && change('amount', Math.floor(product.affordable_share_cnt).toString());
    };
}

const mapStateToProps = (state) => ({
    buyCoinLoading: BuyCoinSelectors.selectLoading(state),
    product: CoinProductSelectors.selectProduct(state)
});

const mapDispatchToProps = (dispatch) => ({
    buyCoin: (product, amount) => dispatch(BuyCoinActions.buyCoin(product, amount)),
    getProduct: (productId) => dispatch(CoinProductActions.coinProductRequest(productId, true)),
});
export default reduxForm({
    form: 'purchaseForm'
})(withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(IncomeProduct)));

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemStyle: {
        marginRight: Metrics.defaultMargin * 3
    },
    rate: {
        color: Colors.danger,
        fontSize: 24
    },
    iconContainer: {
        backgroundColor: '#FFFBF2',
        padding: 8,
        borderRadius: 24
    }
});
