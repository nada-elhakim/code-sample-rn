import React from 'react';
import Images from "../../theme/variables/Images";
import Item from "../../theme/components/Item/Item";
import FullWidthImage from "react-native-fullwidth-image";
import {ImageBackground, View, StyleSheet} from "react-native";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import Colors from "../../theme/variables/Colors";
import Metrics from "../../theme/variables/Metrics";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import TypographyStyles from "../../theme/styles/TypographyStyles";

const RewardCheckListHeader= ({t, profile}) => {
    return (
        <View>
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={Images.rewardWalletCardBg}
                    style={[LayoutStyles.spaceBetween, styles.card]}>
                    <Text style={[TypographyStyles.textClear]}>{t('dashboard:uReturn.inCurrentWallet')}</Text>
                    <Text style={[TypographyStyles.textClear]}>
                        <Text style={[TypographyStyles.textClear, TypographyStyles.numberBig, {marginRight: 5}]}>
                            {profile && profile.eth_balance.toFixed(2)}
                        </Text>
                        ETH
                    </Text>
                </ImageBackground>
            </View>
            <Item>
                <ItemHeading noMargin>{t('dashboard:uReturn.productListTitle')}</ItemHeading>
            </Item>
        </View>

    );
};

export default withNamespaces()(RewardCheckListHeader);

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.light,
        marginHorizontal: 20,
        marginTop: Metrics.defaultMargin,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        overflow: 'hidden'
    },
    card: {
        flex: 1,
        paddingHorizontal: Metrics.defaultPadding,
        paddingTop: 24,
        paddingBottom: 12,
        alignItems: 'baseline'
    }

});


