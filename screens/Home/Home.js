import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet, RefreshControl
} from 'react-native';
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Item from "../../theme/components/Item/Item";
import HomeButtons from "./HomeButtons";
import MarketList from "./MarketList";
import Metrics from "../../theme/variables/Metrics";
import CurrencyActions, {CurrencySelectors} from "../../redux/common/Currency/CurrencyRedux";
import HomeActions, {HomeSelectors} from "./redux/HomeRedux";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import {withNamespaces} from "react-i18next";
import {EvaluateSelectors} from "../../redux/common/Evaluate/EvaluateRedux";
import {CatBannerSelectors} from "./redux/CatBannerRedux";
import Colors from "../../theme/variables/Colors";
import Banners from "../../components/Banners/Banners";

class Home extends Component {
    componentDidMount() {
        // this.props.getCurrencies();
        this.props.loadHomeData();
    }
    render() {
        const {
            t,
            currencies,
            refreshing,
            profile,
            banners
        } = this.props;

        // TODO: Consider refactoring view into a flatlist and use list header
        // TODO: Combine api calls in one action
        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >
                    <View style={{marginBottom: Metrics.defaultMargin}}>
                        {/*<Item noBorder style={{alignItems: 'center', paddingTop: 30}}>*/}
                            {/*<Text>*/}
                                {/*{t('dashboard:home.totalAssets')} (USD)*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                                {/*style={[TypographyStyles.numberBig, TypographyStyles.textPrimary]}>*/}
                                {/*${evaluate && evaluate.total.toFixed(3)}*/}
                            {/*</Text>*/}
                        {/*</Item>*/}

                        {
                            (banners && banners.length > 0) ?
                                <View style={{
                                    height: 140,
                                    backgroundColor: Colors.white,
                                    paddingVertical: 6
                                }}>
                                    <Banners banners={banners}/>
                                </View> : null
                        }

                        <Item noBorder>
                            <HomeButtons />
                        </Item>
                    </View>
                    {currencies && profile && <MarketList currencies={currencies} profile={profile} />}
                </Content>
            </Container>
        );
    }

    _onRefresh = () => {
        // this.props.getCurrencies({refreshing: true});
        this.props.loadHomeData({refreshing: true});
    };
}

const mapStateToProps = (state) => ({
    currencies: CurrencySelectors.selectCurrencies(state),
    refreshing: HomeSelectors.selectRefreshStatus(state),
    profile: ProfileSelectors.selectProfile(state),
    evaluate: EvaluateSelectors.selectEvaluate(state),
    banners: CatBannerSelectors.selectBanners(state),
});

const mapDispatchToProps = (dispatch) => ({
    getCurrencies: () => dispatch(CurrencyActions.currencyRequest()),
    loadHomeData: (refreshing) => dispatch(HomeActions.loadHomeData(refreshing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Home));

const styles = StyleSheet.create({
    homeBanner: {
        marginBottom: Metrics.defaultMargin,
    }
});