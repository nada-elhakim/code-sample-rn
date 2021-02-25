import React from 'react';
import {
    Image,
    View,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';
import {withNamespaces} from "react-i18next";
import FullWidthImage from "react-native-fullwidth-image";

import Item from "../../../theme/components/Item/Item";
import TypographyStyles from "../../../theme/styles/TypographyStyles";
import NavigationService from "../../../navigation/NavigationService";
import Text from "../../../theme/components/Text/Text";
import Images from "../../../theme/variables/Images";
import Metrics from "../../../theme/variables/Metrics";
import Colors from "../../../theme/variables/Colors";
import LayoutStyles from "../../../theme/styles/LayoutStyles";
import ItemHeading from "../../../theme/components/ItemHeading/ItemHeading";


const IncomeProductItem = ({t, product, showDetail}) => {

    const navigateToProductDetail = () => {
        NavigationService.navigate('IncomeProduct', {product});
    };


    return (
        <Item style={styles.containerStyle} onPress={() => showDetail && navigateToProductDetail(product)}>
            {/*<View style={[styles.itemStyle, styles.iconContainer]}>*/}
                {/*<Image*/}
                    {/*defaultSource={Images.iconETH}*/}
                    {/*source={product.icon !== '' ? {uri: product && product.icon} : Images.iconETH}*/}
                    {/*style={{*/}
                        {/*width: 34,*/}
                        {/*height: 34*/}
                    {/*}}/>*/}
            {/*</View>*/}

            <View style={[{
                flexDirection: 'row',
                alignItems: 'center'
            }]}>
                <View style={[styles.itemStyle]}>
                    <Text style={{color: Colors.dark, marginBottom: 10}}>{product && product.name}</Text>
                    <Text style={{marginBottom: 3}}>
                        {t('dashboard:uCoin.annualRate')}:
                    </Text>
                    <Text style={{color: Colors.dangerDark}}>
                        {product && product.profit_ratio_fyi_rounded}% USEPOWER
                    </Text>
                </View>

                <View style={[styles.itemStyle]}>
                    <Text style={{marginBottom: 4}}>
                        {product && t('dashboard:uCoin.productTermPeriod', {period: product.period})}
                    </Text>
                    <Text style={[TypographyStyles.textHighlight]}>
                        {product && product.min_threshold} {t('dashboard:uCoin.usePurchase')}
                    </Text>
                </View>
            </View>

        </Item>
    );
};
export default withNamespaces()(IncomeProductItem);

IncomeProductItem.propTypes = {
    product: PropTypes.shape(
        {
            id: PropTypes.number,
            intro: PropTypes.string,
            name: PropTypes.string,
            icon: PropTypes.string,
            min_unit: PropTypes.number,
            min_threshold: PropTypes.number,
            max_threshold: PropTypes.number,
            sorting: PropTypes.number,
            value_per_share: PropTypes.number,
            manager_wallet_address: PropTypes.string,
            period: PropTypes.number,
            status: PropTypes.string,
            published_at: PropTypes.string,
            started_at: PropTypes.string,
            created_at: PropTypes.string,
            updated_at: PropTypes.string,
            deleted_at: PropTypes.string,
            finished_at: PropTypes.string,
            is_flexy: PropTypes.number
        }
    ),
    showDetail: PropTypes.bool
};

IncomeProductItem.defaultProps = {
    product: {
        id: 1,
        intro: 'intro',
        name: 'name',
        icon: Images.iconETH
    },
    showDetail: false
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemStyle: {
        flex: 1,
        // marginRight: Metrics.defaultMargin * 2
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
