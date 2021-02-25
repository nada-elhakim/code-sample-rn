import React, {Component} from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    Clipboard
} from 'react-native';
import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Item from "../../theme/components/Item/Item";
import Colors from "../../theme/variables/Colors";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Metrics from "../../theme/variables/Metrics";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import {connect} from "react-redux";
import Images from "../../theme/variables/Images";
import {ToastContainer as Toast} from '../../theme/components/Toast/ToastContainer';
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";

class PromotionCenter extends Component {
    // static navigationOptions = ({navigation, screenProps}) => {
    //     const {t} = screenProps;
    //     return {
    //         title: t('dashboard:promotionCenter.title')
    //     }
    // };
    render() {
        const {profile} = this.props;
        return (
            <Container>
                <Content>
                    {profile && this.renderPage()}
                </Content>
            </Container>
        );
    }

    renderPage() {
        const {t, profile} = this.props;
        return (
            <View style={{paddingTop: 20}}>
                <ImageBackground
                    imageStyle={{
                        resizeMode: 'stretch'
                    }}
                    source={Images.promotionBg}
                    style={{flex: 1, height: 180, marginBottom: -40}}>
                    <View style={styles.incomeContainer}>
                        <View style={styles.incomeWrapper}>
                            <Text
                                center
                                style={TypographyStyles.textLight}>
                                {t('dashboard:promotionCenter.dailyAirdropAmount')}
                            </Text>

                            <Text style={[TypographyStyles.textDark]}>
                                <Text style={[TypographyStyles.numberBig, TypographyStyles.textDark]}>
                                    {profile.airdrop_daily_amount}
                                </Text>
                                USE
                            </Text>

                        </View>
                        <View style={styles.incomeWrapper}>
                            <Text
                                center
                                style={
                                    TypographyStyles.textLight
                                }>
                                {t('dashboard:promotionCenter.remainingAirdropDays')}
                            </Text>

                            <Text style={[TypographyStyles.textDark]}>
                                <Text style={[TypographyStyles.numberBig, TypographyStyles.textDark]}>
                                    {profile.airdrop_remain_days}
                                </Text>
                                {t('dashboard:promotionCenter.day')}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>


                <Item noBorder style={{flexDirection: 'row'}}>
                    <View
                        style={[
                            styles.cardContainer,
                            {marginRight: 8}
                        ]}>
                        <View style={[styles.card]}>
                            <Text>{t('dashboard:promotionCenter.invited')}</Text>
                            <Text style={[TypographyStyles.textPrimary]}>
                                <Text
                                    style={[
                                        TypographyStyles.textPrimary,
                                        TypographyStyles.number
                                    ]}>
                                    {profile.invited_cnt}
                                </Text>
                                {t('dashboard:promotionCenter.people')}
                            </Text>
                        </View>
                    </View>


                    <View style={[styles.cardContainer, {marginLeft: 8}]}>
                        <View style={[styles.card]}>
                            <Text>{t('dashboard:promotionCenter.needToInvite')}</Text>
                            <Text style={[TypographyStyles.textPrimary]}>
                                <Text
                                    style={[
                                        TypographyStyles.textPrimary,
                                        TypographyStyles.number
                                    ]}>
                                    {profile.next_invite_cnt}
                                </Text>
                                {t('dashboard:promotionCenter.people')}
                            </Text>
                        </View>
                    </View>
                </Item>

                <Item style={{paddingVertical: 0}}>
                    <View
                        style={[
                            styles.card,
                            {
                                paddingVertical: 30,
                                paddingHorizontal: 22
                            }]}>
                        <Text
                            style={[
                                TypographyStyles.textDark,
                                {
                                    fontSize: 22,
                                    marginBottom: Metrics.defaultMargin
                                }]}>
                            {profile.invite_code}
                        </Text>
                        <Button
                            onPress={this._copyPromotionCode}
                            containerStyle={{alignSelf: 'stretch'}}>
                            <Text style={[TypographyStyles.textClear]}>
                                {t('dashboard:promotionCenter.copyPromotionCode')}
                            </Text>
                        </Button>
                    </View>
                </Item>

                {/*<View style={{*/}
                    {/*paddingHorizontal: 18,*/}
                    {/*paddingVertical: 18,*/}
                    {/*backgroundColor: Colors.white,*/}
                    {/*marginBottom: Metrics.defaultMargin*/}
                {/*}}>*/}
                    {/*<ItemHeading>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.title')}*/}
                    {/*</ItemHeading>*/}
                    {/*<ItemHeading>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.desc')}*/}
                    {/*</ItemHeading>*/}
                    {/*<Text style={{marginBottom: 6}}>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.rule1')}*/}
                    {/*</Text>*/}
                    {/*<Text style={{marginBottom: 6}}>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.rule2', {targetInvite: profile.next_invite_cnt})}*/}
                    {/*</Text>*/}
                    {/*<Text style={{marginBottom: 6}}>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.rule3', {*/}
                            {/*airdropUSE: profile.airdrop_daily_amount,*/}
                            {/*airdropDays: profile.airdrop_remain_days*/}
                        {/*})}*/}
                    {/*</Text>*/}
                    {/*<Text>*/}
                        {/*{t('dashboard:promotionCenter.RewardRules.rule4', {*/}
                            {/*airdropDays: profile.airdrop_remain_days*/}
                        {/*})}*/}
                    {/*</Text>*/}
                {/*</View>*/}
            </View>
        )
    }

    _copyPromotionCode = () => {
        const {t, profile} = this.props;
        profile.invite_code && Clipboard.setString(profile.invite_code);
        Toast.show({
            text: t('dashboard:promotionCenter.codeCopied'),
            buttonText: t('common:interface.ok'),
            duration: 2000,
            type: 'success'
        });
    }
}

const mapStateToProps = (state) => ({
    profile: ProfileSelectors.selectProfile(state)
});

export default withNamespaces()(connect(mapStateToProps)(PromotionCenter));

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1
    },
    card: {
        backgroundColor: Colors.primaryLight,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        minHeight: 88
    },
    incomeContainer: {
        flexDirection: 'row',
        paddingTop: 20
    },
    incomeWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    incomeNumber: {
        fontSize: 18
    }
});