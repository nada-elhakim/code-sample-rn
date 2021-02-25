import React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, View, StyleSheet} from "react-native";
import Images from "../../theme/variables/Images";
import {withNamespaces} from "react-i18next";

import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Item from "../../theme/components/Item/Item";
import {formatNumber} from "../../services/Utils";

const USECard = ({t, summary}) => {

    const renderValue = (fieldName) => {
        const value = summary[fieldName] || 0;
        return formatNumber(value);

    };


   return (
       // 总USE金额: Total use amount
       // 昨日收益: Yesterday earnings
       <ImageBackground source={Images.uCoinBg} style={styles.container}>
           <View style={styles.useContainer}>
               <Text center style={TypographyStyles.textClear}>总USE金额</Text>
               <Text
                   center
                   style={[
                       TypographyStyles.textClear,
                       TypographyStyles.numberBig,
                       {marginBottom: 10}
                   ]}>
                   {summary && renderValue('total_value')}
               </Text>
               <Text center style={TypographyStyles.textClear}>昨日收益 {summary && renderValue('yestoday_value')} USE</Text>
           </View>
           <View style={styles.incomeContainer}>
               <View style={styles.incomeWrapper}>
                   <Text center style={TypographyStyles.textTransparent}>{t('dashboard:uCoin.cumulativeIncome')}</Text>
                   {summary && <ItemHeading
                       center
                       style={[
                           TypographyStyles.textClear,
                           styles.incomeNumber]}>
                       {renderValue('total_profit')}
                   </ItemHeading>}
               </View>
               <View style={styles.incomeWrapper}>
                   <Text center style={TypographyStyles.textTransparent}>{t('dashboard:uCoin.returnRate')}</Text>
                   {summary && <ItemHeading
                       center
                       style={[
                           TypographyStyles.textClear,
                           styles.incomeNumber]}>
                       {renderValue('total_percent')}%
                   </ItemHeading>}
               </View>
           </View>
       </ImageBackground>
   );
};

export default withNamespaces()(USECard);

USECard.propTypes = {
    summary: PropTypes.shape({
        total_percent: PropTypes.number,
        total_value: PropTypes.number
    })
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginBottom: Metrics.defaultMargin
    },
    useContainer: {
        paddingTop: 38,
        paddingBottom: 30
    },
    incomeContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.1)',
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