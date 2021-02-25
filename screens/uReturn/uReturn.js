import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import TabScreenHeaderStyles from "../../navigation/TabScreenHeaderStyles";
import AppStyles from "../../theme/styles/AppStyles";
import Holdings from "./Holdings";
import RewardHoldingActions, {RewardHoldingSelectors} from "./redux/RewardHoldingRedux";
import WithdrawRewardActions from './redux/WithdrawRewardRedux';
import EvaluateActions, {EvaluateSelectors} from '../../redux/common/Evaluate/EvaluateRedux';
import WithdrawRewardModal from "../../modals/WithdrawRewardModal/WithdrawRewardModal";
import RewardSummaryActions, {RewardSummarySelectors} from "./redux/RewardSummaryRedux";

class uReturn extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:uReturn.title'),
            ...TabScreenHeaderStyles
        }
    };

    state = {
        withdrawRewardModalVisible: false,
        target: 'useBalance'
    };

    componentDidMount() {
        this.props.getHoldings();
        this.props.getSummary();
    }

    render() {
        const {
            t,
            holdings,
            navigation,
            rewardBalance,
            summary
        } = this.props;
        const {
            withdrawRewardModalVisible
        } = this.state;
        return (
            <Container style={{paddingBottom: 60}}>
                <Content contentContainerStyle={{flex: 1}}>
                    {holdings && <Holdings holdings={holdings} summary={summary}/>}
                </Content>
                <View style={AppStyles.actionButtonsContainer}>
                    <WithdrawRewardModal
                        rewardBalance={rewardBalance}
                        visible={withdrawRewardModalVisible}
                        onSubmit={this._withdraw}
                        onModalClose={this._onModalClose}
                    />

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Button
                            onPress={() => this._openWithdrawRewardModal('useBalance')}
                            transparent
                            buttonStyle={{height: 60}}
                            containerStyle={AppStyles.actionButtonWrapper}>
                            <Text>{t('dashboard:uReturn.depositWallet')}</Text>
                        </Button>
                        <Button
                            onPress={() => this._openWithdrawRewardModal('coinBalance')}
                            transparent
                            buttonStyle={{height: 60}}
                            containerStyle={AppStyles.actionButtonWrapper}>
                            <Text>{t('dashboard:uReturn.depositTreasure')}</Text>
                        </Button>
                    </View>
                    <Button
                        onPress={() => navigation.navigate('RewardProductList')}
                        transparent
                        buttonStyle={{height: 60}}
                        containerStyle={[
                            AppStyles.actionButtonWrapper, {
                             backgroundColor: Colors.dark
                            }
                        ]}>
                        <Text style={TypographyStyles.textClear}>{t('dashboard:uReturn.buy')}</Text>
                    </Button>
                </View>
            </Container>
        )
    }

    _withdraw = (amount) => {
        this.props.withdrawReward(this.state.target, amount);
    }

    _openWithdrawRewardModal(target) {
        this.props.getEvaluation();
        this.setState({target});
        this._setModalVisible(true);
    }

    _onModalClose = () => {
        this.setState({withdrawRewardModalVisible: !this.state.withdrawRewardModalVisible});
    };

    _setModalVisible(visible) {
        this.setState({withdrawRewardModalVisible: visible})
    };
}

const mapStateToProps = (state) => ({
    holdings: RewardHoldingSelectors.selectHoldings(state),
    summary: RewardSummarySelectors.selectSummary(state),
    rewardBalance: EvaluateSelectors.selectRewardBalance(state)
});

const mapDispatchToProps = (dispatch) => ({
    getHoldings: (params, refreshing) => dispatch(RewardHoldingActions.holdingRequest(params, refreshing)),
    getSummary: () => dispatch(RewardSummaryActions.rewardSummaryRequest()),
    withdrawReward: (target, amount) => dispatch(WithdrawRewardActions.withdrawReward(target, amount)),
    getEvaluation: () => dispatch(EvaluateActions.evaluateRequest()),
});

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(uReturn));

