import React from 'react';

import Images from "../../theme/variables/Images";
import Item from "../../theme/components/Item/Item";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Metrics from "../../theme/variables/Metrics";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import {Image, TextInput, View} from "react-native";

const  SelectedCurrencyItem = ({selectedCurrency, onCurrencySelect}) => {
    return (
        <Item
            showArrow
            onPress={onCurrencySelect}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                <Image
                    source={{uri: selectedCurrency.icon_url}}
                    defaultSource={Images['icon'+ selectedCurrency.symbol]}
                    style={{
                        width: 25,
                        height: 25,
                        marginRight: 6}}/>

                <View style={LayoutStyles.spaceBetween}>
                    <ItemHeading
                        uppercase
                        style={[
                            {
                                marginLeft: Metrics.defaultMargin
                            },
                            TypographyStyles.textDark]}>
                        {selectedCurrency.name}
                    </ItemHeading>
                </View>
            </View>
        </Item>

    );
};

export default SelectedCurrencyItem;



