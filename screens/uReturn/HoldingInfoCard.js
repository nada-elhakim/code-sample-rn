import React from 'react';
import {ImageBackground, View, StyleSheet} from "react-native";
import Images from "../../theme/variables/Images";
import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";
import {withNamespaces} from "react-i18next";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Item from "../../theme/components/Item/Item";
import Note from "../../theme/components/Note/Note";
import Colors from "../../theme/variables/Colors";

const HoldingInfoCard = ({t, summary}) => {
    return (
        <View style={{backgroundColor: Colors.contentColor}}>
            <Item containerStyle={{marginBottom: Metrics.defaultMargin}} noBorder>
                <ImageBackground
                    source={Images.holdingInfoCardBg}
                    style={styles.container}
                    imageStyle={{borderRadius: 6}}>
                    <View style={styles.cardContainer}>
                        <Text center style={TypographyStyles.textClear}>{t('common:interface.balance')}</Text>
                        <Text
                            center
                            style={[
                                TypographyStyles.textClear,
                                TypographyStyles.numberBig,
                                {marginBottom: 10}
                            ]}>
                            {summary && parseFloat(summary.balance).toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.incomeContainer}>
                        <View style={styles.incomeWrapper}>
                            <Text
                                center
                                style={TypographyStyles.textClear}>
                                {t('dashboard:uReturn.numberOfRemainingPeriods')}
                            </Text>

                            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                                <ItemHeading
                                    noMargin
                                    center
                                    style={[
                                        TypographyStyles.textClear,
                                        styles.incomeNumber,
                                        {marginRight: 4}
                                    ]}>
                                    {summary && summary.remains_period_cnt}
                                </ItemHeading>
                                <Note style={TypographyStyles.textClear}>
                                    {t('common:interface.period')}
                                </Note>
                            </View>

                        </View>
                        <View style={styles.incomeWrapper}>
                            <Text
                                center
                                style={TypographyStyles.textClear}>
                                {t('dashboard:uReturn.residualRebate')}
                            </Text>

                            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                                <ItemHeading
                                    noMargin
                                    center
                                    style={[
                                        TypographyStyles.textClear,
                                        styles.incomeNumber,
                                        {marginRight: 4}
                                    ]}>
                                    {summary && summary.remains_amount}
                                </ItemHeading>
                                <Note style={TypographyStyles.textClear}>USE</Note>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </Item>
            <Item>
                <ItemHeading
                    style={[TypographyStyles.textDark,{marginBottom: 0}]}>
                    {t('dashboard:uCoin.incomeProducts')}
                </ItemHeading>
            </Item>
        </View>
    );
};

export default withNamespaces()(HoldingInfoCard);


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderRadius: 6
    },
    cardContainer: {
        marginTop: 28,
        // paddingBottom: 30
    },
    incomeContainer: {
        flexDirection: 'row',
        paddingVertical: Metrics.defaultPadding
    },
    incomeWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    incomeNumber: {
        fontSize: 18
    }
});