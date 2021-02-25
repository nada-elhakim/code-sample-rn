import React from 'react';
import Colors from "../../theme/variables/Colors";
import Text from "../../theme/components/Text/Text";
import Item from "../../theme/components/Item/Item";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import {formatNumber} from "../../services/Utils";

const Balance = (props) => {
    const {
        color = Colors.highlight,
        profile,
        selectedCurrency
    } = props;

    const renderBalance = () => {
        if (profile) {
            if (selectedCurrency) {
                return `${formatNumber(profile[selectedCurrency.balance_field])} ${selectedCurrency.symbol}`
            }
            return `${formatNumber(profile.balance)} USE`;
        }

    };

    const renderDollarBalance = () => {
        if (profile) {
            if (selectedCurrency) {
                return (profile[selectedCurrency.balance_field] * selectedCurrency.rate).toFixed(2);
            }
            return profile.coin.toFixed(2);
        }
    };

    return (
        <Item
            noBorder
            style={{paddingVertical: 36}}>
            <Text
                center
                style={[
                    TypographyStyles.numberBig,
                    {color}
                ]}>
                {renderBalance()}
            </Text>
            <Text center>≈  ${renderDollarBalance()}</Text>
        </Item>
    );
};

export default Balance;
