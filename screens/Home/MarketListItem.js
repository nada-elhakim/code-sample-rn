import React from 'react';
import {
    Image,
    View,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";

import Images from "../../theme/variables/Images";
import {withNamespaces} from "react-i18next";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import {formatNumber} from "../../services/Utils";

const MarketListItem = ({marketValue, profile, t}) => {

    const balance = marketValue.balance_field ?
        profile[marketValue.balance_field] : 0;

    // const dollarBalance =
    //     !isNaN(balance) ? '≈ $' + (balance * marketValue.rate).toFixed(2):
    //         '≈ $ 0.00';

    return (
        <View>
            <Item style={styles.justifyBetween}>
                <Image
                    source={{uri: marketValue.icon_url}}
                    defaultSource={Images['icon'+ marketValue.symbol]}
                    style={styles.image}/>
                <View style={[styles.justifyBetween, styles.outerWrapper]}>
                    <View>
                        <ItemHeading
                            uppercase
                            style={[
                                TypographyStyles.textDark,
                                {
                                    marginBottom: 2
                                }
                            ]}>
                            {marketValue.symbol}
                        </ItemHeading>
                    </View>
                    <View>
                        <ItemHeading style={[
                            TypographyStyles.textDark,
                            {
                                textAlign: 'right'
                            }
                        ]}>
                            {formatNumber(balance)}
                        </ItemHeading>
                        {/*<Text style={[*/}
                            {/*{*/}
                                {/*textAlign: 'right'*/}
                            {/*}*/}
                        {/*]}>*/}
                            {/*{dollarBalance}*/}
                        {/*</Text>*/}
                    </View>
                </View>
            </Item>
        </View>
    );
};
export default withNamespaces()(MarketListItem);

MarketListItem.propTypes = {
    marketValue: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        icon_url: PropTypes.string,
        description: PropTypes.string,
        rate: PropTypes.number,
        changes: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        status: PropTypes.string,
        balance_field: PropTypes.string
    })
};


const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    justifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    outerWrapper: {
        flex: 1,
    },
    innerWrapper: {

    }
});
