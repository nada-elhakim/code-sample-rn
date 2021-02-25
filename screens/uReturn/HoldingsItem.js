import React from 'react';
import {
    Image,
    View,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';
import {withNamespaces} from "react-i18next";
import FullWidthImage from "react-native-fullwidth-image";

import Item from "../../theme/components/Item/Item";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import NavigationService from "../../navigation/NavigationService";
import Text from "../../theme/components/Text/Text";
import Images from "../../theme/variables/Images";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";


const HoldingsItem = ({t, holding}) => {

    const navigateToProductDetail = () => {
        NavigationService.navigate('IncomeProduct', {product});
    };


    return (
        <Item style={styles.containerStyle}>
            <View style={[styles.itemStyle, styles.iconContainer]}>
                <FullWidthImage
                    source={holding.icon ? {src: holding.icon} : Images.iconETH}
                    width={34} height={34}/>
            </View>

            <View style={[styles.itemStyle, {width: '24%'}]}>
                <Text style={{color: Colors.danger}}>
                    <Text style={styles.rate}>{holding.amount}</Text>
                    USE
                </Text>
            </View>

            <View style={[styles.itemStyle]}>
                <ItemHeading
                    style={{
                        marginBottom: 4
                        , color: Colors.textDark
                    }}>
                    {holding.period_cnt} {t('common:interface.month')}
                </ItemHeading>
                <Text>{holding.bought_at}</Text>
            </View>
        </Item>
    );
};
export default withNamespaces()(HoldingsItem);

HoldingsItem.propTypes = {
    holding: PropTypes.shape(
        {
            id: PropTypes.number,
            intro: PropTypes.string,
            name: PropTypes.string,
            icon: PropTypes.string,
            min_unit: PropTypes.number,
            min_threshold: PropTypes.number,
            max_threshold: PropTypes.number,
            sorting: PropTypes.number,
            value_per_share: PropTypes.string,
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

HoldingsItem.defaultProps = {
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
        marginRight: Metrics.defaultMargin * 2,
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
