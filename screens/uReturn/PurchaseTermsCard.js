import React from 'react';
import {ImageBackground, View, StyleSheet} from "react-native";
import Images from "../../theme/variables/Images";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Metrics from "../../theme/variables/Metrics";
import TypographyStyles from "../../theme/styles/TypographyStyles";

const PurchaseTermsCard = ({t}) => {
    return (
        <ImageBackground
            source={Images.noticeCardBg}
            style={{flex: 1, paddingHorizontal: Metrics.defaultPadding, paddingVertical: 30}}>
            <ItemHeading style={[TypographyStyles.textClear, {fontSize: 18, marginBottom: Metrics.defaultMargin}]}>
                {t('dashboard:uReturn.purchaseTerms')}
            </ItemHeading>
            <Text style={TypographyStyles.textClear}>
                购买成功后，用于支付的以太坊文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案
            </Text>
        </ImageBackground>
    );
};

export default withNamespaces()(PurchaseTermsCard);
