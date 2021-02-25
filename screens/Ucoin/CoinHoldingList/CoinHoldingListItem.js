import React from 'react';
import {
    Image,
    View,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';
import {withNamespaces} from "react-i18next";

import Item from "../../../theme/components/Item/Item";
import TypographyStyles from "../../../theme/styles/TypographyStyles";
import Text from "../../../theme/components/Text/Text";
import Images from "../../../theme/variables/Images";
import Metrics from "../../../theme/variables/Metrics";
import Colors from "../../../theme/variables/Colors";
import LayoutStyles from "../../../theme/styles/LayoutStyles";


const CoinHoldingListItem = ({t, holding}) => {
    return (
        <Item style={styles.containerStyle}>
            {/*<View style={[styles.itemStyle, styles.iconContainer]}>*/}
                {/*<Image*/}
                    {/*defaultSource={Images.iconETH}*/}
                    {/*source={holding.product.icon !== '' ? {uri: holding.product.icon} : Images.iconETH}*/}
                    {/*style={{*/}
                        {/*width: 34,*/}
                        {/*height: 34*/}
                    {/*}}/>*/}
            {/*</View>*/}

            <View style={[{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }]}>

                <View style={{flex: 2}}>
                    <View style={[styles.itemStyle, {marginBottom: 10}]}>
                        <Text style={{color: Colors.dark, marginBottom: 16}}>{holding.product.name}</Text>
                        <Text style={{marginBottom: 4}}>
                            {t('dashboard:uCoin.annualRate')}:
                        </Text>
                        <Text style={{color: Colors.dangerDark}}>{holding.profit_ratio}% USEPOWER</Text>
                    </View>
                    <View style={[styles.itemStyle]}>
                        <Text
                            numberOfLines={1}
                            style={[
                                TypographyStyles.textHighlight, {
                                    marginBottom: 6
                                }]}>
                            <Text>{t('dashboard:uCoin.holdingAmount')}: </Text>
                            {holding.amount}USE
                        </Text>
                        {/*<Text*/}
                            {/*numberOfLines={1}*/}
                            {/*style={[TypographyStyles.textHighlight]}>*/}
                            {/*<Text>{t('dashboard:uCoin.returnDue')} </Text>*/}
                            {/*{holding.evaluated_total.toFixed(2)}USE*/}
                        {/*</Text>*/}
                    </View>
                </View>



                {/*<View style={[styles.itemStyle]}>*/}
                    {/*<Text style={styles.rate}>{holding.profit_ratio}%</Text>*/}
                    {/*<Text>{t('dashboard:uCoin.annualRate')}</Text>*/}
                {/*</View>*/}



                <View style={{ flex: 1}}>
                    <Text style={[TypographyStyles.textHighlight]}>
                        <Text
                            style={[
                                TypographyStyles.textHighlight, {fontSize: 28}]}>
                            {holding.period_cnt}
                        </Text>
                        {t('common:interface.day')}
                    </Text>
                </View>
            </View>

        </Item>
    );
};
export default withNamespaces()(CoinHoldingListItem);

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemStyle: {
        marginRight: Metrics.defaultMargin,
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
