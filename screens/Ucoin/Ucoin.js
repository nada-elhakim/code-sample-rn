import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import TabScreenHeaderStyles from "../../navigation/TabScreenHeaderStyles";
import CoinProductList from "./CoinProductList/CoinProductList";
import AppStyles from "../../theme/styles/AppStyles";
import UcoinActions, {UcoinSelectors} from "./redux/UcoinRedux";
import TransferInModal from "../../modals/TransferInModal/TransferInModal";
import TransferOutModal from "../../modals/TransferOutModal/TransferOutModal";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import CoinHoldingList from "./CoinHoldingList/CoinHoldingList";
import USECard from "./USECard";
import Metrics from "../../theme/variables/Metrics";


const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

class Ucoin extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:uCoin.title'),
            headerRight: (
                <Button headerButton onPress={() => navigation.navigate('UcoinTransactions')}>
                    <Text style={TypographyStyles.textPrimary}>{t('dashboard:uCoin.incomeDetails')}</Text>
                </Button>
            ),
            ...TabScreenHeaderStyles
        }
    };


    state = {
        transferInModalVisible: false,
        transferOutModalVisible: false,
        direction: null,
        hideUseCard: false,
        index: 0,
        routes: [
            { key: 'products', title: this.props.t('dashboard:uCoin.incomeProducts')},
            { key: 'holdings', title: this.props.t('dashboard:uCoin.holdings') }
        ],
    };

    componentDidMount() {
        const {
            getSummary
        } = this.props;
        getSummary()
    }

    _handleIndexChange = index =>
        this.setState({
            index,
        });

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            style={styles.tabbar}
            tabStyle={styles.tab}
            indicatorStyle={styles.indicator}
            labelStyle={styles.label}
        />
    );

    _renderScene = SceneMap({
        products: CoinProductList,
        holdings: CoinHoldingList,
    });

    render() {
        const {
            t,
            summary,
            profile
        } = this.props;

        const {
            transferInModalVisible,
            transferOutModalVisible
        } = this.state;
        return (
            <Container style={{paddingBottom: 60, backgroundColor: Colors.contentColor}}>
                <USECard profile={profile} summary={summary}/>
                <TabView
                    style={{flex: 1}}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
                <View style={AppStyles.actionButtonsContainer}>
                    <TransferOutModal
                        visible={transferOutModalVisible}
                        profile={profile}
                        summary={summary}
                        onModalClose={() => this._closeTransferAmountModal('out')}
                    />
                    <TransferInModal
                        visible={transferInModalVisible}
                        profile={profile}
                        summary={summary}
                        onModalClose={() => this._closeTransferAmountModal('in')}
                    />
                    <Button
                        onPress={() => this._openTransferAmountModal('in')}
                        transparent
                        buttonStyle={{height: 60}}
                        containerStyle={[
                            AppStyles.actionButtonWrapper,
                            {
                                backgroundColor: Colors.highlight,
                                borderRightWidth: 1,
                                borderColor: 'rgba(255,255,255,.2)'
                            }]}>
                        <Text
                            style={TypographyStyles.textClear}>
                            {t('dashboard:uCoin.transferIn')}
                        </Text>
                    </Button>
                    <Button
                        onPress={() => this._openTransferAmountModal('out')}
                        transparent
                        buttonStyle={{height: 60, backgroundColor: Colors.highlight}}
                        containerStyle={[
                            AppStyles.actionButtonWrapper,
                            {
                                backgroundColor: Colors.highlight
                            }]}>
                        <Text
                            style={TypographyStyles.textClear}>
                            {t('dashboard:uCoin.transferOut')}
                        </Text>
                    </Button>
                </View>
            </Container>
        )
    }

    _openTransferAmountModal(direction) {
        this._setModalVisible(true, direction);
    }

    _onTransferPressed = (amount, direction) => {
        console.log(direction, amount);
    };

    _closeTransferAmountModal = (direction) => {
        if (direction === 'in') {
            this.setState({transferInModalVisible: !this.state.transferInModalVisible})
        } else {
            this.setState({transferOutModalVisible: !this.state.transferOutModalVisible})

        }
    };

    _setModalVisible(visible, direction) {
        if (direction === 'in') {
            this.setState({transferInModalVisible: visible})
        } else {
            this.setState({transferOutModalVisible: visible})

        }
    };
}

const mapStateToProps = (state) => ({
    summary: UcoinSelectors.selectSummary(state),
    profile: ProfileSelectors.selectProfile(state)
});

const mapDispatchToProps = (dispatch) => ({
    getSummary: () => dispatch(UcoinActions.coinSummaryRequest()),
});

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Ucoin));

const styles = StyleSheet.create({
    tabbar: {
        backgroundColor: Colors.white,
        height: 54
    },
    tab: {
        width: Metrics.windowWidth / 2,
        justifyContent: 'center',
        height: 54
    },
    indicator: {
        backgroundColor: Colors.dark,
        // width: 100,
    },
    label: {
        color: Colors.dark,
        fontWeight: '400',
    },
});